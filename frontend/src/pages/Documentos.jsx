import { useState, useEffect } from 'react';
import { getDocumentos } from '../services/documentoService';
import './Documentos.css';

function Documentos() {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDocumentos();
    }, []);

    const loadDocumentos = async () => {
        try {
            setLoading(true);
            const response = await getDocumentos();
            setDocumentos(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar documentos');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="documentos-page">
            <h1>Documentos</h1>
            
            <div className="documentos-list">
                {documentos.map((doc) => (
                    <div key={doc.id} className="documento-card">
                        <h3>{doc.nombre_documento}</h3>
                        <p className="estado">
                            Estado: <span className={`estado-${doc.estado}`}>{doc.estado}</span>
                        </p>
                        <p className="fecha">
                            Creado: {new Date(doc.fecha_creacion).toLocaleDateString()}
                        </p>
                    </div>
                ))}
                {documentos.length === 0 && (
                    <p className="no-data">No hay documentos generados</p>
                )}
            </div>
        </div>
    );
}

export default Documentos;
