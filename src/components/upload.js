
/* used to upload data to Firestore                            */
// const admin = require('firebase-admin')
// const serviceAccount = require('../../helper_scripts/kaomoji-54124-firebase-adminsdk-ezsvl-74deb2d6ac.json') // service key

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     projectId: "kaomoji-54124"
// })

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
//     }

//     for( const key in data ){
//         if( typeof data[key] != 'object' || data[key] == null ){
//             return false
//         }
//     }

//     return true
//   }

//   function isEmpty( obj ){
//     for( const key in obj ){
//         if( obj.hasOwnProperty(key) ){
//             return false
//         }
//     }
//     return true
//   }

//   async function upload( data, path ){
//     return await db.collection('kaomojis')
//         .add({
//             name: data.name,
//             category: [data.category],
//             likes: 0, 
//         })
//         .then( () => console.log(`Document ${path.join('/')} uploaded.`) )
//         .catch( () => console.error(`Could not write document ${path.join('/')}.`))
//     // console.log( [data.category] )
//   }

//   async function resolve( data, path = [] ){
//     if( path.length > 0 && path.length % 2 == 0 ){
//         const documentData = Object.assign( {}, data )

//         for( const key in data ){
//             if( isCollection( data[key], [...path, key] )){
//                 delete documentData[key]
//                 console.log(data[key])
//                 resolve( data[key], [...path, key] )
//             }
//         }

//         if( !isEmpty(documentData) ){
//             await upload( documentData, path )
//         }
//     }
//     else{
//         for( const key in data ){
//             await resolve( data[key], [...path, key] )
//         }
//     }
//   }
//   resolve(data)

/* Command to clear all data in Firestore
// firebase firestore:delete --all-collections