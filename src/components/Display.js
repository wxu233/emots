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
    // collection ref
    const dbRef = collection(db, 'kaomojis')
    
    // query
    const q = query(dbRef, orderBy("likes", "desc"), limit(100))
    // actually get the query
    const [data] = useCollectionData(q)

    console.log(data)
    return (
        <div>
            {currentUser && <Dashboard />}
            <Container className="card-deck">
                {data && data.map( msg => 
                    <Kaomoji key={msg.name} data={msg} />       
                )}
            </Container>  
        </div>

    )
}
