import { Spinner, Alert } from 'react-bootstrap'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type LibroCardProps from '../types/libro'

function Catalogo() {
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros.json');

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Catálogo completo</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {(libros ?? []).map((libro) => (
          <div className="col" key={libro.id}>
            <LibroCard {...libro} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalogo
