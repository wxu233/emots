import React, { useContext, useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'
import { auth, database, getCurrentTimestamp } from '../components/firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    const [userProfile, setUserProfile]  = useState()

    // const [isLoading, setLoading] = useState(true)

    function signup(email, password){
        // console.log(email + ": " + password)
       return auth.createUserWithEmailAndPassword(email, password)
    }

    function createUser(userID){
        // console.log(userID)
        const payload = {
            userId: userID,
            theme: 'default',
            maxFavorites: 50,
            maxCustoms: 20,
            favorites: [],
            customs: [],
            createdAt: database.getCurrentTimestamp()
        }
        console.log('creating user')
        database.users.doc( userID ).set( payload ).then( docRef =>{
            console.log(docRef)
            setUserProfile(payload)
        })
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        console.log("signing out current user")
        return auth.signOut()
    }

    function getProfile(){
        if( currentUser ){
            database.users.doc(currentUser.uid).get()
                .then( doc => {
                    console.log(doc)
                    const formattedDoc = {
                        id: doc.id,
                        ...doc.data()
                    }
                    console.log(formattedDoc)
                    setUserProfile( formattedDoc )
                })
        }
        else{
            console.log("no current user")
            setUserProfile()
        }
    }

    // input: kaomoji = { id, name }
    function addFavorites( kaomoji ){
        console.log( kaomoji )
        if( currentUser ){  // only adds when user is logged in
            if( userProfile.favorites.length >= userProfile.maxFavorites ){
                console.log('you have too many favorites')
                return
            }
            console.log('adding to favorites')

            if( !userProfile.favorites.some( k => k.id === kaomoji.id )){   // prevents adding duplicates
                const newProfile = Object.assign({}, userProfile)
                newProfile.favorites.push(kaomoji)
    
                setUserProfile( newProfile )
                console.log(userProfile.favorites)
                // add change to database
                database.users.doc(currentUser.uid).update({
                    favorites: firebase.firestore.FieldValue.arrayUnion( kaomoji )
                })
            }
        }
    }

    function removeFavorites( kaomoji ){
        console.log( kaomoji )
        if( currentUser ){
            if( userProfile.favorites.length <= 0 ){
                console.log( 'how did this happen' )
                return
            }
            console.log( 'removing from favorites' )
            const newProfile = Object.assign({}, userProfile)

            newProfile.favorites = newProfile.favorites.filter( item => item.id !== kaomoji.id )
            setUserProfile( newProfile )
            database.users.doc(currentUser.uid).update({
                favorites: firebase.firestore.FieldValue.arrayRemove( kaomoji )
            })
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
        })
        getProfile()

        return unsubscribe
    }, [])

    useEffect( () => {
        getProfile()
    }, [currentUser])

    const value = {
        currentUser,
        userProfile,
        signup,
        login,
        logout,
        createUser,
        getProfile,
        addFavorites,
        removeFavorites
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    
}