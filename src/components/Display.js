import { useState, useEffect } from 'react'
import { db } from './firebase'
import { query, orderBy, limit, collection, getDocs } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Kaomoji from './Kaomoji'
import Dashboard from './Dashboard'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../context/AuthContext'
import './display.css'

export default function Display() {
    const { currentUser } = useAuth()
    const [ favorites, setFavorites ] = useState([])

    const dbRef = collection(db, 'kaomojis')//.withConverter(kaomojiConverter)
    
    // query
    const q = query(dbRef, orderBy("likes", "desc"), limit(75))
    // actually get the query
    const [, , ,snapshot] = useCollectionData(q)

    return (
        <div>
            {currentUser && <Dashboard />}
            <Container className="card-deck">
                {snapshot && snapshot.docs.map( (doc) => 
                    <Kaomoji key={doc.id} id={doc.id} data={doc.data().name} active={false} />       
                )}
            </Container>  
        </div>

    )
}
