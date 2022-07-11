import React, { useRef } from 'react'
// import { Form, Button, Card, Modal } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup(props) {

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  const handleSubmit = () => {
    console.log( "form submitted" )
  }

  return (
    <div>
      <Modal show={props.modalShow} onHide={props.handleModalClose}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form>
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
                  <Button variant="primary" className="w-100 mt-2" type="submit" 
                          style={{backgroundColor: '', boxShadow: ''}}
                          onClick={handleSubmit}>
                    Create Account
                  </Button>
                </Form>
            </Card.Body>
        </Card>
      </Modal>
    </div>
  )
}
