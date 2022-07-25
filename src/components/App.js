// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import TopNav from './nav'
import Display from './Display'
import { AuthProvider } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function App() {
  
  // const [ currentTheme, setTheme ] = useState( themes.dark ) 
  const { currentTheme } = useTheme()
  // console.log( currentTheme )
  return (
    <AuthProvider>
      {console.log("app")}
      <div 
          className="App"
          style={{
            backgroundColor: currentTheme.colors.background,
            width: '100vw',
            height: '100vh'
          }}>
        <TopNav />
        <Display />
      </div>
    </AuthProvider>
  )
}

export default App;
