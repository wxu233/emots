import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Kaomoji from './Kaomoji'
import Container from 'react-bootstrap/Container'

export default function Dashboard() {
    const { currentUser, userProfile, addFavorites, removeFavorites } = useAuth()
    const { currentTheme } = useTheme()

    function getFavs() {
      // checks userProfile instead of currentUser because on user change, react immediately re-renders
      // relavent components before userProfile can be properly set
      if( userProfile ){
        return userProfile.favorites.map( (fav) => 
              <Kaomoji key={fav.id} id={fav.id} data={fav.name} active={true}/> )
      }
    }

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
