import { NavLink, useNavigate } from 'react-router-dom';                            // <-- sumar useNavigate
import { Navbar, Nav, Container, Form, InputGroup, Button } from 'react-bootstrap'; // <-- sumar Form, InputGroup y Button
import type { FormEvent } from 'react';                      // <-- NUEVO
import { useBusqueda } from '../../context/BusquedaContext'; // <-- NUEVO
import '../../assets/styles/Header.css';

function Header() {
  const { filtro, setFiltro } = useBusqueda(); // <-- NUEVO
  const navigate = useNavigate();              // <-- NUEVO

  // Enter o click en la lupa → al catálogo (el filtro ya está en el context)
  const buscar = (e: FormEvent) => {
    e.preventDefault();
    navigate('/catalogo');
  };

  return (
    <Navbar expand="lg" className="custom-header">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center gap-2">
          <img src="/src/assets/libroIcono.png" alt="Logo" width="32" height="32" />
          <span className="fw-bold brand-text">Librería UTN</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-2">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contacto</Nav.Link>

            {/* barra de búsqueda: input + lupa pegados con InputGroup */}
            <Form onSubmit={buscar} className="ms-lg-3" style={{ maxWidth: '18rem' }}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Buscar por título o autor…"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                />
                <Button type="submit" variant="outline-secondary" aria-label="Buscar">
                  🔍
                </Button>
              </InputGroup>
            </Form>

            <button className="btn-login ms-lg-3 mt-2 mt-lg-0">Ingresar</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
