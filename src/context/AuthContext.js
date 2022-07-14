import React, { useContext, useState, useEffect } from 'react'
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
        database.users.add( payload ).then( docRef =>{
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
            database.users.where('userId', '==', currentUser.uid).get()
                .then( doc => {
                    // console.log(doc)
                    const formattedDoc = {
                        id: doc.id,
                        ...doc.docs[0].data()
                    }
                    // console.log(formattedDoc)
                    setUserProfile( formattedDoc )
                })
        }
        else{
            console.log("no current user")
            return null
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            // if( user ){
            //     setUserProfile( getProfile() )
            // }
            // else{
            //     console.log('no user in effect')
            // }
            // console.log('current profile' + userProfile)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        userProfile,
        signup,
        login,
        logout,
        createUser,
        getProfile
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    
}