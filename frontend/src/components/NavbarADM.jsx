import { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Badge, Image } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/images/TLogoWhite2.png';

const NavbarADM = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');  
    navigate('/');
  };

  return (
    <Navbar bg="dark" className="w-100" fixed="top">
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
        <Navbar.Collapse id="navbarNav">
          
            {/* Se debe mantener la navegacion vacia para que el elemento del perfil se mantenga en la derecha */}
          <Nav className="me-auto">
            <Nav.Link href="#"></Nav.Link>
          </Nav>
          <div className='AreaName'>
            
          </div>
          <Nav>
            <NavDropdown
              title={
                <PersonFill size={30} style={{ color: 'white' }} />
              }
              id="avatar-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/admin/profileADM')}>My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarADM;