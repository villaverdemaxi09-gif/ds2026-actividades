import LibroCard from '../components/LibroCard';
import type { LibroCardProps } from '../types/libroCardProps';
import '../assets/styles/LibrosDestacados.css';
import { useFetch } from '../hooks/useFetch';
import { useBusqueda } from '../context/BusquedaContext'; // <-- NUEVO
import { Spinner, Alert } from 'react-bootstrap';

function Libros() {
  // dato: sigue viniendo por vista (C11)
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros.json');
  // filtro: viene del estado global (C12)
  const { filtro } = useBusqueda(); // <-- NUEVO

  if (loading) return <Spinner animation="border" />;
  if (error)   return <Alert variant="danger">{error}</Alert>;

  // composición: dato (fetch) + filtro (context)
  // OJO: filtramos EN MEMORIA → es una MAQUETA. Con backend esto va por API (ver nota al final).
  const term = filtro.trim().toLowerCase();
  const librosFiltrados = (libros ?? []).filter(
    (l) => l.titulo.toLowerCase().includes(term) || l.autor.toLowerCase().includes(term)
  );

  return (
    <>
      {/* contador + estado vacío: para que el filtro se NOTE en la demo */}
      <p className="text-muted">
        Mostrando {librosFiltrados.length} de {(libros ?? []).length} libros
      </p>
      {librosFiltrados.length === 0 && (
        <Alert variant="secondary">Sin resultados para "{filtro}"</Alert>
      )}
      <div className="grid-libros">
        {librosFiltrados.map((libro) => <LibroCard key={libro.id} {...libro} />)}
      </div>
    </>
  );
}

export default Libros;
