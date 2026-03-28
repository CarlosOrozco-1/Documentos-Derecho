import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Plantillas from './pages/Plantillas';
import Documentos from './pages/Documentos';
import Generar from './pages/Generar';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Plantillas />} />
          <Route path="/plantillas" element={<Plantillas />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/generar" element={<Generar />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
