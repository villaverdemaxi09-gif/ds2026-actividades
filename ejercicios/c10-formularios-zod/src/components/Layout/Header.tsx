import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold fs-4">LibreriaDS</span>
      <div className="d-flex gap-3">
        <Link to="/" className="text-white text-decoration-none">Inicio</Link>
        <Link to="/catalogo" className="text-white text-decoration-none">Catalogo</Link>
        <Link to="/libros/nuevo" className="text-white text-decoration-none">Nuevo libro</Link>
      </div>
    </nav>
  )
}

export default Header

