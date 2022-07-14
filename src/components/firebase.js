import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
})

const db = firebase.firestore()
const auth =  firebase.auth()

if( window.location.hostname === 'localhost' ){
    db.useEmulator( 'localhost', 8080 )
    auth.useEmulator( 'http://localhost:9099/', { disableWarnings: true } )
    console.log("using emulator")
}

export const database = {
    kaomojis: db.collection('kaomojis'),
    users: db.collection('users'),
    getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export { db, auth }
export default app

