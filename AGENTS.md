# Reglas de Desarrollo - Sistema de Gestión de Documentos Jurídicos

## Arquitectura General

- Arquitectura de 3 capas: Base de datos → Backend → Frontend
- Trabajar estrictamente por fases, validar cada capa antes de continuar

---

## Base de Datos (PostgreSQL + Docker)

### Configuración
- Schema dedicado: `juridico`
- Conexión vía Docker: contenedor `basePrueba` en puerto `5432`
- Usuario: `postgres`

### Convenciones
- IDs: `INT GENERATED ALWAYS AS IDENTITY`
- Fechas: `TIMESTAMPTZ`
- Textos largos: `TEXT`
- Nombres en minúsculas y snake_case

### Scripts
- Ubicación: `base-de-datos/scripts/`
- Nomenclatura: `001_create_schema.sql`, `002_create_tables.sql`, etc.

### Procedures Docker
- Levantar: `docker start basePrueba`
- Verificar: `docker ps`
- Probar conexión: `docker exec basePrueba psql -U postgres -c "SELECT 1"`

---

## Backend (Python + FastAPI)

### Estructura de carpetas
```
backend/
├── config/          # Configuraciones (DB, variables entorno)
├── database/        # Conexión y sesión de BD
├── models/          # Modelos SQLAlchemy (tablas)
├── schemas/         # Schemas Pydantic (validación)
├── routers/         # Rutas/endpoints de la API
├── services/        # Lógica de negocio
├── tests/           # Pruebas
├── main.py          # Entry point
└── requirements.txt  # Dependencias
```

### Reglas de código
- Sin comentarios en el código a menos que sea estrictamente necesario
- Usar `async/await` para operaciones de BD
- Nombres descriptivos pero concisos
- Tipado con type hints

### Dependencias principales
```
fastapi
uvicorn
sqlalchemy[asyncio]
asyncpg
psycopg2-binary
pydantic
pydantic-settings
python-dotenv
```

### Conexión a BD
- Usar SQLAlchemy 2.0 con async
- Pool de conexiones configurado
- Credenciales via variables de entorno

---

## Frontend (Futuro - React)

### Ubicación
- `frontend/`

---

## Proceso de Desarrollo

1. **Base de datos**: Completar y validar scripts
2. **Backend**: Crear conexión → Models → Schemas → Routers → Services
3. **Frontend**: Solo cuando backend esté validado

### Validación en cada fase
- Probar conexión a BD antes de crear models
- Probar CRUD básico antes de lógica compleja
- Endpoints funcionando antes de integrar con frontend

---

##Notas sobre el código

- NO generar código sin autorización expresa
- Preferir soluciones simples sobre sobreingeniería
- Validar cada endpoint con las herramientas disponibles antes de continuar
