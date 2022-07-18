import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Dashboard() {
    const { currentUser, userProfile,  getProfile } = useAuth()
    const { currentTheme } = useTheme()

    // if( currentUser ){
    //   console.log('logged in dashboard')
    //   getProfile().then( doc => {
    //     // console.log(doc)
    //     const formattedDoc = {
    //         id: doc.id,
    //         ...doc.docs[0].data()
    //     }
    //     // console.log(formattedDoc)
    //     setUserProfile( formattedDoc )
    // })
    // }

    useEffect(() => {
      if( currentUser ){
        console.log('logged in dashboard')
      }
      getProfile()
      console.log(userProfile)
    }, [])

    return (
      <>
        {console.log(userProfile)}
        {userProfile && <div style={{ 
            // color: currentTheme.colors.foreground 
          }}>Dashboard</div>}
      </>
        
  )
}
