import { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { obtenerAreaUsuario } from '../../api/tituloar';
import '../../css/Navbar.css';
import logo from '../../assets/images/TLogoWhite2.png';

const NavbarAR = () => {
  const [areaName, setAreaName] = useState("Cargando...");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArea = async () => {
      const usuarioData = localStorage.getItem("user");
      if (!usuarioData) {
        console.error("No hay usuario en localStorage");
        setAreaName("Desconocido");
        return;
      }

      const usuario = JSON.parse(usuarioData);
      const idUsuario = usuario.id_usuario;

      const area = await obtenerAreaUsuario(idUsuario);
      setAreaName(area);
    };

    fetchArea();
  }, []);

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

        {/* Se debe mantener la navegacion vacia para que el elemento del perfil se mantenga en la derecha */}
 
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link href="#"></Nav.Link>
          </Nav>
          <div className='AreaName'>{areaName}</div>
          <Nav>
            <NavDropdown
              title={<PersonFill size={30} style={{ color: 'white' }} />}
              id="avatar-dropdown"
              align="end"
            >
              <NavDropdown.Item onClick={() => navigate('/profileAR')}>My profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarAR;
