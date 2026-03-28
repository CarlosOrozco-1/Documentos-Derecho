import { useState, useEffect } from 'react';
import { getPlantillas, createPlantilla, updatePlantilla, deletePlantilla } from '../services/plantillaService';
import Modal from '../components/Modal';
import PlantillaForm from '../components/PlantillaForm';
import './Plantillas.css';

function Plantillas() {
    const [plantillas, setPlantillas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [saving, setSaving] = useState(false);

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

    const handleNew = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (plantilla) => {
        setEditData(plantilla);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta plantilla?')) {
            try {
                await deletePlantilla(id);
                loadPlantillas();
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    };

    const handleSubmit = async (data) => {
        setSaving(true);
        try {
            if (editData) {
                await updatePlantilla(editData.id, data);
            } else {
                await createPlantilla(data);
            }
            setModalOpen(false);
            loadPlantillas();
        } catch (err) {
            alert('Error al guardar');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="page-container"><p className="loading">Cargando plantillas...</p></div>;
    if (error) return <div className="page-container"><p className="error">{error}</p></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Plantillas</h1>
                <button className="btn btn-primary" onClick={handleNew}>
                    + Nueva Plantilla
                </button>
            </div>
            
            <div className="plantillas-grid">
                {plantillas.map((plantilla) => (
                    <div key={plantilla.id} className="plantilla-card">
                        <div className="card-header">
                            <h3>{plantilla.nombre}</h3>
                            <span className={`badge ${plantilla.activo ? 'active' : 'inactive'}`}>
                                {plantilla.activo ? 'Activa' : 'Inactiva'}
                            </span>
                        </div>
                        <p className="tipo">{plantilla.tipo_documento}</p>
                        <p className="contenido-preview">
                            {plantilla.contenido.substring(0, 120)}...
                        </p>
                        <div className="card-actions">
                            <button className="btn-link" onClick={() => handleEdit(plantilla)}>
                                Editar
                            </button>
                            <button className="btn-link danger" onClick={() => handleDelete(plantilla.id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
                {plantillas.length === 0 && (
                    <div className="card empty-state">
                        <p>No hay plantillas registradas</p>
                        <button className="btn btn-primary" onClick={handleNew}>
                            Crear primera plantilla
                        </button>
                    </div>
                )}
            </div>

            <Modal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)}
                title={editData ? 'Editar Plantilla' : 'Nueva Plantilla'}
            >
                <PlantillaForm
                    onSubmit={handleSubmit}
                    onCancel={() => setModalOpen(false)}
                    initialData={editData}
                />
            </Modal>
        </div>
    );
}

export default Plantillas;
