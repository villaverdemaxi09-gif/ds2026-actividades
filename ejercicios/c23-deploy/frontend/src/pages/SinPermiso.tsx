import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SinPermiso() {
  return (
    <Alert variant="warning" className="container py-4">
      <Alert.Heading>Sin permiso</Alert.Heading>
      <p>No tenés los permisos necesarios para acceder a esta página.</p>
      <Link to="/catalogo" className="btn btn-primary">
        Volver al catálogo
      </Link>
    </Alert>
  );
}

export default SinPermiso;
