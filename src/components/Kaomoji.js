import './App.css'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import starEmpty from '../static/star-empty.svg'
import starFilled from '../static/star-filled.svg'
import { useAuth } from '../context/AuthContext'
import './display.css'

const NORMAL = 'outline-info'
const LIKED = 'outline-warning'
const CARD_NORMAL = 'info'
const CARD_LIKED = 'warning'
const image_style = {
    normal: {   filter: 'invert(93%) sepia(98%) saturate(4%) hue-rotate(46deg) brightness(108%) contrast(100%)' },
    liked: {    
                filter: 'invert(86%) sepia(52%) saturate(6954%) hue-rotate(359deg) brightness(100%) contrast(107%)' 
            }
}

export default function Kaomoji(props) {
    const { userProfile, addFavorites, removeFavorites } = useAuth()
    const [isActive, setActive] = useState(props.active)    // favorited items
    const [style, setStyle] = useState({display: 'none'})

    // copies to clipboard
    const actionSingleClick = () => {
        navigator.clipboard.writeText(props.data)
    }

    const actionDoubleClick = () => {
        setFavorite()
    }

    // determines single click vs double click
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

    // adds/
    const setFavorite = () => {
        const k = {
            id: props.id,
            name: props.data
        }
        if( !isActive ){
            addFavorites( k )
        }
        else{   // remove from favs 
            removeFavorites( k )
        }
        setActive(!isActive)   
    }

    return (
        <>
            <Card 
                bg='dark'
                text='white'
                className='kaomoji m-2 sm'
                border={isActive ? CARD_LIKED : CARD_NORMAL}
                // style={{ width: 'max-content'}}
                // TODO: fix unable to select certain cards on mouse hover
                onMouseEnter={e => { setStyle({display: 'block'}) }}
                onMouseLeave={e => { setStyle({display: 'none'}) }}
                >
                <Card.Body className='kaomoji-body row'>
                    <div id='name'>
                        <Card.Text onClick={click}>{props.data}</Card.Text>
                    </div>
                    <i className='btn-star end-0' id='icon'
                            variant={isActive ? LIKED : NORMAL}
                            // style={style}
                            onMouseEnter={ e => { }}
                            onClick={setFavorite}>
                        <img className='button-img btn-link' src={ isActive ? starFilled : starEmpty} alt='' style={ isActive ? image_style.liked : image_style.normal}></img>
                    </i>
                </Card.Body>
            </Card>           
        </>
    )
}
