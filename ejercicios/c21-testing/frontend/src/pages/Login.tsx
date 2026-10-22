import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginValidado } from '../schemas/loginSchema';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState<string | null>(null);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValidado>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginValidado) => {
    try {
      setErrorLogin(null);

      await login(data);

      navigate('/catalogo');
    } catch (error) {
      setErrorLogin(
        error instanceof Error ? error.message : 'Error al iniciar sesión'
      );
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className="container py-4"
      style={{ maxWidth: 480 }}
    >
      <h2>Ingresar</h2>

      {errorLogin && (
        <Alert variant="danger">
          {errorLogin}
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          {...register('password')}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </Form>
  );
}

export default Login;
