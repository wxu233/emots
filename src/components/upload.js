
/* used to upload data to Firestore                            */
// const admin = require('firebase-admin')
// const serviceAccount = require('../../helper_scripts/kaomoji-54124-firebase-adminsdk-ezsvl-74deb2d6ac.json') // service key

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     projectId: "kaomoji-54124"
// ***REMOVED***

// const data = require("../../helper_scripts/kaomoji-2.json")

/* Copy code below to App.js to populate Firestore Emulator */
// const data = require("../kaomoji-2.json")

//   function isCollection( data, path, depth ) {
//     if( 
//         typeof data != 'object' ||
//         data == null ||
//         data.length === 0 ||
//         isEmpty(data)
//     ){
//         return false
//     ***REMOVED***

//     for( const key in data ){
//         if( typeof data[key] != 'object' || data[key] == null ){
//             return false
//         ***REMOVED***
//     ***REMOVED***

//     return true
//   ***REMOVED***

//   function isEmpty( obj ){
//     for( const key in obj ){
//         if( obj.hasOwnProperty(key) ){
//             return false
//         ***REMOVED***
//     ***REMOVED***
//     return true
//   ***REMOVED***

//   async function upload( data, path ){
//     return await db.collection('kaomojis')
//         .add({
//             name: data.name,
//             category: [data.category],
//             likes: 0, 
//         ***REMOVED***
//         .then( () => console.log(`Document ${path.join('/')***REMOVED*** uploaded.`) )
//         .catch( () => console.error(`Could not write document ${path.join('/')***REMOVED***.`))
//     // console.log( [data.category] )
//   ***REMOVED***

//   async function resolve( data, path = [] ){
//     if( path.length > 0 && path.length % 2 == 0 ){
//         const documentData = Object.assign( {***REMOVED***, data )

//         for( const key in data ){
//             if( isCollection( data[key], [...path, key] )){
//                 delete documentData[key]
//                 console.log(data[key])
//                 resolve( data[key], [...path, key] )
//             ***REMOVED***
//         ***REMOVED***

//         if( !isEmpty(documentData) ){
//             await upload( documentData, path )
//         ***REMOVED***
//     ***REMOVED***
//     else{
//         for( const key in data ){
//             await resolve( data[key], [...path, key] )
//         ***REMOVED***
//     ***REMOVED***
//   ***REMOVED***
//   resolve(data)

/* Command to clear all data in Firestore
// firebase firestore:delete --all-collections