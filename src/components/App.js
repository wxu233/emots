// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useContext } from 'react'
import TopNav from './nav'
import Display from './Display'
import { AuthProvider } from '../context/AuthContext'
import { ThemeProvider } from '../context/ThemeContext'
import { ThemeContext, themes } from '../context/ThemeContext'

function App() {

  // const [ currentTheme, setTheme ] = useState( themes.dark ) 
  const { currentTheme, setTheme } = useState( themes.dark )
  console.log( currentTheme )
  const changeTheme = ( newTheme ) => {
    setTheme( newTheme )
  }

  return (
    <ThemeProvider value={{currentTheme}}>
      <AuthProvider>
        {console.log( themes.dark )}
        {console.log(currentTheme)}
        <div 
            className="App"
            style={{
              // backgroundColor: currentTheme.colors.background,
              width: '100vw',
              height: '100vh'
            }}>
          <TopNav />
          <Display />
        </div>
      </AuthProvider>
    </ThemeProvider>
    
    
  )
}

export default App;
