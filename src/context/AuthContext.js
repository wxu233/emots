import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../components/firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState()
    const [ favorites, setFavorites ] = useState([])

    // const [isLoading, setLoading] = useState(true)

    function signup(email, password){
        // console.log(email + ": " + password)
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        console.log("signing out current user")
        return auth.signOut()
    }

    function getFavorites(){
        if( currentUser ){
            
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user)
            console.log(user)
            // setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    
}