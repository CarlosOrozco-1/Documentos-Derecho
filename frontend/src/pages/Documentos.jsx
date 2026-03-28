import { useState, useEffect } from 'react';
import { getDocumentos, updateDocumento, deleteDocumento } from '../services/documentoService';
import Modal from '../components/Modal';
import './Documentos.css';

function Documentos() {
    const [documentos, setDocumentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [nuevoEstado, setNuevoEstado] = useState('');

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

    const handleVer = (doc) => {
        setSelectedDoc(doc);
        setModalOpen(true);
    };

    const handleCambiarEstado = (doc) => {
        setSelectedDoc(doc);
        setNuevoEstado(doc.estado);
        setModalOpen(true);
    };

    const handleGuardarEstado = async () => {
        try {
            await updateDocumento(selectedDoc.id, { estado: nuevoEstado });
            setModalOpen(false);
            loadDocumentos();
        } catch (err) {
            alert('Error al actualizar estado');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este documento?')) {
            try {
                await deleteDocumento(id);
                loadDocumentos();
            } catch (err) {
                alert('Error al eliminar');
            }
        }
    };

    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'finalizado': return 'badge-success';
            case 'borrador': return 'badge-warning';
            case 'anulado': return 'badge-danger';
            default: return '';
        }
    };

    if (loading) return <div className="page-container"><p className="loading">Cargando...</p></div>;
    if (error) return <div className="page-container"><p className="error">{error}</p></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Documentos</h1>
                <span>{documentos.length} documento{documentos.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="documentos-list">
                {documentos.map((doc) => (
                    <div key={doc.id} className="documento-card">
                        <div className="doc-header">
                            <h3>{doc.nombre_documento}</h3>
                            <span className={`badge ${getEstadoClass(doc.estado)}`}>
                                {doc.estado}
                            </span>
                        </div>
                        <div className="doc-info">
                            <p><strong>Creado:</strong> {new Date(doc.fecha_creacion).toLocaleDateString()}</p>
                            <p className="contenido-preview">{doc.contenido_final.substring(0, 100)}...</p>
                        </div>
                        <div className="doc-actions">
                            <button className="btn-link" onClick={() => handleVer(doc)}>Ver</button>
                            <button className="btn-link" onClick={() => handleCambiarEstado(doc)}>Estado</button>
                            <button className="btn-link danger" onClick={() => handleEliminar(doc.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
                {documentos.length === 0 && (
                    <div className="empty-state">
                        <p>No hay documentos generados</p>
                    </div>
                )}
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedDoc?.contenido_final ? 'Ver Documento' : 'Cambiar Estado'}
            >
                {selectedDoc?.contenido_final ? (
                    <div className="documento-view">
                        <div className="doc-view-header">
                            <h2>{selectedDoc.nombre_documento}</h2>
                            <span className={`badge ${getEstadoClass(selectedDoc.estado)}`}>
                                {selectedDoc.estado}
                            </span>
                        </div>
                        <div className="doc-view-content">
                            <pre>{selectedDoc.contenido_final}</pre>
                        </div>
                        <div className="doc-view-actions">
                            <button className="btn btn-secondary" onClick={() => window.print()}>
                                Imprimir
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="cambiar-estado">
                        <p>Seleccionar nuevo estado para "{selectedDoc?.nombre_documento}":</p>
                        <div className="form-group">
                            <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value)}>
                                <option value="borrador">Borrador</option>
                                <option value="finalizado">Finalizado</option>
                                <option value="anulado">Anulado</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                                Cancelar
                            </button>
                            <button className="btn btn-primary" onClick={handleGuardarEstado}>
                                Guardar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Documentos;
