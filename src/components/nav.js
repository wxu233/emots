import './App.css'
import React, { useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import Signup from './Signup'
import Login from './Login'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

import { FaBars } from 'react-icons/fa'
import './Sidebar.css'

export default function TopNav(props) {

    // user settings
    const { currentUser, logout } = useAuth()
    const { currentTheme } = useTheme()

    // login settings
    const [ error, setError ] = useState('')
    const [ modalShow, setModalShow ] = useState(false)
    const [ isLogin, setLogin ] = useState(true)

    // sidebar
    const [ mobile, setMobile ] = useState(false)
    const [ sidebar, setSidebar ] = useState(true)

    useEffect( () => {
        if( window.innerWidth < 1065 ){
            setMobile( true )
            setSidebar( false ) 
        }
    }, [])

    useEffect( () => {
        const handleResize = () => {
            if( window.innerWidth < 1065 ){
                setMobile( true )
                setSidebar( false )
            }
            else {
                setMobile( false )
                setSidebar( true )
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])
    console.log(sidebar)
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
            {/* <Navbar key="sm" expand="false" className="mb-3"
                    style={{ backgroundColor: currentTheme.colors.menuBackground }}>
                <Container fluid>
                    <Navbar.Brand href="#" style={{ color: currentTheme.colors.menuForeground }}>{currentUser ? currentUser.email : "Kaomoji.xyz"}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
                    <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-sm"
                    aria-labelledby="offcanvasNavbar-expand-sm"
                    placement="end"
                    style={{ 
                            backgroundColor: currentTheme.colors.menuBackground,
                            color: currentTheme.colors.menuForeground        
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
            } */}
            <div className="sidebar">
                <div className="brand">
                    <a  className="brand-link" href="/home">
                        <span style={{ color: currentTheme.colors.foreground }}>kaomoji</span>
                    </a>
                    <div className="sidebar-menu">
                        <button className={ mobile ? "menu active" : "menu inactive" }
                            style={{ color: currentTheme.colors.foreground }}
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
                
                
            
                
                <Nav className={ sidebar ? "sidebar active" : "sidebar inactive" }
                    style={{ backgroundColor: currentTheme.colors.menuBackground}}
                >
                    <ul className="sidebar-nav">
                    {SidebarData.map( (data, index) => {
                        return (
                        <li key={index} className={data.className}>
                            <Link className="sidebar-nav-link" to={data.path}>
                            {data.icon}
                            <span className="sidebar-text" style={{ color: currentTheme.colors.foreground }}>{data.title}</span>
                            </Link>
                        </li>
                        );
                    } )}
                    </ul>
                </Nav>
            </div>
        </div>
    )
}
