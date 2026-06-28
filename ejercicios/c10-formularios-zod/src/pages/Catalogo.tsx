import LibroCard from '../components/LibroCard'
import type LibroCardProps from '../types/libro'

interface Props {
  libros: LibroCardProps[]
}

function Catalogo({ libros }: Props) {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Catálogo completo</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {libros.map((libro) => (
          <div className="col" key={libro.id}>
            <LibroCard {...libro} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalogo
