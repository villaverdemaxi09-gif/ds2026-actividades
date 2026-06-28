import LibroCard from '../components/LibroCard'

const libros = [
  { id: 1, titulo: 'El Aleph', autor: 'Jorge Luis Borges', precio: 15000, imagen: 'https://covers.openlibrary.org/b/id/8231856-M.jpg' },
  { id: 2, titulo: 'Rayuela', autor: 'Julio Cortazar', precio: 18000, imagen: 'https://covers.openlibrary.org/b/id/8226574-M.jpg' },
  { id: 3, titulo: 'Ficciones', autor: 'Jorge Luis Borges', precio: 14000, imagen: 'https://covers.openlibrary.org/b/id/8294930-M.jpg' },
  { id: 4, titulo: 'Cien anos de soledad', autor: 'Gabriel Garcia Marquez', precio: 20000, imagen: 'https://covers.openlibrary.org/b/id/8228691-M.jpg' },
]

function Home() {
  return (
    <>
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
                id={libro.id}
                titulo={libro.titulo}
                autor={libro.autor}
                precio={libro.precio}
                imagen={libro.imagen}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
