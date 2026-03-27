# Backend - Python + FastAPI

## Dependencias instaladas

```
fastapi==0.135.2
uvicorn==0.42.0
sqlalchemy==2.0.48
asyncpg==0.31.0
psycopg2-binary==2.9.11
pydantic==2.12.5
pydantic-settings==2.13.1
python-dotenv==1.2.2
```

## Instalación

### 1. Verificar Python
```bash
python3 --version
```

### 2. Instalar pip (si no existe)
```bash
python3 -m ensurepip --upgrade
```

### 3. Instalar dependencias
```bash
cd backend
python3 -m pip install -r requirements.txt
```

### 4. Generar requirements.txt
```bash
python3 -m pip freeze | grep -iE "^(fastapi|uvicorn|sqlalchemy|asyncpg|psycopg2|pydantic|pydantic-settings|python-dotenv|greenlet|annotated)" > requirements.txt
```

## Estructura del proyecto

```
backend/
├── config/          # Configuraciones (DB, variables entorno)
├── database/       # Conexión y sesión de BD
├── models/          # Modelos SQLAlchemy (tablas)
├── schemas/         # Schemas Pydantic (validación)
├── routers/         # Rutas/endpoints de la API
├── services/        # Lógica de negocio
├── tests/           # Pruebas
├── main.py          # Entry point
└── requirements.txt  # Dependencias
```

## Fases de Desarrollo

### Fase 1: Base de datos (Completada)
- [x] Crear schema `juridico`
- [x] Crear tablas
- [x] Validar conexión

### Fase 2: Backend - Conexión (Completada)
- [x] Estructura de carpetas
- [x] Dependencias instaladas
- [x] Conexión a PostgreSQL validada

### Fase 3: Backend - Models (Completada)
- [x] `models/plantilla.py`
- [x] `models/plantilla_campo.py`
- [x] `models/documento_generado.py`
- [x] `models/documento_valor.py`

### Fase 4: Backend - Schemas (Pendiente)
- [ ] `schemas/plantilla.py`
- [ ] `schemas/plantilla_campo.py`
- [ ] `schemas/documento_generado.py`
- [ ] `schemas/documento_valor.py`

### Fase 5: Backend - Routers (Pendiente)
- [ ] CRUD Plantillas
- [ ] CRUD Campos
- [ ] CRUD Documentos

### Fase 6: Backend - Services (Pendiente)
- [ ] Lógica de negocio
- [ ] Renderizado de plantillas

### Fase 7: Frontend (Pendiente)
- [ ] React
- [ ] Integración con API

## Scripts útiles

| Acción | Comando |
|--------|---------|
| Iniciar servidor | `uvicorn main:app --reload` |
| Ver documentación | `http://localhost:8000/docs` |
| Validar conexión DB | `python3 test_db_connection.py` |
| Validar modelos | `python3 -c "from models.plantilla import Plantilla; print('OK')"` |
