import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Kaomoji from './Kaomoji'
import Container from 'react-bootstrap/Container'

export default function Dashboard() {
    const { currentUser, userProfile, addFavorites, removeFavorites } = useAuth()
    const { currentTheme } = useTheme()
    // const [ favorites, setFavorites ] = useState( [] )

    function getFavs() {
      if( userProfile ){
        return userProfile.favorites.map( (fav) => 
              <Kaomoji key={fav.id} id={fav.id} data={fav.name} active={true}/> )
      }
    }

    // useEffect(() => {
    //   if( currentUser ){
    //     console.log('logged in dashboard')
    //     setFavorites( userProfile?.favorites )
    //   }
    //   else{
    //     setFavorites([])
    //   }
    // }, [currentUser, userProfile])

    return (
      <>
        { userProfile && 
          <Container className='card-deck'>
            {console.log(userProfile.favorites) } 
            <div style={{ 
              color: currentTheme.colors.foreground 
            }}>Dashboard</div>
            <Kaomoji key={1} data={'test'} active={true}/>
            {getFavs()}
          </Container>
        }
        <hr style={{ border: 'none', height: '0', color: currentTheme.colors.menuForeground}}/>
      </>
        
  )
}
