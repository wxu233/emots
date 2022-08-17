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

    function signup(email, password){
       return auth.createUserWithEmailAndPassword(email, password)
    }

    // create user entry in database
    function createUser(userID){
        // default user settings
        const payload = {
            userId: userID,
            theme: 'default',
            maxFavorites: 50,
            maxCustoms: 20,
            favorites: [],
            customs: [],
            createdAt: database.getCurrentTimestamp()
        }

        database.users.doc( userID ).set( payload ).then( docRef =>{
            setUserProfile(payload)
        })
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    // retrieves user data from database if logged in
    //  should be async?
    function getProfile(){
        if( currentUser ){
            database.users.doc(currentUser.uid).get()
                .then( doc => {
                    const formattedDoc = {
                        id: doc.id,
                        ...doc.data()
                    }
                    setUserProfile( formattedDoc )
                })
        }
        else{
            setUserProfile()    // null
        }
    }

    // input: kaomoji = { id, name }
    function addFavorites( kaomoji ){
        if( currentUser ){  // only adds when user is logged in
            if( userProfile.favorites.length >= userProfile.maxFavorites ){
                // TODO: use snackbar/toast to notify user
                console.log('you have too many favorites')
                return
            }

            if( !userProfile.favorites.some( k => k.id === kaomoji.id )){   // prevents adding duplicates
                const newProfile = Object.assign({}, userProfile) 
                newProfile.favorites.push(kaomoji)
                
                setUserProfile( newProfile )    // displays changes immediately while changes are being pushed to server
                
                database.users.doc(currentUser.uid).update({
                    favorites: firebase.firestore.FieldValue.arrayUnion( kaomoji )
                }) // TODO: async? error handling
            }
        }
    }

    // input: kaomoji = { id, name }
    function removeFavorites( kaomoji ){
        if( currentUser ){
            if( userProfile.favorites.length <= 0 ){
                console.log( 'how did this happen' )
                return
            }
            const newProfile = Object.assign({}, userProfile)

            newProfile.favorites = newProfile.favorites.filter( item => item.id !== kaomoji.id )
            setUserProfile( newProfile )
            database.users.doc(currentUser.uid).update({
                favorites: firebase.firestore.FieldValue.arrayRemove( kaomoji )
            })
        }
    }

    // somehow can't retrieve user profile after onAuthStateChanged
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
        })
        return unsubscribe
    }, [])

    // needs to monitor current user
    useEffect( () => {
        getProfile()
    }, [currentUser])   // not needed?

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