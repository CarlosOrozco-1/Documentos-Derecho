import { useState, useEffect } from 'react';
import { getPlantillas } from '../services/plantillaService';
import { getCamposPorPlantilla } from '../services/campoService';
import { generarDocumento } from '../services/documentoService';
import './Generar.css';

function Generar() {
    const [plantillas, setPlantillas] = useState([]);
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);
    const [campos, setCampos] = useState([]);
    const [valores, setValores] = useState({});
    const [nombreDocumento, setNombreDocumento] = useState('');
    const [loading, setLoading] = useState(true);
    const [generando, setGenerando] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        loadPlantillas();
    }, []);

    useEffect(() => {
        if (plantillaSeleccionada) {
            loadCampos(plantillaSeleccionada.id);
        }
    }, [plantillaSeleccionada]);

    const loadPlantillas = async () => {
        try {
            const response = await getPlantillas();
            setPlantillas(response.data.filter(p => p.activo));
        } catch (err) {
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadCampos = async (plantillaId) => {
        try {
            const response = await getCamposPorPlantilla(plantillaId);
            setCampos(response.data);
            const initial = {};
            response.data.forEach(c => { initial[c.nombre_campo] = ''; });
            setValores(initial);
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleGenerar = async () => {
        if (!plantillaSeleccionada || !nombreDocumento) {
            setMensaje({ type: 'error', text: 'Completa todos los campos' });
            return;
        }

        setGenerando(true);
        try {
            await generarDocumento({
                plantilla_id: plantillaSeleccionada.id,
                nombre_documento: nombreDocumento,
                valores: valores
            });
            setMensaje({ type: 'success', text: 'Documento generado correctamente' });
            setNombreDocumento('');
            setValores({});
        } catch (err) {
            setMensaje({ type: 'error', text: 'Error al generar documento' });
        } finally {
            setGenerando(false);
        }
    };

    if (loading) return <div className="page-container"><p className="loading">Cargando...</p></div>;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Generar Documento</h1>
            </div>

            {mensaje && (
                <div className={`mensaje mensaje-${mensaje.type}`}>
                    {mensaje.text}
                </div>
            )}

            <div className="form-card">
                <div className="form-group">
                    <label>Seleccionar Plantilla:</label>
                    <select 
                        onChange={(e) => {
                            const p = plantillas.find(p => p.id === parseInt(e.target.value));
                            setPlantillaSeleccionada(p);
                            setMensaje(null);
                        }}
                    >
                        <option value="">-- Seleccionar plantilla --</option>
                        {plantillas.map(p => (
                            <option key={p.id} value={p.id}>{p.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            {plantillaSeleccionada && (
                <>
                    <div className="plantilla-info">
                        <h3>Vista Previa de Plantilla</h3>
                        <p className="contenido">{plantillaSeleccionada.contenido}</p>
                    </div>

                    <div className="form-card">
                        <div className="form-group">
                            <label>Nombre del Documento:</label>
                            <input
                                type="text"
                                value={nombreDocumento}
                                onChange={(e) => setNombreDocumento(e.target.value)}
                                placeholder="Ej: Declaración Juan Pérez - 2024"
                            />
                        </div>
                    </div>

                    <div className="campos-form">
                        <h3>Datos del Documento</h3>
                        {campos.map((campo) => (
                            <div key={campo.id} className="form-group">
                                <label>
                                    {campo.etiqueta}
                                    {campo.obligatorio && <span style={{color: 'red'}}> *</span>}
                                </label>
                                <input
                                    type={campo.tipo_dato === 'numero' ? 'number' : 'text'}
                                    value={valores[campo.nombre_campo] || ''}
                                    onChange={(e) => setValores({
                                        ...valores,
                                        [campo.nombre_campo]: e.target.value
                                    })}
                                    required={campo.obligatorio}
                                />
                            </div>
                        ))}
                    </div>

                    <button 
                        className="btn btn-primary"
                        onClick={handleGenerar}
                        disabled={generando}
                    >
                        {generando ? 'Generando...' : 'Generar Documento'}
                    </button>
                </>
            )}
        </div>
    );
}

export default Generar;
