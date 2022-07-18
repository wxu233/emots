import './App.css'
import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Signup from './Signup'
import Login from './Login'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function TopNav(props) {
    const { currentUser, logout } = useAuth()
    const { currentTheme } = useTheme()

    const [ error, setError ] = useState('')
    const [modalShow, setModalShow] = useState(false)
    const [isLogin, setLogin] = useState(true)
    
    const handleModalOpen = () => setModalShow( true )
    const handleModalClose = () => {
        setModalShow( false )
        setLogin( true )
        setError('')
    }

    const handleSignUp = () => setLogin( !isLogin )
    const handleLogout = async () => {
        setError('')
        try{
            await logout()
            console.log("User logged out")
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <div>
            <Navbar key="sm" bg="light" expand="false" className="mb-3"
                    style={{ backgroundColor: currentTheme.colors.menuBackground }}>
                <Container fluid>
                    <Navbar.Brand href="#" className="">{currentUser ? currentUser.email : "Kaomoji.xyz"}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-sm"
                    aria-labelledby="offcanvasNavbar-expand-sm"
                    placement="end"
                    style={{ 
                            // backgroundColor: currentTheme.colors.menuBackground,
                            //  color: currentTheme.colors.menuForeground        
                    }}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbar-expand-sm">
                                {currentUser ? currentUser.email : "owo"}
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                            {!currentUser && <Nav.Link onClick={handleModalOpen}>Log In</Nav.Link>}
                            {currentUser && <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>}
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            { isLogin ? (
                    <Login 
                        modalShow={modalShow}
                        handleModalClose={handleModalClose}
                        isLogin={isLogin}
                        error={error}
                        setError={setError}
                        handleSignUp={handleSignUp}
                    />
                ) : (
                    <Signup 
                        modalShow={modalShow}
                        error={error}
                        setError={setError}
                        handleModalClose={handleModalClose}
                    /> 
                )
            }
        </div>
    )
}
