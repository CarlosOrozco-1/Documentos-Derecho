# Proyecto Derecho Informático

## 1. Descripción General
Sistema de gestión de plantillas documentales jurídicas con ensamblaje dinámico y generación de documentos en PDF.

---

## 2. Componentes del Sistema

### 2.1 Plantillas
Documentos base con contenido estático y variables dinámicas.

Ejemplo:
Yo, {{nombre_cliente}}, identificado con DPI {{dpi_cliente}}...

---

### 2.2 Variables
Campos dinámicos que se reemplazan al generar el documento.

- nombre_cliente
- dpi_cliente
- direccion_cliente
- nombre_abogado
- colegiado_abogado

---

### 2.3 Origen de Datos

| Origen | Descripción |
|--------|------------|
| Sesión | Datos del usuario logueado |
| Base de datos | Datos persistidos |
| Formulario | Datos ingresados |
| Sistema | Fecha, hora, etc |

---

### 2.4 Ensamblaje
Reemplazo de variables en plantilla:

{{nombre_cliente}} → Juan Pérez

---

## 3. Flujo de la Aplicación

Login → Selección de plantilla → Carga de variables → Formulario dinámico → Validación → Ensamblaje → Vista previa → PDF

---

## 4. Flujo de Creación de Plantilla

Crear plantilla → Definir contenido → Insertar variables → Configurar variables → Validar → Activar

---

## 5. Modelo Conceptual

### Entidades:
- Usuarios
- Abogados
- Plantillas
- Variables
- Documentos generados

---

## 6. Tecnologías Propuestas

- Base de datos: Oracle
- Backend: ASP.NET Core
- Frontend: Angular
- PDF: Librerías backend (iText, QuestPDF)
- Control de versiones: GitHub
- Gestión: Notion

---

## 7. Objetivo

Permitir generar documentos legales dinámicos a partir de plantillas reutilizables, integrando datos del sistema, usuario y formularios.
