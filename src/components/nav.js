import './App.css'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function TopNav(props) {
    return (
        <Navbar key="sm" bg="light" expand="false" className="mb-3">
            <Container fluid>
                <Navbar.Brand href="#" className="">{props?.user ? props.user : "Kaomoji.xyz"}</Navbar.Brand>
                <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
                <Navbar.Offcanvas
                id="offcanvasNavbar-expand-sm"
                aria-labelledby="offcanvasNavbar-expand-sm"
                placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbar-expand-sm">
                            {props?.user ? props.user : "owo"}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="#action1">Log In</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}
