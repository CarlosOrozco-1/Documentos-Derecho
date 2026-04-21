-- 1. Limpieza (Opcional: solo si quieres borrar todo y empezar de cero)
-- DROP SCHEMA IF EXISTS juridico CASCADE;

-- 2. Crear el esquema
CREATE SCHEMA IF NOT EXISTS juridico;

-- 3. Tabla: plantillas (Uso de IDENTITY y TIMESTAMPTZ)
CREATE TABLE juridico.plantillas (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre TEXT NOT NULL,
    tipo_documento TEXT NOT NULL,
    contenido TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla: plantilla_campos
CREATE TABLE juridico.plantilla_campos (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plantilla_id INT NOT NULL,
    nombre_campo TEXT NOT NULL,
    etiqueta TEXT NOT NULL,
    tipo_dato TEXT NOT NULL DEFAULT 'texto',
    obligatorio BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_plantilla_campos_plantilla
        FOREIGN KEY (plantilla_id)
        REFERENCES juridico.plantillas(id)
        ON DELETE CASCADE,
    CONSTRAINT uq_plantilla_campos_nombre
        UNIQUE (plantilla_id, nombre_campo),
    CONSTRAINT chk_plantilla_campos_tipo_dato
        CHECK (tipo_dato IN ('texto', 'numero', 'fecha', 'booleano'))
);

-- 5. Tabla: documentos_generados
CREATE TABLE juridico.documentos_generados (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    plantilla_id INT NOT NULL,
    nombre_documento TEXT NOT NULL,
    contenido_final TEXT NOT NULL,
    estado TEXT NOT NULL DEFAULT 'borrador',
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_documentos_generados_plantilla
        FOREIGN KEY (plantilla_id)
        REFERENCES juridico.plantillas(id),
    CONSTRAINT chk_documentos_generados_estado
        CHECK (estado IN ('borrador', 'finalizado', 'anulado'))
);

-- 6. Tabla: documento_valores
CREATE TABLE juridico.documento_valores (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    documento_id INT NOT NULL,
    campo_plantilla_id INT NOT NULL,
    valor TEXT NOT NULL,
    fecha_creacion TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_documento_valores_documento
        FOREIGN KEY (documento_id)
        REFERENCES juridico.documentos_generados(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_documento_valores_campo
        FOREIGN KEY (campo_plantilla_id)
        REFERENCES juridico.plantilla_campos(id)
);

---
-- DATOS DE PRUEBA (Para que verifiques que todo funciona)
---

-- Insertar una plantilla
INSERT INTO juridico.plantillas (nombre, tipo_documento, contenido)
VALUES ('Contrato de Arriendo', 'Contrato', 'El arrendador [nombre_arrendador] cede el inmueble...');

-- Insertar campos para esa plantilla
INSERT INTO juridico.plantilla_campos (plantilla_id, nombre_campo, etiqueta, tipo_dato)
VALUES 
(1, 'nombre_arrendador', 'Nombre del Arrendador', 'texto'),
(1, 'monto_mensual', 'Monto Mensual', 'numero');

-- Generar un documento
INSERT INTO juridico.documentos_generados (plantilla_id, nombre_documento, contenido_final)
VALUES (1, 'Contrato de Arriendo - Juan Pérez', 'El arrendador Juan Pérez cede el inmueble...');

---
-- ÍNDICES (Para optimizar consultas y joins)
---

CREATE INDEX idx_plantilla_campos_plantilla_id ON juridico.plantilla_campos (plantilla_id);
CREATE INDEX idx_documentos_generados_plantilla_id ON juridico.documentos_generados (plantilla_id);
CREATE INDEX idx_documento_valores_documento_id ON juridico.documento_valores (documento_id);
CREATE INDEX idx_documento_valores_campo_plantilla_id ON juridico.documento_valores (campo_plantilla_id);