import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import LibroNuevo from './pages/LibroNuevo';
import Login from './pages/Login';
import SinPermiso from './pages/SinPermiso';
import { Routes, Route } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BusquedaProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Libros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sin-permiso" element={<SinPermiso />} />

            <Route element={<PrivateRoute rol="ADMIN" />}>
              <Route path="/libros/nuevo" element={<LibroNuevo />} />
            </Route>
          </Routes>
        </Layout>
      </BusquedaProvider>
    </AuthProvider>
  );
}

export default App;
