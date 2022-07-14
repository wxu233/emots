// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React from 'react'
import TopNav from './nav'
import Display from './Display'
import { AuthProvider } from '../context/AuthContext'

function App() {
    // change to user
  // const [user, setUser] = React.useState()
  

  return (
    <AuthProvider>
      <div 
          className="App"
          style={{
            backgroundColor: '#272822',
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
