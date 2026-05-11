# 🚀 GUÍA RÁPIDA - FASE 1

Carlos, aquí está el resumen ejecutivo para empezar:

---

## 📊 Lo que haremos en Fase 1

Crear la estructura base de tu sistema jurídico con 3 tablas:

```
roles (3 registros)
  ├── ADMINISTRADOR - Acceso total
  ├── ABOGADO - Gestión de documentos
  └── ASISTENTE - Consulta limitada

usuarios (1 admin inicial)
  └── admin / admin@sistema.com (cambiar en producción)

personas (1 persona inicial)
  └── Administrador Sistema
```

---

## ✅ Pasos Inmediatos

### 1. Ejecutar Script en SQL Management Studio

```
ARCHIVOS NECESARIOS:
📁 C:\Users\usuario\Documents\2026\Proyecto-Universitarios\Derecho-Informatico\Documentos-Derecho\Database\scripts\

Script a usar: fase-1.sql
```

**En SSMS:**
1. Abre **SQL Server Management Studio**
2. Conecta a `localhost` (Autenticación Windows)
3. Nueva consulta (Ctrl+O)
4. Abre archivo: `fase-1.sql`
5. Ejecuta con F5
6. ¡Listo! Base de datos creada ✅

### 2. Validar que Todo Está Bien

```sql
-- Ejecuta esto en SSMS para verificar:
USE proyecto_derecho_informatico_v3;
SELECT * FROM roles;
SELECT * FROM usuarios;
SELECT * FROM personas;
```

Deberías ver:
- 3 roles ✓
- 1 usuario (admin) ✓
- 1 persona (Administrador Sistema) ✓

---

## 🔐 Credenciales Iniciales (Cambiar después)

```
Usuario: admin
Correo: admin@sistema.com
Contraseña: Admin123
Rol: ADMINISTRADOR
```

---

## 📚 Documentación Disponible

He creado para ti:

1. **ESTRUCTURA_PROYECTO.md** - Vista completa del proyecto (5 fases)
2. **PLAN_FASE_1.md** - Documentación técnica detallada de Fase 1
3. **fase-1.sql** - Script listo para ejecutar

---

## 🎯 Después de Fase 1

Cuando termines de ejecutar el script:

1. ✅ Base de datos lista
2. ⏳ Crearemos Backend (C# .NET)
3. ⏳ Crearemos Frontend (Angular)
4. ⏳ Conectaremos todo (Fase 2+)

---

## 🆘 ¿Algún Problema?

**Error al conectar?**
- Verifica que SQL Server está corriendo
- Intenta con `.\SQLEXPRESS` en lugar de `localhost`

**¿Ya existe la base de datos?**
- Ejecuta primero: `full-drop-base.sql` para limpiar

**¿Las contraseñas qué son esos "hashes"?**
- Son contraseñas codificadas por seguridad. No se guardan en texto plano.

---

## ✨ Próxima Acción

👉 **Ejecuta el script fase-1.sql en SQL Management Studio**

Una vez completado, avísame y continuamos con:
- Validación de datos
- Creación del Backend (C#)
- Creación del Frontend (Angular)

¿Comenzamos? 🚀

