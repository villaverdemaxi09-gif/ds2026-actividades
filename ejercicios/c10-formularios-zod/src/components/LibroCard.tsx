import { useState } from 'react'
import type { LibroCardProps } from '../types/libro'

function LibroCard({ titulo, autor, precio, imagen }: LibroCardProps) {
  const [liked, setLiked] = useState<boolean>(false)
  return (
    <div className="card h-100">
      <img src={imagen} className="card-img-top" alt={titulo} style={{ height: '200px', objectFit: 'cover' }} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text text-muted">{autor}</p>
        <p className="card-text fw-bold">${precio.toLocaleString()}</p>
        <button
          className={`btn mt-auto ${liked ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => setLiked(!liked)}
        >
          {liked ? '❤️ Me gusta' : '🤍 Me gusta'}
        </button>
      </div>
    </div>
  )
}

export default LibroCard
