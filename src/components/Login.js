import React, { useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(props) {

  const { login } = useAuth()

  // const [ error, setError ] = useState('')
  const [ isLoading, setLoading ] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault()
    props.setError('')

    // try{
    setLoading(true)
    login( emailRef.current.value, passwordRef.current.value )
      .then( ()=>{
        props.setError('')
        props.handleModalClose()
      }).catch( err => {
        switch( err.code ){
          case "auth/wrong-password":
            props.setError('Password incorrect')
            break
          case "auth/user-not-found":
            props.setError('Account with this email does not exist')
            break
          default:
            props.setError('error')
            break
        }
      })
    setLoading(false)
  }

  return (
    <div>
      <Modal show={props.modalShow} onHide={props.handleModalClose}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {props.error && <Alert variant='danger'>{props.error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>

                  <Button disabled={isLoading}
                          variant="primary" className="w-100 mt-2" type="submit" >
                    Log In
                  </Button>
                </Form>
                <a href="#" onClick={props.handleSignUp}>Create an account</a>
            </Card.Body>
        </Card>
      </Modal>
    </div>
  )
}
