import { useState, useEffect } from 'react';
import { getPlantillas } from '../services/plantillaService';
import './Plantillas.css';

function Plantillas() {
    const [plantillas, setPlantillas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPlantillas();
    }, []);

    const loadPlantillas = async () => {
        try {
            setLoading(true);
            const response = await getPlantillas();
            setPlantillas(response.data);
            setError(null);
        } catch (err) {
            setError('Error al cargar plantillas');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="page-container"><p className="loading">Cargando plantillas...</p></div>;
    if (error) return <div className="page-container"><p className="error">{error}</p></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Plantillas</h1>
                <button className="btn btn-primary">+ Nueva Plantilla</button>
            </div>
            
            <div className="plantillas-grid">
                {plantillas.map((plantilla) => (
                    <div key={plantilla.id} className="plantilla-card">
                        <h3>{plantilla.nombre}</h3>
                        <p className="tipo">{plantilla.tipo_documento}</p>
                        <p className="contenido-preview">
                            {plantilla.contenido.substring(0, 150)}...
                        </p>
                        <div className="plantilla-footer">
                            <div className="plantilla-status">
                                <span className={`badge ${plantilla.activo ? 'active' : 'inactive'}`}>
                                    {plantilla.activo ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
                {plantillas.length === 0 && (
                    <div className="card">
                        <p>No hay plantillas registradas</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Plantillas;
