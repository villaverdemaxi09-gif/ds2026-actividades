import '../assets/styles/LibroCard.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import type { LibroCardProps } from '../types/libroCardProps';

function LibroCard({ titulo, autor, precio, imagen, disponible }: LibroCardProps) {
  const [disponibilidad, setDisponibilidad] = useState<boolean>(disponible);
  return (
    <Card style={{ width: '18rem' }}>
      <div className="libro-img-div">
        <Card.Img variant="top" src={imagen} className="libro-img" />
        {!disponibilidad ? <p className="false">Alquilado</p> : <p className="true">Disponible</p>}
      </div>
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          <div className="autor">{autor}</div>
          <span className="precio">${precio}</span>
        </Card.Text>
        <div className="d-flex gap-2">
          <Button 
            variant="primary"
            className="cambiar-estado"
            onClick={() => setDisponibilidad(!disponibilidad)}
          >
            {disponibilidad ? 'Alquilar' : 'Devolver'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default LibroCard;
