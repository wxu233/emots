import { useState, useEffect } from 'react'
import { db } from './firebase'
import { query, orderBy, limit, collection, getDocs } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Kaomoji from './Kaomoji'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import './display.css'

export default function Display() {

    // collection ref
    const dbRef = collection(db, 'kaomojis')
    
    // query
    const q = query(dbRef, orderBy("likes", "desc"), limit(100))
    // actually get the query
    const [data] = useCollectionData(q)

    console.log(data)
    return (
        <Container className="card-deck">
            <Button variant="primary">Hit me</Button>
            {data && data.map( msg => 
                <Kaomoji key={msg.id} data={msg} />       
            )}
        </Container>
    )
}
