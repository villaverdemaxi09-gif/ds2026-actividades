import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Libros from './pages/LibrosCatalogo';
import { Routes, Route } from 'react-router-dom';
import { BusquedaProvider } from './context/BusquedaContext'; // <-- NUEVO

function App() {
  
  return (
    <BusquedaProvider>    {/* <-- NUEVO: todo lo de adentro puede leer el filtro */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Libros />} />
        </Routes>
      </Layout>
    </BusquedaProvider>
  );
}

export default App;
