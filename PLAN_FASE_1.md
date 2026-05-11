# 📋 PLAN DETALLADO - FASE 1: Base del Sistema

**Versión:** 1.0  
**Estado:** 🔴 En Preparación  
**Inicio:** Fase 1  
**Objetivo:** Crear la estructura base de usuarios, roles y personas

---

## 📌 Resumen Ejecutivo

La Fase 1 establece los cimientos del sistema con tres tablas esenciales:

| Tabla | Registros | Propósito |
|-------|-----------|----------|
| `roles` | 3 | Definir permisos: Administrador, Abogado, Asistente |
| `usuarios` | 1 admin | Usuarios autenticados del sistema |
| `personas` | 1 | Personas físicas o jurídicas (clientes) |

**Dependencias:** Ninguna (Fase inicial)

---

## 🗄️ Detalle de Tablas

### 1. Tabla `roles`

**Propósito:** Catálogo de roles del sistema

```sql
CREATE TABLE roles (
    id_rol INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL UNIQUE,
    descripcion NVARCHAR(255),
    activo BIT DEFAULT 1
);
```

**Columnas:**
| Campo | Tipo | Restricciones | Descripción |
|-------|------|----------------|-------------|
| `id_rol` | INT | PK, IDENTITY | Identificador único autoincrementable |
| `nombre` | NVARCHAR(100) | NOT NULL, UNIQUE | ADMINISTRADOR, ABOGADO, ASISTENTE |
| `descripcion` | NVARCHAR(255) | NULL | Descripción del rol |
| `activo` | BIT | DEFAULT 1 | Flag de activación |

**Datos Iniciales:**
```sql
INSERT INTO roles (nombre, descripcion) VALUES
('ADMINISTRADOR', 'Acceso completo al sistema'),
('ABOGADO', 'Crea y gestiona documentos y citas'),
('ASISTENTE', 'Acceso limitado a consultas');
```

---

### 2. Tabla `usuarios`

**Propósito:** Usuarios autenticados del sistema

```sql
CREATE TABLE usuarios (
    id_usuario INT IDENTITY(1,1) PRIMARY KEY,
    id_rol INT NOT NULL FOREIGN KEY REFERENCES roles(id_rol),
    nombres NVARCHAR(150) NOT NULL,
    apellidos NVARCHAR(150) NOT NULL,
    nombre_usuario NVARCHAR(100) NOT NULL UNIQUE,
    correo NVARCHAR(150) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    estado NVARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion DATETIME DEFAULT GETDATE()
);
```

**Columnas:**
| Campo | Tipo | Restricciones | Descripción |
|-------|------|----------------|-------------|
| `id_usuario` | INT | PK, IDENTITY | Identificador único |
| `id_rol` | INT | FK → roles | Relación con tabla roles |
| `nombres` | NVARCHAR(150) | NOT NULL | Nombre(s) del usuario |
| `apellidos` | NVARCHAR(150) | NOT NULL | Apellido(s) del usuario |
| `nombre_usuario` | NVARCHAR(100) | NOT NULL, UNIQUE | Username para login |
| `correo` | NVARCHAR(150) | NOT NULL, UNIQUE | Email único |
| `password_hash` | NVARCHAR(255) | NOT NULL | Hash de contraseña (bcrypt) |
| `estado` | NVARCHAR(20) | DEFAULT 'ACTIVO' | ACTIVO, INACTIVO, BLOQUEADO |
| `fecha_creacion` | DATETIME | DEFAULT GETDATE() | Timestamp de creación |

**Datos Iniciales:**
```sql
INSERT INTO usuarios (id_rol, nombres, apellidos, nombre_usuario, correo, password_hash, estado) 
VALUES 
(1, 'Administrador', 'Sistema', 'admin', 'admin@sistema.com', '$2b$10$HASH_BCRYPT_REAL', 'ACTIVO');
```

⚠️ **Importante:** El hash mostrado es un placeholder. En producción usar bcrypt real.

---

### 3. Tabla `personas`

**Propósito:** Registro de personas (clientes, notarios, etc.)

```sql
CREATE TABLE personas (
    id_persona INT IDENTITY(1,1) PRIMARY KEY,
    tipo_persona NVARCHAR(20) DEFAULT 'INDIVIDUAL',
    nombre_completo NVARCHAR(255) NOT NULL,
    numero_identificacion NVARCHAR(50),
    nit NVARCHAR(30),
    telefono NVARCHAR(30),
    correo NVARCHAR(150),
    direccion NVARCHAR(500),
    estado NVARCHAR(20) DEFAULT 'ACTIVO',
    id_usuario INT FOREIGN KEY REFERENCES usuarios(id_usuario)
);
```

**Columnas:**
| Campo | Tipo | Restricciones | Descripción |
|-------|------|----------------|-------------|
| `id_persona` | INT | PK, IDENTITY | Identificador único |
| `tipo_persona` | NVARCHAR(20) | DEFAULT 'INDIVIDUAL' | INDIVIDUAL, EMPRESA |
| `nombre_completo` | NVARCHAR(255) | NOT NULL | Nombre completo |
| `numero_identificacion` | NVARCHAR(50) | NULL | Cédula, pasaporte, etc. |
| `nit` | NVARCHAR(30) | NULL | NIT (si es empresa) |
| `telefono` | NVARCHAR(30) | NULL | Número de teléfono |
| `correo` | NVARCHAR(150) | NULL | Email de contacto |
| `direccion` | NVARCHAR(500) | NULL | Domicilio |
| `estado` | NVARCHAR(20) | DEFAULT 'ACTIVO' | ACTIVO, INACTIVO |
| `id_usuario` | INT | FK → usuarios | Usuario vinculado (opcional) |

**Datos Iniciales:**
```sql
INSERT INTO personas (tipo_persona, nombre_completo, numero_identificacion, id_usuario, estado) 
VALUES ('INDIVIDUAL', 'Administrador Sistema', '0000000000001', 1, 'ACTIVO');
```

**Índices:**
```sql
CREATE INDEX IX_personas_identificacion ON personas(numero_identificacion);
CREATE INDEX IX_personas_nombre ON personas(nombre_completo);
```

---

## 🔗 Relaciones (Foreign Keys)

### FK: `usuarios` → `roles`

```sql
ALTER TABLE usuarios 
ADD CONSTRAINT FK_usuarios_roles 
FOREIGN KEY (id_rol) REFERENCES roles(id_rol);
```

- **Origen:** `usuarios.id_rol`
- **Destino:** `roles.id_rol`
- **Efecto:** Cada usuario debe tener un rol válido

### FK: `personas` → `usuarios`

```sql
ALTER TABLE personas 
ADD CONSTRAINT FK_personas_usuarios 
FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
```

- **Origen:** `personas.id_usuario`
- **Destino:** `usuarios.id_usuario`
- **Efecto:** Una persona puede estar vinculada a un usuario (opcional)

---

## 📋 Checklist de Ejecución

### Pre-Ejecución
- [ ] SQL Server Management Studio instalado
- [ ] Servidor SQL accesible (localhost o red)
- [ ] Permisos de crear bases de datos
- [ ] Script `fase-1.sql` disponible

### Ejecución en SSMS

**Opción A: Ejecución Manual (Recomendado)**

```
1. [ ] Abre SQL Server Management Studio
2. [ ] Conecta al servidor:
       - Tipo: Motor de base de datos
       - Servidor: localhost o .\SQLEXPRESS
       - Autenticación: Windows
3. [ ] Abre nueva consulta (Ctrl+O o File → New Query)
4. [ ] Carga el archivo fase-1.sql
5. [ ] Ejecuta (F5)
6. [ ] Verifica mensajes de éxito
```

**Opción B: Línea de Comandos**

```powershell
sqlcmd -S localhost -U SA -P YourPassword -i "C:\ruta\fase-1.sql"
```

### Post-Ejecución
- [ ] Base de datos `proyecto_derecho_informatico_v3` creada
- [ ] Tablas `roles`, `usuarios`, `personas` existen
- [ ] Foreign keys configuradas
- [ ] Índices creados
- [ ] Datos iniciales insertados

---

## ✅ Validación

### Verificación de Tablas

```sql
USE proyecto_derecho_informatico_v3;

-- Verificar roles
SELECT * FROM roles;
-- Resultado esperado: 3 registros (ADMINISTRADOR, ABOGADO, ASISTENTE)

-- Verificar usuarios
SELECT u.id_usuario, u.nombre_usuario, r.nombre as rol
FROM usuarios u 
JOIN roles r ON u.id_rol = r.id_rol;
-- Resultado esperado: Usuario 'admin' con rol 'ADMINISTRADOR'

-- Verificar personas
SELECT * FROM personas;
-- Resultado esperado: 1 persona vinculada a usuario admin

-- Verificar integridad
SELECT 
    u.nombre_usuario,
    r.nombre as rol,
    p.nombre_completo
FROM usuarios u
JOIN roles r ON u.id_rol = r.id_rol
LEFT JOIN personas p ON u.id_usuario = p.id_usuario;
```

---

## 🔐 Credenciales Iniciales

| Campo | Valor |
|-------|-------|
| **Usuario** | admin |
| **Correo** | admin@sistema.com |
| **Rol** | ADMINISTRADOR |
| **Contraseña** | Admin123 |
| **Hash** | `$2b$10$CAMBIA_ESTE_HASH...` |

⚠️ **IMPORTANTE - Cambiar después de la primera ejecución en producción**

---

## 📊 Diagrama ER (Fase 1)

```
┌─────────────────┐
│     roles       │
├─────────────────┤
│ id_rol (PK)     │
│ nombre (UNIQUE) │
│ descripcion     │
│ activo          │
└────────┬────────┘
         │ 1:N
         │
    ┌────▼────────────────┐
    │    usuarios         │
    ├─────────────────────┤
    │ id_usuario (PK)     │
    │ id_rol (FK) ────┐   │
    │ nombres         │   │
    │ apellidos       │   │
    │ nombre_usuario  │   │
    │ correo          │   │
    │ password_hash   │   │
    │ estado          │   │
    │ fecha_creacion  │   │
    └────┬────────────────┘
         │ 1:N
         │
    ┌────▼────────────┐
    │    personas     │
    ├─────────────────┤
    │ id_persona (PK) │
    │ tipo_persona    │
    │ nombre_completo │
    │ identificacion  │
    │ nit             │
    │ telefono        │
    │ correo          │
    │ direccion       │
    │ estado          │
    │ id_usuario (FK) │
    └─────────────────┘
```

---

## 📚 Próximos Pasos (Después de Fase 1)

1. **Configurar Backend:** Crear proyecto en Visual Studio
2. **Configurar Frontend:** Crear app Angular
3. **Implementar Autenticación:** JWT con login
4. **Iniciar Fase 2:** Gestión de plantillas

---

## 📝 Notas Importantes

### Seguridad
- Las contraseñas DEBEN almacenarse hasheadas (nunca en texto plano)
- Usar bcrypt con salt rounds ≥ 10
- Cambiar credenciales por defecto en producción

### Restricciones
- No hay CASCADE DELETE (datos históricos)
- Personas pueden no estar vinculadas a usuarios
- El estado es Varchar para permitir valores custom

### Rendimiento
- Índices en `numero_identificacion` y `nombre_completo` para búsquedas rápidas
- Primary Keys automáticos (IDENTITY)
- Timestamps automáticos (GETDATE())

---

## 🆘 Troubleshooting

### Error: "No se puede conectar al servidor"
```
Solución: Verifica que SQL Server está corriendo y el nombre de servidor es correcto
```

### Error: "Usuario ya existe"
```
Solución: El script verifica duplicados. Si falla, ejecuta full-drop-base.sql primero
```

### Error: "Foreign Key constraint failed"
```
Solución: Las tablas se crean en orden correcto. Verifica que roles existe antes de usuarios
```

---

## 📞 Contacto

Cualquier duda sobre la Fase 1, contactar a: **[Tu nombre]**

