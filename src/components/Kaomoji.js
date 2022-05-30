import React from 'react'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'

export default function Kaomoji(props) {

    const handleClick = () => {
        navigator.clipboard.writeText(props.data.name)
        console.log("copied")
    }

    return (
            <Button variant="outline-primary" 
                    className='m-2 p-2'
                    onClick={handleClick}>{props.data.name}</Button>
    )
}
