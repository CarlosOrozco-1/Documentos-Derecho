import { useState } from 'react';

function PlantillaForm({ onSubmit, onCancel, initialData = null }) {
    const [formData, setFormData] = useState({
        nombre: initialData?.nombre || '',
        tipo_documento: initialData?.tipo_documento || '',
        contenido: initialData?.contenido || '',
        activo: initialData?.activo ?? true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre de la Plantilla *</label>
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Declaración Jurada"
                />
            </div>

            <div className="form-group">
                <label>Tipo de Documento *</label>
                <select
                    name="tipo_documento"
                    value={formData.tipo_documento}
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Seleccionar --</option>
                    <option value="declaracion_jurada">Declaración Jurada</option>
                    <option value="contrato">Contrato</option>
                    <option value="escritura">Escritura Pública</option>
                    <option value="acta">Acta</option>
                    <option value="certificacion">Certificación</option>
                    <option value="otro">Otro</option>
                </select>
            </div>

            <div className="form-group">
                <label>Contenido de la Plantilla *</label>
                <textarea
                    name="contenido"
                    value={formData.contenido}
                    onChange={handleChange}
                    required
                    rows={10}
                    placeholder="Usa {{campo}} para variables. Ej: Yo, {{nombre}}, identificado con DPI {{dpi}}..."
                />
                <small style={{ color: 'var(--text-light)', display: 'block', marginTop: '0.5rem' }}>
                    Usa {'{{nombre_campo}}'} para definir variables que se reemplazarán al generar el documento.
                </small>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="activo"
                        checked={formData.activo}
                        onChange={handleChange}
                    />
                    Plantilla Activa
                </label>
            </div>

            <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    {initialData ? 'Actualizar' : 'Crear'} Plantilla
                </button>
            </div>
        </form>
    );
}

export default PlantillaForm;
