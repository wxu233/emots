import { useState, useEffect ***REMOVED*** from 'react'
import { db ***REMOVED*** from './firebase'
import { query, orderBy, limit, collection, getDocs ***REMOVED*** from 'firebase/firestore'
import { useCollectionData ***REMOVED*** from 'react-firebase-hooks/firestore'
import Kaomoji from './Kaomoji'
import Container from 'react-bootstrap/Container'

export default function Display() {

    // collection ref
    const dbRef = collection(db, 'kaomojis')
    // query
    const q = query(dbRef, orderBy("likes", "desc"), limit(100))
    // actually get the query
    const [data] = useCollectionData(q)

    // console.log(data)
    return (
        <Container>
            {data && data.map( msg => 
                <Kaomoji data={msg***REMOVED*** />
            )***REMOVED***
        </Container>
    )
***REMOVED***
