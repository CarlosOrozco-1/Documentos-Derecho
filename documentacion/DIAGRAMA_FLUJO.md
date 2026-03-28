# Diagrama de Flujo - Sistema de Documentos Jurídicos

## Flujo Principal: Generación de Documento

```
┌─────────────────────────────────────────────────────────────────┐
│                        INICIO                                    │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 1. CREAR PLANTILLA                                               │
│    POST /plantillas/                                             │
│    {                                                             │
│      "nombre": "Contrato de Arrendamiento",                      │
│      "tipo_documento": "contrato",                              │
│      "contenido": "El arrendador {{nombre_arrendador}}..."      │
│    }                                                             │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. DEFINIR CAMPOS DE LA PLANTILLA                                │
│    POST /campos/                                                 │
│    {                                                             │
│      "plantilla_id": 1,                                          │
│      "nombre_campo": "nombre_arrendador",                        │
│      "etiqueta": "Nombre del Arrendador",                       │
│      "tipo_dato": "texto",                                       │
│      "obligatorio": true                                         │
│    }                                                             │
└─────────────────────────────┬───────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ ¿Más campos?    │
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │ SI                          │ NO
              ▼                             ▼
    ┌─────────────────┐           ┌─────────────────────┐
    │ Repetir paso 2  │           │ 3. GENERAR DOCUMENTO│
    └─────────────────┘           │ POST /generar/     │
                                  └──────────┬──────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────┐
                              │ 3.1 Recibir valores:         │
                              │ {                            │
                              │   "nombre_arrendador":       │
                              │     "Juan Pérez"             │
                              │ }                            │
                              └──────────────┬───────────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────┐
                              │ 3.2 Buscar plantilla por ID   │
                              │ SELECT * FROM plantillas     │
                              │ WHERE id = plantilla_id      │
                              └──────────────┬───────────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────┐
                              │ 3.3 Reemplazar variables     │
                              │ contenido.replace(          │
                              │   "{{nombre_arrendador}}",   │
                              │   "Juan Pérez"              │
                              │ )                           │
                              └──────────────┬───────────────┘
                                             │
                                             ▼
                              ┌──────────────────────────────┐
                              │ 3.4 Crear documento          │
                              │ INSERT INTO                  │
                              │ documentos_generados...      │
                              └──────────────┬───────────────┘
                                             │
                                             ▼
                    ┌─────────────────┐     ┌─────────────────────┐
                    │ Fin             │     │ 4. GESTIONAR DOC   │
                    │ Documento       │     │ - Consultar        │
                    │ Generado        │     │ - Actualizar estado│
                    └─────────────────┘     │ - Eliminar         │
                                            └─────────────────────┘
```

---

## Flujo CRUD Completo

```
┌──────────────┐
│   CLIENTE    │
│  (Frontend/  │
│   Postman)   │
└──────┬───────┘
       │
       │ HTTP Request
       ▼
┌──────────────────────────────────────┐
│           FASTAPI (main.py)          │
│                                      │
│  ┌────────────────────────────────┐  │
│  │      ROUTERS                   │  │
│  │  ├── /plantillas              │  │
│  │  ├── /campos                  │  │
│  │  ├── /documentos              │  │
│  │  ├── /valores                │  │
│  │  └── /generar                 │  │
│  └────────────────────────────────┘  │
│              │                         │
│              │ Validación              │
│              ▼                         │
│  ┌────────────────────────────────┐   │
│  │      SCHEMAS (Pydantic)        │   │
│  │  - PlantillaCreate            │   │
│  │  - PlantillaResponse          │   │
│  │  - etc.                       │   │
│  └────────────────────────────────┘   │
│              │                         │
│              │ Transformación          │
│              ▼                         │
│  ┌────────────────────────────────┐   │
│  │      SERVICES                  │   │
│  │  - renderizar_plantilla()     │   │
│  │  - generar_documento()         │   │
│  └────────────────────────────────┘   │
│              │                         │
└──────────────┼─────────────────────────┘
               │
               │ SQLAlchemy Async
               ▼
┌──────────────────────────────────────┐
│        POSTGRESQL (juridico)         │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ TABLAS:                       │   │
│  │  ├── plantillas              │   │
│  │  ├── plantilla_campos        │   │
│  │  ├── documentos_generados    │   │
│  │  └── documento_valores        │   │
│  └──────────────────────────────┘   │
└──────────────────────────────────────┘
```

---

## Endpoints Detallados

### Plantillas
```
GET    /plantillas/              → Listar todas
GET    /plantillas/{id}          → Obtener por ID
POST   /plantillas/              → Crear
PUT    /plantillas/{id}          → Actualizar
DELETE /plantillas/{id}          → Eliminar
```

### Campos
```
GET    /campos/                              → Listar todos
GET    /campos/{id}                          → Obtener por ID
GET    /campos/plantilla/{plantilla_id}      → Campos de plantilla
POST   /campos/                              → Crear
PUT    /campos/{id}                          → Actualizar
DELETE /campos/{id}                          → Eliminar
```

### Documentos
```
GET    /documentos/              → Listar todos
GET    /documentos/{id}          → Obtener por ID
POST   /documentos/              → Crear manual
PUT    /documentos/{id}          → Actualizar
DELETE /documentos/{id}          → Eliminar
```

### Valores
```
GET    /valores/                          → Listar todos
GET    /valores/{id}                      → Obtener por ID
GET    /valores/documento/{documento_id}   → Valores de documento
POST   /valores/                          → Crear
PUT    /valores/{id}                      → Actualizar
DELETE /valores/{id}                      → Eliminar
```

### Generación
```
POST   /generar/              → Generar documento desde plantilla
```

---

## Ejemplo de Uso Completo

```bash
# 1. Crear plantilla
curl -X POST http://localhost:8000/plantillas/ \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Contrato de Arrendamiento",
    "tipo_documento": "contrato",
    "contenido": "Yo, {{nombre}}, declaro que..."
  }'

# 2. Agregar campos
curl -X POST http://localhost:8000/campos/ \
  -H "Content-Type: application/json" \
  -d '{
    "plantilla_id": 1,
    "nombre_campo": "nombre",
    "etiqueta": "Nombre completo",
    "tipo_dato": "texto",
    "obligatorio": true
  }'

# 3. Generar documento
curl -X POST http://localhost:8000/generar/ \
  -H "Content-Type: application/json" \
  -d '{
    "plantilla_id": 1,
    "nombre_documento": "Mi Contrato",
    "valores": {
      "nombre": "Juan Pérez"
    }
  }'

# 4. Ver documento generado
curl http://localhost:8000/documentos/1
```
