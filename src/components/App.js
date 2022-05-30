// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import React from 'react'
import TopNav from './nav'
import Display from './Display';

function App() {
    // change to user
  const [user, setUser] = React.useState()

  return (
    <div className="App">
      {/* <p>{ data?.name ? data.name : "data missing" } </p> */}
      <TopNav user={user}/>
      <Display />
    </div>
  )
}

export default App;
