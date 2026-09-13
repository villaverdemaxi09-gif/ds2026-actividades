import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import LibroNuevo from './pages/LibroNuevo';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext';

function App() {
  return (
    <BusquedaProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
          <Route path="/libros/nuevo" element={<LibroNuevo />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
  );
}

export default App;
