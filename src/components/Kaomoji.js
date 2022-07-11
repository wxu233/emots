import './App.css'
import { db } from './firebase'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import starEmpty from '../static/star-empty.svg'
import starFilled from '../static/star-filled.svg'

import './display.css'

const NORMAL = 'outline-info'
const LIKED = 'outline-warning'
const CARD_NORMAL = 'info'
const CARD_LIKED = 'warning'
const image_style = {
    normal: {   filter: 'invert(93%) sepia(98%) saturate(4%) hue-rotate(46deg) brightness(108%) contrast(100%)' },
    liked: {    backgroundColor: '',
                filter: 'invert(86%) sepia(52%) saturate(6954%) hue-rotate(359deg) brightness(100%) contrast(107%)' 
            }
}

export default function Kaomoji(props) {

    const [isActive, setActive] = useState(false)
    const [style, setStyle] = useState({display: 'none'})

    const actionSingleClick = () => {
        navigator.clipboard.writeText(props.data.name)
        console.log(props)
    }

    const actionDoubleClick = () => {
        setActive(true)
        // const doc = db.collection('kaomojis').get
        console.log(props.data.likes, "double clicked")
    }

    function useClick(actionSingleClick, actionDoubleClick, delay=200){
        const [click, setClick] = useState(0)

        useEffect( () => {
            const timer = setTimeout( () => {
                if( click ===1 ) actionSingleClick();
                setClick(0)
            }, delay)

            if( click === 2 ) actionDoubleClick()

            return () => clearTimeout(timer)
        }, [click])

        return () => setClick( prev => prev + 1)
    }

    const click = useClick(actionSingleClick, actionDoubleClick)
    const buttonClick = () => setActive(!isActive)

    return (
        <>
            <Card 
                bg='dark'
                text='white'
                border={isActive ? CARD_LIKED : CARD_NORMAL}
                className='m-2 sm'
                onMouseEnter={e => { setStyle({display: 'flex'}) }}
                onMouseLeave={e => { setStyle({display: 'none'}) }}
                >
                <Card.Body className='row'>
                    <div className='card-content col'>
                        <Card.Text onClick={click}>{props.data.name}</Card.Text>
                    </div>
                    <Button className='col-1 justify-content-center btn-star' 
                            variant={isActive ? LIKED : NORMAL}
                            style={style}
                            onMouseEnter={ e => { }}
                            onClick={buttonClick}>
                        <img className='button-img btn-link' src={ isActive ? starFilled : starEmpty} alt='' style={ isActive ? image_style.liked : image_style.normal}></img>
                    </Button>
                </Card.Body>
                
            </Card>
            
        </>
    )
}
