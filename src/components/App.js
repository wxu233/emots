// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db, auth ***REMOVED*** from './firebase'
import { useAuthState ***REMOVED*** from 'react-firebase-hooks/auth'
import { useCollectionData ***REMOVED*** from 'react-firebase-hooks/firestore'
import React from 'react'
import TopNav from './nav'
import Display from './Display';

function App() {
    // change to user
  const [user, setUser] = React.useState()

  return (
    <div className="App">
      {/* <p>{ data?.name ? data.name : "data missing" ***REMOVED*** </p> */***REMOVED***
      <TopNav user={user***REMOVED***/>
      <Display />
    </div>
  )
***REMOVED***

export default App;
