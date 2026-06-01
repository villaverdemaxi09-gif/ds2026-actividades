import { useParams } from 'react-router-dom'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="container my-5">
      <h2>Detalle del libro #{id}</h2>
      <p className="text-muted">Acá iría la información completa del libro.</p>
    </div>
  )
}

export default LibroDetalle
