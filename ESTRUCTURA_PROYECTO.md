# 📁 Estructura del Proyecto - Derecho Informático v3.0

## 🎯 Visión General

Sistema integral de gestión jurídica con arquitectura de tres capas:
- **Backend:** C# con Visual Studio 2026 (API REST)
- **Frontend:** Angular 
- **Base de Datos:** SQL Server (SQL Management Studio)

---

## 📂 Estructura de Carpetas

```
Proyecto-Universitarios/
├── Derecho-Informatico/
│   └── Documentos-Derecho/
│       ├── Database/
│       │   ├── scripts/
│       │   │   ├── fase-1.sql                          ✅ Fase 1: Base (Roles, Usuarios, Personas)
│       │   │   ├── fase-2-gestion-plantillas.sql       ⏳ Fase 2: Plantillas
│       │   │   ├── fase-3-documentos-juridicos-(p1).sql ⏳ Fase 3: Documentos (Parte 1)
│       │   │   ├── fase-4-documentos-juridicos-(p2).sql ⏳ Fase 4: Documentos (Parte 2)
│       │   │   ├── fase-5-citas-y-auditorias.sql       ⏳ Fase 5: Citas & Auditoría
│       │   │   ├── full-drop-base.sql                  (Script de limpieza)
│       │   │   ├── revision_tablas.sql                 (Verificación)
│       │   │   └── verificacion-post-implementacion.sql (Validación)
│       │   └── README.md                               (Documentación DB)
│       │
│       ├── Backend/
│       │   ├── DerecoInformatico.API/               (Proyecto Principal)
│       │   ├── DerecoInformatico.Models/            (Modelos de datos)
│       │   ├── DerecoInformatico.Services/          (Lógica de negocio)
│       │   ├── DerecoInformatico.Data/              (Acceso a datos)
│       │   └── DerecoInformatico.sln                (Solución Visual Studio)
│       │
│       ├── Frontend/
│       │   ├── src/
│       │   │   ├── app/
│       │   │   │   ├── components/        (Componentes reutilizables)
│       │   │   │   ├── pages/             (Páginas principales)
│       │   │   │   ├── services/          (Servicios HTTP)
│       │   │   │   └── models/            (Interfaces TypeScript)
│       │   │   ├── assets/                (Imágenes, estilos)
│       │   │   └── main.ts                (Entrada principal)
│       │   ├── package.json
│       │   └── angular.json
│       │
│       ├── Documentacion/
│       │   ├── ESTRUCTURA_PROYECTO.md     (Este archivo)
│       │   ├── PLAN_DE_FASES.md           (Plan detallado)
│       │   ├── API_ENDPOINTS.md           (Endpoints del backend)
│       │   ├── DIAGRAMA_ER.md             (Diagrama entidad-relación)
│       │   └── GUIAS_DESARROLLO.md        (Guías técnicas)
│       │
│       ├── Fases_de_implementacion/
│       │   ├── MD-1.md                    (Descripción general)
│       │   ├── MD-2.txt                   (Arquitectura DB)
│       │   └── MD-3.txt                   (Plan de fases)
│       │
│       └── README.md                      (Inicio del proyecto)
```

---

## 🔄 Flujo de Trabajo

### FASE 1: Base del Sistema ✅ ACTUAL
**Status:** En preparación
**Base de Datos:** Creación de tablas fundamentales
**Tareas:**
1. ✅ Scripts SQL preparados
2. ⏳ Ejecutar script en SQL Management Studio
3. ⏳ Validar integridad de datos
4. ⏳ Documentar credenciales iniciales

### FASE 2: Gestión de Plantillas ⏳
**Dependencias:** Fase 1 completada
**Base de Datos:** Tablas de plantillas y variables
**Tareas:**
1. Crear backend: Endpoints CRUD de plantillas
2. Crear frontend: Interfaz de gestión de plantillas

### FASE 3: Documentos Jurídicos (Parte 1) ⏳
**Dependencias:** Fase 2 completada
**Base de Datos:** Tablas de documentos principales
**Tareas:**
1. Backend: Generación de documentos desde plantillas
2. Frontend: Formularios dinámicos

### FASE 4: Documentos Jurídicos (Parte 2) ⏳
**Dependencias:** Fase 3 completada
**Base de Datos:** Relacionamiento de partes y variables
**Tareas:**
1. Backend: Gestión de partes y valores
2. Frontend: Historial y cambios de estado

### FASE 5: Citas y Auditoría ⏳
**Dependencias:** Fase 4 completada
**Base de Datos:** Tablas de citas y auditoría
**Tareas:**
1. Backend: Agenda de citas
2. Backend: Sistema de auditoría
3. Frontend: Calendario y reportes

---

## 📊 Diagrama de Capas

```
┌─────────────────────────────────────────┐
│         FRONTEND (Angular)              │
│  - Componentes UI                       │
│  - Gestión de estado                    │
│  - Consumo de APIs                      │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
┌────────────────▼────────────────────────┐
│      BACKEND (C# .NET)                  │
│  - Controllers (Endpoints)              │
│  - Services (Lógica de negocio)         │
│  - Data Access (EntityFramework)        │
└────────────────┬────────────────────────┘
                 │ SQL
┌────────────────▼────────────────────────┐
│    BASE DE DATOS (SQL Server)           │
│  - 13 Tablas (por fase)                 │
│  - Relaciones FK                        │
│  - Índices                              │
└─────────────────────────────────────────┘
```

---

## 🗄️ Tablas por Fase

### FASE 1 (3 tablas)
- `roles` - Catálogo de roles
- `usuarios` - Usuarios del sistema
- `personas` - Personas físicas/jurídicas

### FASE 2 (3 tablas)
- `categorias_plantilla` - Tipos de plantillas
- `plantillas` - Documentos base
- `plantilla_variables` - Variables dinámicas

### FASE 3 (2 tablas)
- `estados_documento` - Estados posibles
- `documentos_juridicos` - Documentos generados

### FASE 4 (3 tablas)
- `documento_partes` - Actores del documento
- `documento_variables_valores` - Valores específicos
- `documento_historial_estados` - Trazabilidad

### FASE 5 (2 tablas)
- `citas` - Agenda de citas
- `auditoria` - Log de cambios

---

## 🔐 Convenciones de Código

### Base de Datos
- Nombres en español, minúsculas con guiones bajos
- Tablas: `nombre_tabla`
- Columnas: `id_tabla`, `nombre_columna`
- Claves primarias: `PK_tabla`
- Claves foráneas: `FK_tabla_referencia`

### Backend (C#)
- PascalCase para clases y métodos
- camelCase para propiedades privadas
- Espacios de nombres: `DerecoInformatico.{Capa}`

### Frontend (Angular)
- kebab-case para nombres de archivos
- PascalCase para clases de componentes
- camelCase para propiedades y métodos

---

## 📝 Próximos Pasos

1. **AHORA:** Ejecutar script de Fase 1 en SQL Management Studio
2. **Validar:** Verificar tablas y datos iniciales
3. **Documentar:** Credenciales de acceso
4. **Preparar:** Backend (Visual Studio 2026)
