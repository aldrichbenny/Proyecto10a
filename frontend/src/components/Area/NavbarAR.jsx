import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge, Image } from 'react-bootstrap';
import '../../css/Navbar.css';
import logo from '../../assets/images/TLogoWhite2.png';

const NavbarAR = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="w-100" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo} 
            height="50px" 
            width="100px"
            alt="MDB Logo"
            loading="lazy"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          
            {/* Se debe mantener la navegacion vacia para que el elemento del perfil se mantenga en la derecha */}
          <Nav className="me-auto">
            <Nav.Link href="#"></Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown
              title={
                <Image
                  src="https://placehold.co/20X20"
                  roundedCircle
                  height="30"
                  alt="User Avatar"
                />
              }
              id="avatar-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#">My profile</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAR;