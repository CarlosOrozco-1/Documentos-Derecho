# Nueva Estructura del Proyecto (abril 2026)

Resumen
- Backend: Python 3.x + FastAPI, desarrollo/IDE: Visual Studio 2026 (IDE).
- Base de datos: PostgreSQL (schema `juridico`).
- Frontend: Angular (CLI).
- Objetivo: conservar la lógica ya desarrollada, reestructurar proyecto para buenas prácticas (metadata central, migraciones Alembic, tests, docker-compose), y migrar frontend de React a Angular.

Estructura propuesta (carpetas principales)
- backend/
  - backend/app/
    - config/                # settings (pydantic), env handling
    - database/              # engine, session, base (Base & metadata central)
    - models/                # entidades SQLAlchemy (importando Base central)
    - schemas/               # pydantic schemas
    - routers/               # endpoints FastAPI
    - services/              # lógica de negocio (render, generación)
    - tests/                 # pytest tests (unit + integration)
    - main.py
    - requirements.txt
    - alembic/               # migraciones (generadas por Alembic)
- frontend/
  - angular-app/             # nuevo proyecto Angular (ng new)
- base-de-datos/
  - scripts/                 # scripts SQL útiles (si aplica)
- documentacion/
  - API_ENDPOINTS.md         # endpoints y ejemplos
  - DIAGRAMA_FLUJO.md
  - DOCKER.md                # docker-compose y procedimientos
  - NUEVA_ESTRUCTURA.md      # este archivo
- archive/                   # (opcional) docs y artefactos antiguos

Decisiones relevantes
- Mantener PostgreSQL: usar docker-compose para dev (postgres:latest o imagen fija).
- Backend en Python: usar FastAPI con SQLAlchemy 2.x (async) y Alembic para migraciones.
- IDE: Visual Studio 2026 (preparar instrucciones para proyecto Python allí).
- Frontend: crear nuevo proyecto Angular con Reactive Forms para formularios dinámicos.

Endpoints principales (resumen)
- GET /api/plantillas/
- GET /api/plantillas/{id}
- POST /api/plantillas/
- PUT /api/plantillas/{id}
- DELETE /api/plantillas/{id}
- GET /api/campos/
- GET /api/campos/plantilla/{plantilla_id}
- POST /api/generar/  (plantilla_id + nombre_documento + valores -> contenido_final, guarda documento)

Prácticas recomendadas
- No credenciales en código; usar .env y settings con pydantic.
- Base declarativa única (backend/app/database/base.py) exportando metadata para Alembic.
- ForeignKey y relaciones entre tablas.
- DateTime con timezone (TIMESTAMPTZ).
- Validaciones de campos obligatorios en el servicio de render.
- Tests automatizados + CI (GitHub Actions).
- docker-compose para orquestar backend+db+frontend en dev.

Guía rápida de arranque (dev)
1. Backend
   - Crear virtualenv e instalar requirements:
     python -m venv .venv
     .venv\Scripts\activate (Windows) / source .venv/bin/activate (UNIX)
     pip install -r backend/requirements.txt
   - Crear .env en backend con DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/dbname
   - Ejecutar alembic upgrade head (tras init y primer migration)
   - Ejecutar uvicorn backend.app.main:app --reload --port 8000
2. Frontend
   - ng new angular-app --routing --style=css
   - ng serve --open

Mantenimiento
- Documentar migraciones y procedimientos en DOCKER.md y README del backend.
- Mantener archive/ para files antiguos; NO borrar hasta validar.
