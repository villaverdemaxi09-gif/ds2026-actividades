import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, InputGroup, Button } from 'react-bootstrap';
import type { FormEvent } from 'react';
import { useBusqueda } from '../../context/BusquedaContext';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/Header.css';

function Header() {
  const { filtro, setFiltro } = useBusqueda();
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const buscar = (e: FormEvent) => {
    e.preventDefault();
    navigate('/catalogo');
  };

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
      return;
    }

    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="custom-header">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img
            src="/src/assets/libroIcono.png"
            alt="Logo"
            width="32"
            height="32"
          />
          <span className="fw-bold brand-text">Librería UTN</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/catalogo">
              Catálogo
            </Nav.Link>

            {tieneRol('ADMIN') && (
              <Nav.Link as={NavLink} to="/libros/nuevo">
                Nuevo libro
              </Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>

            <Form
              onSubmit={buscar}
              className="ms-lg-3"
              style={{ maxWidth: '18rem' }}
            >
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Buscar por título o autor…"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="outline-secondary"
                  aria-label="Buscar"
                >
                  🔍
                </Button>
              </InputGroup>
            </Form>
            {usuario && (
              <Navbar.Text className="ms-lg-3">
                Hola, {usuario.nombre}
              </Navbar.Text>
            )}

            <button
              className="btn-login ms-lg-3 mt-2 mt-lg-0"
              onClick={manejarSesion}
            >
              {usuario ? 'Salir' : 'Ingresar'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
