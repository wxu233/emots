import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
})

const db = firebase.firestore()
const auth = firebase.auth()

if( window.location.hostname === 'localhost' ){
    db.useEmulator( 'localhost', 8080 )
    auth.useEmulator( 'http://localhost:9099/', { disableWarnings: true } )
}

export default app
export { db, auth }
