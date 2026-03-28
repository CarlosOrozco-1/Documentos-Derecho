# Sistema de Gestión de Documentos Jurídicos

Sistema web para la gestión de documentos legales como declaraciones juradas, contratos, escrituras públicas y otros documentos estructurados.

## Características

- **Gestión de Plantillas**: Crear y administrar plantillas reutilizables con campos variables
- **Generación de Documentos**: Generar documentos a partir de plantillas completando datos
- **API REST**: Backend completo con FastAPI
- **Interfaz Moderna**: Frontend con React y diseño profesional

## Tecnologías

### Backend
- Python 3.14+
- FastAPI
- SQLAlchemy (async)
- PostgreSQL
- Docker

### Frontend
- React 19
- Vite
- Axios
- React Router

## Estructura del Proyecto

```
├── backend/              # API FastAPI
│   ├── config/          # Configuraciones
│   ├── database/        # Conexión a BD
│   ├── models/         # Modelos SQLAlchemy
│   ├── schemas/        # Schemas Pydantic
│   ├── routers/        # Endpoints
│   ├── services/       # Lógica de negocio
│   └── main.py        # Entry point
├── frontend/            # Aplicación React
│   └── src/
│       ├── components/ # Componentes
│       ├── pages/     # Vistas
│       └── services/  # Llamadas API
├── base-de-datos/      # Scripts SQL
├── documentacion/      # Documentación
└── AGENTS.md          # Reglas de desarrollo
```

## Inicio Rápido

### 1. Levantar PostgreSQL (Docker)

```bash
docker start basePrueba
docker ps | grep postgres
```

### 2. Backend

```bash
cd backend
pip install -r requirements.txt
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Verificar

- API: http://localhost:8000/docs
- Frontend: http://localhost:5173

## Endpoints Principales

### Plantillas
- `GET /plantillas/` - Listar plantillas
- `POST /plantillas/` - Crear plantilla
- `PUT /plantillas/{id}` - Actualizar
- `DELETE /plantillas/{id}` - Eliminar

### Documentos
- `GET /documentos/` - Listar documentos
- `POST /generar/` - Generar documento desde plantilla

## Modelo de Datos

```
plantillas
├── plantilla_campos
├── documentos_generados
│   └── documento_valores
```

## Documentación Adicional

- [Endpoints API](documentacion/API_ENDPOINTS.md)
- [Diagrama de Flujo](documentacion/DIAGRAMA_FLUJO.md)
- [Procedimientos Docker](documentacion/DOCKER.md)

## Licencia

*** MIT ***

<P>
La licencia MIT es una licencia de software libre permisiva originaria del Instituto Tecnológico de Massachusetts que otorga a los usuarios libertad total para usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y vender el software.
</p>
