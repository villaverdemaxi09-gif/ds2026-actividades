import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';
import type { LibroCardProps } from '../types/libroCardProps';

interface Props {
  onEditar: (id: number, libro: LibroCardProps) => void;
  libros: LibroCardProps[];
}

function LibroEditar({ onEditar, libros }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const libroExistente = libros.find(l => l.id === Number(id));

  if (!libroExistente) {
    navigate('/catalogo');
    return null;
  }

  const { register, handleSubmit, formState: { errors } } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      titulo: libroExistente.titulo,
      autor: libroExistente.autor,
      precio: libroExistente.precio,
      disponible: libroExistente.disponible,
    }
  });

  const onSubmit = (data: LibroValidado) => {
    onEditar(libroExistente.id, { // inmutabilidad: referencia no valor
      ...libroExistente,
      titulo: data.titulo,
      autor: data.autor,
      precio: data.precio,
      disponible: data.disponible,
    });
    navigate('/catalogo');
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Editar libro</h2>

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          {...register('titulo')}
          isInvalid={!!errors.titulo}
        />
        <Form.Control.Feedback type="invalid">
          {errors.titulo?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control
          {...register('autor')}
          isInvalid={!!errors.autor}
        />
        <Form.Control.Feedback type="invalid">
          {errors.autor?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register('precio', { valueAsNumber: true })}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">
          {errors.precio?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Check
        className="mb-3"
        label="Disponible"
        {...register('disponible')}
      />

      <div className="d-flex gap-2">
        <Button type="submit">Guardar cambios</Button>
        <Button variant="secondary" onClick={() => navigate('/catalogo')}>Cancelar</Button>
      </div>
    </Form>
  );
}

export default LibroEditar;
