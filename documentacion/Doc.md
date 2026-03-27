# Proyecto: Sistema de Gestión de Documentos Jurídicos

## Contexto General

Este proyecto consiste en el desarrollo de un sistema web para la gestión de documentos jurídicos, enfocado en la redacción, generación y seguimiento de documentos como:

* Declaraciones juradas
* Contratos
* Escrituras públicas
* Otros documentos legales estructurados

El sistema permitirá trabajar con **plantillas reutilizables**, donde los documentos contienen partes fijas y campos variables.

---

## Enfoque de Desarrollo

El proyecto se está desarrollando bajo una arquitectura de **3 capas**:

1. Base de datos
2. Backend (API)
3. Frontend

### Regla de trabajo

Se trabaja estrictamente por fases:

* No se avanza a la siguiente capa hasta validar completamente la anterior
* Cada fase se prueba antes de continuar

---

## Tecnologías Seleccionadas

### Base de datos

* PostgreSQL
* Uso de `SCHEMA` dedicado (`juridico`)
* Convenciones:

  * `INT GENERATED ALWAYS AS IDENTITY`
  * `TIMESTAMPTZ`
  * `TEXT`

### Backend

* Python
* FastAPI
* SQLAlchemy

### Frontend (futuro)

* React

---

## Fase 1: Base de Datos (Completada)

### Objetivo

Definir la estructura mínima para soportar:

* Plantillas
* Campos variables
* Documentos generados
* Valores capturados

### Schema

```sql
CREATE SCHEMA IF NOT EXISTS juridico;
```

### Tablas principales

#### 1. plantillas

Contiene el formato base del documento.

#### 2. plantilla_campos

Define los campos variables de cada plantilla.

#### 3. documentos_generados

Guarda los documentos creados a partir de plantillas.

#### 4. documento_valores

Guarda los valores usados en cada documento.

---

## Lógica del Sistema

### Plantilla

Ejemplo:

```
Yo, {{nombre_completo}}, identificado con DPI {{dpi}}, declaro...
```

### Variables

* nombre_completo
* dpi
* direccion

### Flujo

1. Se define una plantilla
2. Se registran campos
3. Se capturan valores
4. Se genera documento final

---

## Fase 2: Backend (En progreso)

### Objetivo

Construir una API que permita:

* Consultar plantillas
* Consultar campos
* Generar documentos
* Guardar valores

### Endpoints previstos

* GET /plantillas
* GET /plantillas/{id}
* GET /plantillas/{id}/campos
* POST /documentos
* GET /documentos/{id}

---

## Lógica clave del backend

### Renderizado de plantilla

Se reemplazan los campos variables por valores reales.

Ejemplo:

```
{{nombre_completo}} → Juan Pérez
```

Resultado:

```
Yo, Juan Pérez, identificado con DPI...
```

---

## Estado actual del proyecto

* Base de datos creada y probada
* Datos de prueba insertados
* Backend en fase de construcción paso a paso

---

## Próximo paso inmediato

Continuar con la Fase 2:

1. Estructura del proyecto backend
2. Entorno virtual
3. Dependencias
4. Conexión a base de datos

---

## Notas importantes

* Se trabaja incrementalmente
* Se evita sobreingeniería en fases tempranas
* El enfoque es validar primero el núcleo del negocio

---

## Futuro del sistema

Fases posteriores incluirán:

* Carga de archivos Word
* Generación de documentos .docx
* Control de versiones
* Flujos de aprobación
* Gestión de expedientes
* Automatización documental

---

**Documento de contexto del proyecto - uso interno**
