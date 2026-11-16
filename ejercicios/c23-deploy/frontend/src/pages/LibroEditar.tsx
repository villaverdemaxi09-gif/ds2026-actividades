import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';
import type { Autor, LibroCardProps } from '../types/libroCardProps';
import { useFetch } from '../hooks/useFetch';

interface Props {
  onEditar: (id: number, libro: LibroCardProps) => void;
  libros: LibroCardProps[];
}

function LibroEditar({ onEditar, libros }: Props) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const libroExistente = libros.find((l) => l.id === Number(id));

  const {
    data: autores,
    loading: cargandoAutores,
    error: errorAutores,
  } = useFetch<Autor[]>('/autores');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    values: libroExistente
      ? {
          titulo: libroExistente.titulo,
          autorId: libroExistente.autor.id,
          precio: libroExistente.precio,
          disponible: libroExistente.disponible,
        }
      : undefined,
  });

  if (!libroExistente) {
    return (
      <Alert variant="danger">
        Libro no encontrado
      </Alert>
    );
  }

  if (cargandoAutores) {
    return <Spinner animation="border" />;
  }

  if (errorAutores) {
    return <Alert variant="danger">{errorAutores}</Alert>;
  }

  const onSubmit = (data: LibroValidado) => {
    const autorSeleccionado = (autores ?? []).find(
      (autor) => autor.id === data.autorId
    );

    if (!autorSeleccionado) {
      return;
    }

    onEditar(libroExistente.id, {
      ...libroExistente,
      titulo: data.titulo,
      autor: autorSeleccionado,
      precio: data.precio,
      disponible: data.disponible,
    });

    navigate('/catalogo');
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="container py-4"
      style={{ maxWidth: 480 }}
    >
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

        <Form.Select
          {...register('autorId', { valueAsNumber: true })}
          isInvalid={!!errors.autorId}
        >
          {(autores ?? []).map((autor) => (
            <option key={autor.id} value={autor.id}>
              {autor.nombre}
            </option>
          ))}
        </Form.Select>

        <Form.Control.Feedback type="invalid">
          {errors.autorId?.message}
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
        <Button type="submit">
          Guardar cambios
        </Button>

        <Button
          variant="secondary"
          onClick={() => navigate('/catalogo')}
        >
          Cancelar
        </Button>
      </div>
    </Form>
  );
}

export default LibroEditar;
