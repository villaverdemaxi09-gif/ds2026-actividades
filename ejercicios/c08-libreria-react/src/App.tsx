import { useState } from 'react'

type LibroCardProps = {
  titulo: string
  autor: string
  precio: number
  imagen: string
}

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <span className="navbar-brand fw-bold fs-4">LibreriaDS</span>
      <div className="d-flex gap-3">
        <a href="#" className="text-white text-decoration-none">Inicio</a>
        <a href="#" className="text-white text-decoration-none">Catalogo</a>
        <a href="#" className="text-white text-decoration-none">Contacto</a>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <p className="mb-0">LibreriaDS &copy; 2026 - Todos los derechos reservados</p>
    </footer>
  )
}

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [likes, setLikes] = useState<number>(0)

  return (
    <div className="card h-100">
      <img src={imagen} className="card-img-top" alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-muted">{autor}</p>
        <p className="card-text fw-bold">${precio.toLocaleString()}</p>
        <button
          className="btn btn-outline-danger mt-auto"
          onClick={() => setLikes(likes + 1)}
        >
          Me gusta ({likes})
        </button>
      </div>
    </div>
  )
}

const libros = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 15000, imagen: 'https://covers.openlibrary.org/b/id/8231856-M.jpg' },
  { id: 2, titulo: 'Rayuela', autor: 'Julio Cortazar', precio: 18000, imagen: 'https://covers.openlibrary.org/b/id/8226574-M.jpg' },
  { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 14000, imagen: 'https://covers.openlibrary.org/b/id/8294930-M.jpg' },
  { id: 4, titulo: 'Cien anos de soledad', autor: 'Gabriel Garcia Marquez', precio: 20000, imagen: 'https://covers.openlibrary.org/b/id/8228691-M.jpg' },
]

function App() {
  return (
    <>
      <Navbar />

      <div className="bg-dark text-white py-5 text-center">
        <h1 className="display-4 fw-bold">LibreriaDS</h1>
        <p className="lead">Los mejores libros al mejor precio</p>
        <button className="btn btn-warning btn-lg">Ver catalogo</button>
      </div>

      <div className="container my-5">
        <h2 className="mb-4">Novedades</h2>
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {libros.map((libro) => (
            <div className="col" key={libro.id}>
              <LibroCard
                titulo={libro.titulo}
                autor={libro.autor}
                precio={libro.precio}
                imagen={libro.imagen}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  )
}

export default App
