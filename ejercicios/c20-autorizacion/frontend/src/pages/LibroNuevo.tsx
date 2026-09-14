import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { libroSchema, type LibroValidado } from '../schemas/libroSchema';
import type { Autor } from '../types/libroCardProps';
import { useFetch } from '../hooks/useFetch';
import { apiFetch } from '../services/api';
import { useState } from 'react';

const IMG_PLACEHOLDER = 'https://placehold.co/300x400?text=Libro';

function LibroNuevo() {
  const navigate = useNavigate();
  const [errorAlta, setErrorAlta] = useState<string | null>(null);

  const {
    data: autores,
    loading: cargandoAutores,
    error: errorAutores,
  } = useFetch<Autor[]>('/autores');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LibroValidado>({
    resolver: zodResolver(libroSchema),
    defaultValues: {
      disponible: true,
    },
  });

  const onSubmit = async (data: LibroValidado) => {
    try {
      setErrorAlta(null);

      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          autorId: data.autorId,
          precio: data.precio,
          imagen: IMG_PLACEHOLDER,
          disponible: data.disponible,
        }),
      });

      navigate('/catalogo');
    } catch (error) {
      setErrorAlta(
        error instanceof Error ? error.message : 'Error al crear el libro'
      );
    }
  };

  if (cargandoAutores) {
    return <Spinner animation="border" />;
  }

  if (errorAutores) {
    return <Alert variant="danger">{errorAutores}</Alert>;
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="container py-4"
      style={{ maxWidth: 480 }}
    >
      <h2>Nuevo libro</h2>

      {errorAlta && (
        <Alert variant="danger">
          {errorAlta}
        </Alert>
      )}

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
          defaultValue=""
        >
          <option value="" disabled>
            Seleccioná un autor
          </option>

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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Agregar libro'}
      </Button>
    </Form>
  );
}

export default LibroNuevo;
