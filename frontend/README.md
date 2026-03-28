# Frontend - React + Vite

## Dependencias instaladas

```bash
npm install axios
npm install react-router-dom
```

## Estructura del proyecto

```
frontend/
├── src/
│   ├── components/    # Componentes reutilizables
│   ├── pages/        # Páginas/rutas
│   ├── services/     # Llamadas a API
│   ├── hooks/        # Custom hooks
│   ├── context/      # Estado global
│   └── App.jsx       # Componente principal
├── public/           # Archivos estáticos
└── package.json
```

## Scripts

| Acción | Comando |
|--------|---------|
| Iniciar dev | `npm run dev` |
| Build | `npm run build` |
| Preview | `npm run preview` |

## Inicio rápido

```bash
cd frontend
npm install
npm run dev
```

## Configuración API

La API está en: `http://localhost:8000`

Para cambiar la URL base, crear archivo `.env`:
```
VITE_API_URL=http://localhost:8000
```

## Reglas de código

- Sin comentarios en el código a menos que sea estrictamente necesario
- Usar componentes funcionales con hooks
- Nombres en PascalCase para componentes
- Props con desestructuración

## Fases de desarrollo

### Fase 1: Estructura (Completada)
- [x] Proyecto React + Vite
- [x] Dependencias base
- [x] Axios instalado

### Fase 2: Componentes base (Completada)
- [x] Layout principal
- [x] Navbar
- [x] Rutas

### Fase 3: Integración API (Completada)
- [x] Service API
- [x] CRUD Plantillas
- [x] CRUD Documentos

### Fase 4: Vistas (Completada)
- [x] Lista de plantillas
- [x] Lista de documentos
- [x] Generador de documentos

### Fase 5: Mejoras UI (Completada)
- [x] Diseño profesional con colores azul oscuro
- [x] Cards mejoradas
- [x] Responsive básico

### Fase 6: CRUD Plantillas (Pendiente)
- [ ] Formulario crear plantilla
- [ ] Formulario editar plantilla
- [ ] Eliminar plantilla
- [ ] Agregar campos dinámicamente

### Fase 7: Gestión Documentos (Pendiente)
- [ ] Ver documento generado completo
- [ ] Cambiar estado documento
- [ ] Eliminar documento

### Fase 8: Impresión (Pendiente)
- [ ] Vista de impresión del documento
- [ ] Botón imprimir
- [ ] Formato optimizado para impresión

### Fase 9: Documentos Estructurados (Pendiente)
- [ ] Modelar documentos tipo legal (como el PDF de declaración jurada)
- [ ] Soporte para secciones con formato específico
- [ ] Tablas y listas dentro de documentos
- [ ] Carga de plantillas Word (.docx)

### Fase 10: Generación PDF (Pendiente)
- [ ] Integrar librería de generación PDF
- [ ] Exportar documento a PDF
- [ ] Diseño profesional del PDF
- [ ] Encabezados/pie de página
- [ ] Firma digital/espacio para firma
