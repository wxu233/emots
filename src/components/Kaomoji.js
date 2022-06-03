import './App.css'
import { db } from './firebase'
import { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardGroup from 'react-bootstrap/CardGroup'
import star from '../static/star-empty.svg'

const NORMAL = 'outline-info'
const LIKED = 'outline-warning'

export default function Kaomoji(props) {

    // const handleClick = () => {
    //     navigator.clipboard.writeText(props.data.name)
    //     console.log("copied")
    // }
    const [isActive, setActive] = useState(false)

    const actionSingleClick = () => {
        navigator.clipboard.writeText(props.data.name)
        console.log(props)
    }

    const actionDoubleClick = () => {
        setActive(!isActive)
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

    return (
            // <Card 
            //     bg='dark'
            //     text='white'
            //     border='info'
            //     className='m-2 p-2 sm'
            //     stype={{ width: '10rem' }}>
            //     <Card.Body className='row'>
            //         <div className='col-sm'>
            //             <Card.Text onClick={handleClick}>{props.data.name}</Card.Text>
            //         </div>
            //         <Card.Img 
            //                 className='justify-content-end col-sm' 
            //                 src={star} 
            //                 alt='icon'
            //                 stype={{
            //                     width: '50%',
            //                     height: '50%'}}></Card.Img>
            //     </Card.Body>
            // </Card>
            <Button 
                variant={ isActive ? LIKED : NORMAL }
                className='m-2 p-2 sm'
                onClick={click}>{props.data.name}</Button>

                    /* <Card.Img 
                            className='justify-content-end col-sm' 
                            src={star} 
                            alt='icon'
                            stype={{
                                width: '50%',
                                height: '50%'}}></Card.Img>
                </Card.Body> */
    )
}
