import React, { useState, useRef } from 'react'
// import { Form, Button, Card, Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import { useAuth } from '../context/AuthContext'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup(props) {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  // const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  const { currentUser, createUser, signup } = useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault()

    if( passwordRef.current.value !== passwordConfirmRef.current.value ){
      return props.setError('Passwords do not match')
    }

    props.setError('')


    setLoading(true)
    signup( emailRef.current.value, passwordRef.current.value )
      .then( (userCred) => {
        createUser(userCred.user.uid)
        props.setError('')
        props.handleModalClose()
      }).catch( err => {
        console.log(err)
        switch( err.code ){
          case "auth/email-already-in-use":
            props.setError('Account with this email already exist')
            break
          case "auth/weak-password":
            props.setError('Password must be at least 6 characters long')
            break
          case "auth/invalid-email":
            props.setError('Email address is invalid')
            break
          default:
            props.setError('Failed to create an account')
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
                <h2 className='text-center mb-4'>Sign Up</h2>
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
                  <Form.Group id="password-confirm">
                    <Form.Label>Confirm your password</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                  </Form.Group>
                  <Button disabled={isLoading} variant="primary" className="w-100 mt-2" type="submit">
                    Create Account
                  </Button>
                </Form>
            </Card.Body>
        </Card>
      </Modal>
    </div>
  )
}
