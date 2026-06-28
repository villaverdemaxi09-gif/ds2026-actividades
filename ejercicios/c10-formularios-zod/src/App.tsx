import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroNuevo from './pages/LibroNuevo'
import type LibroCardProps from './types/libro'

const librosIniciales: LibroCardProps[] = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 15000, imagen: 'https://covers.openlibrary.org/b/id/8231856-M.jpg', disponible: true },
  { id: 2, titulo: 'Rayuela', autor: 'Julio Cortazar', precio: 18000, imagen: 'https://covers.openlibrary.org/b/id/8226574-M.jpg', disponible: true },
  { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 14000, imagen: 'https://covers.openlibrary.org/b/id/8294930-M.jpg', disponible: false },
  { id: 4, titulo: 'Cien anos de soledad', autor: 'Gabriel Garcia Marquez', precio: 20000, imagen: 'https://covers.openlibrary.org/b/id/8228691-M.jpg', disponible: true },
]

function App() {
  const [libros, setLibros] = useState<LibroCardProps[]>(librosIniciales)
  const agregarLibro = (nuevo: LibroCardProps) => setLibros([...libros, nuevo])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  )
}

export default App
