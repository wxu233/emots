import React, { useRef } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(props) {

  const emailRef = useRef()
  const passwordRef = useRef()


  const handleSubmit = () => {
    console.log( "form submitted" )
  }

  return (
    <div>
      <Modal show={props.modalShow} onHide={props.handleModalClose}>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                <Form>
                  <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>

                  <Button variant="primary" className="w-100 mt-2" type="submit" 
                          style={{backgroundColor: '', boxShadow: ''}}
                          onClick={handleSubmit}>
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
