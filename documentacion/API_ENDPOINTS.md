# API - Endpoints

Base URL: `http://localhost:8000/api`

---

## Plantillas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/plantillas/` | Listar todas las plantillas |
| GET | `/plantillas/{id}` | Obtener plantilla por ID |
| POST | `/plantillas/` | Crear plantilla |
| PUT | `/plantillas/{id}` | Actualizar plantilla |
| DELETE | `/plantillas/{id}` | Eliminar plantilla |

### Ejemplo POST /plantillas/
```json
{
  "nombre": "Declaración Jurada",
  "tipo_documento": "declracion_jurada",
  "contenido": "Yo, {{nombre}}, identificado con DPI {{dpi}}, declaro..."
}
```

### Ejemplo PUT /plantillas/{id}
```json
{
  "nombre": "Nuevo nombre",
  "activo": false
}
```

---

## Campos de Plantilla

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/campos/` | Listar todos los campos |
| GET | `/campos/{id}` | Obtener campo por ID |
| GET | `/campos/plantilla/{plantilla_id}` | Obtener campos de una plantilla |
| POST | `/campos/` | Crear campo |
| PUT | `/campos/{id}` | Actualizar campo |
| DELETE | `/campos/{id}` | Eliminar campo |

### Tipos de dato válidos
- `texto`
- `numero`
- `fecha`
- `booleano`

### Ejemplo POST /campos/
```json
{
  "plantilla_id": 1,
  "nombre_campo": "nombre",
  "etiqueta": "Nombre completo",
  "tipo_dato": "texto",
  "obligatorio": true
}
```

---

## Documentos Generados

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/documentos/` | Listar todos los documentos |
| GET | `/documentos/{id}` | Obtener documento por ID |
| POST | `/documentos/` | Crear documento |
| PUT | `/documentos/{id}` | Actualizar documento |
| DELETE | `/documentos/{id}` | Eliminar documento |

### Estados válidos
- `borrador`
- `finalizado`
- `anulado`

---

## Valores de Documento

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/valores/` | Listar todos los valores |
| GET | `/valores/documento/{documento_id}` | Obtener valores de un documento |
| POST | `/valores/` | Crear valor |
| PUT | `/valores/{id}` | Actualizar valor |
| DELETE | `/valores/{id}` | Eliminar valor |

### Ejemplo POST /valores/
```json
{
  "documento_id": 1,
  "campo_plantilla_id": 1,
  "valor": "Juan Pérez"
}
```

---

## Generar Documento

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/generar/` | Genera documento desde plantilla reemplazando variables |

### Ejemplo POST /generar/
```json
{
  "plantilla_id": 1,
  "nombre_documento": "Declaración Juan Pérez",
  "valores": {
    "nombre": "Juan Pérez",
    "dpi": "123456789"
  }
}
```

**Respuesta:**
```json
{
  "id": 1,
  "plantilla_id": 1,
  "nombre_documento": "Declaración Juan Pérez",
  "contenido_final": "Yo, Juan Pérez, identificado con DPI 123456789, declaro...",
  "estado": "borrador",
  "fecha_creacion": "2026-03-27T12:00:00Z"
}
```

---

## Colecciones Postman

Importar desde: `documentacion/api_postman.json`

O copiar manualmente los endpoints desde arriba.
