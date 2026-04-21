# Guía de Setup: Visual Studio 2026 + .NET Core + PostgreSQL

Esta guía te ayuda a configurar el proyecto backend en Visual Studio 2026 desde cero, conectado a PostgreSQL.

---

## 1. Requisitos previos

- Visual Studio 2026 instalado (con cargas de trabajo .NET Core).
- .NET 8 SDK o posterior (verificar con `dotnet --version`).
- PostgreSQL corriendo (Docker o instalación local).
- Git instalado.
- Clone del repositorio.

Verifica versiones:
```powershell
dotnet --version
dotnet tool list --global
psql --version  # si PostgreSQL está instalado localmente
```

---

## 2. Preparar la base de datos

### 2.1 Levantar PostgreSQL

Si usas Docker:
```powershell
docker start basePrueba
docker ps  # verifica que esté corriendo
```

Si PostgreSQL está instalado localmente, asegúrate de que el servicio esté corriendo.

### 2.2 Ejecutar el script de inicialización

Desde la carpeta `base-de-datos/scripts/`, ejecuta el script SQL `Base.sql` usando pgAdmin, DBeaver, o psql:

Con psql (línea de comandos):
```powershell
psql -U postgres -h localhost -d postgres -f Base.sql
```

O si está en Docker:
```powershell
docker exec -it basePrueba psql -U postgres -d postgres -f /base-de-datos/scripts/Base.sql
```

Verifica que se creó el schema:
```powershell
psql -U postgres -h localhost -d postgres -c "SELECT schema_name FROM information_schema.schemata WHERE schema_name='juridico';"
```

---

## 3. Crear el proyecto .NET Core en Visual Studio 2026

### 3.1 Crear solución
Abre Visual Studio 2026 → New Project:
- Template: **ASP.NET Core Web API**
- Name: `DerechoInformatico.API` (o el que prefieras)
- Location: raíz del repo o en una carpeta `backend/`
- Framework: **.NET 8** (o la versión LTS más reciente)

### 3.2 Estructura recomendada del proyecto
Dentro de la solución, organiza el proyecto así:
```
DerechoInformatico.API/
├── Controllers/           # endpoints
├── Data/                  # DbContext y entidades (generadas)
├── Models/                # DTOs y modelos adicionales
├── Services/              # lógica de negocio
├── appsettings.json       # configuración base
├── appsettings.Development.json
└── Program.cs             # Startup
```

---

## 4. Instalar dependencias

### 4.1 Agregar NuGet packages

En Visual Studio:
- View → NuGet Package Manager → Package Manager Console
- Ejecuta los siguientes comandos:

```powershell
Install-Package Npgsql.EntityFrameworkCore.PostgreSQL
Install-Package Microsoft.EntityFrameworkCore.Design
Install-Package Microsoft.EntityFrameworkCore.Tools
```

O usando línea de comandos (en la carpeta del proyecto):
```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

### 4.2 Instalar herramientas EF Core globales
```powershell
dotnet tool install --global dotnet-ef
```

---

## 5. Scaffold del DbContext y entidades

### 5.1 Generar desde la base de datos existente

Abre **Package Manager Console** en Visual Studio y ejecuta:
```powershell
dotnet ef dbcontext scaffold "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=tu_password" Npgsql.EntityFrameworkCore.PostgreSQL ^
  --schema juridico ^
  --output-dir Data ^
  --context JuridicoContext ^
  --use-database-names ^
  --data-annotations
```

**Nota:** Reemplaza `tu_password` con la contraseña real de PostgreSQL.

### 5.2 Resultado esperado
Se crearán en la carpeta `Data/`:
- `JuridicoContext.cs` (DbContext)
- `Plantilla.cs` (entidad)
- `PlantillaCampo.cs` (entidad)
- `DocumentoGenerado.cs` (entidad)
- `DocumentoValor.cs` (entidad)

---

## 6. Configurar appsettings

### 6.1 Actualizar appsettings.Development.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=tu_password"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  },
  "AllowedHosts": "*"
}
```

### 6.2 Configurar en Program.cs
Abre `Program.cs` y añade (antes de `var app = builder.Build();`):

```csharp
// Add services to the container
builder.Services.AddDbContext<JuridicoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS (para Angular frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use CORS
app.UseCors("AllowAngular");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
```

---

## 7. Crear un controlador de prueba

Crea una carpeta `Controllers/` en el proyecto y un archivo `PlantillasController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;
using DerechoInformatico.API.Data;
using Microsoft.EntityFrameworkCore;

namespace DerechoInformatico.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlantillasController : ControllerBase
    {
        private readonly JuridicoContext _context;

        public PlantillasController(JuridicoContext context)
        {
            _context = context;
        }

        // GET: api/plantillas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plantilla>>> GetPlantillas()
        {
            return await _context.Plantillas.ToListAsync();
        }

        // GET: api/plantillas/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Plantilla>> GetPlantilla(int id)
        {
            var plantilla = await _context.Plantillas.FindAsync(id);
            if (plantilla == null)
                return NotFound();
            return plantilla;
        }

        // POST: api/plantillas
        [HttpPost]
        public async Task<ActionResult<Plantilla>> PostPlantilla(Plantilla plantilla)
        {
            _context.Plantillas.Add(plantilla);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlantilla), new { id = plantilla.Id }, plantilla);
        }
    }
}
```

---

## 8. Probar la API

### 8.1 Ejecutar la aplicación
En Visual Studio:
- Presiona **F5** o click en **Start Debugging** (botón verde play).
- Se abrirá la URL `https://localhost:7000` (o el puerto asignado).

### 8.2 Probar endpoints
Ve a `https://localhost:7000/swagger` para ver Swagger UI.

Prueba los endpoints:
- **GET** `/api/plantillas` → debe devolver las plantillas de la DB.
- **GET** `/api/plantillas/1` → debe devolver la plantilla con id=1.

---

## 9. Estructura final recomendada

```
backend/
├── Controllers/
│   ├── PlantillasController.cs
│   ├── PlantillaCamposController.cs
│   ├── DocumentosGeneradosController.cs
│   └── DocumentoValoresController.cs
├── Data/
│   ├── JuridicoContext.cs
│   ├── Plantilla.cs
│   ├── PlantillaCampo.cs
│   ├── DocumentoGenerado.cs
│   └── DocumentoValor.cs
├── Models/
│   ├── CreatePlantillaDto.cs
│   ├── UpdatePlantillaDto.cs
│   └── (otros DTOs)
├── Services/
│   ├── PlantillaService.cs
│   ├── GenerarDocumentoService.cs
│   └── (otros servicios)
├── appsettings.json
├── appsettings.Development.json
├── Program.cs
└── DerechoInformatico.API.csproj
```

---

## 10. Pasos siguientes

1. Implementar controladores CRUD para todas las entidades.
2. Crear servicios para lógica de negocio (renderizado de plantillas, validaciones).
3. Añadir validaciones con Data Annotations.
4. Crear tests unitarios (xUnit o NUnit).
5. Configurar CI/CD (GitHub Actions).
6. Integrar con el frontend Angular.

---

## 11. Troubleshooting

| Problema | Solución |
|----------|----------|
| "Could not load type from assembly..." | Instala los paquetes NuGet necesarios. |
| Connection timeout en scaffold | Verifica que PostgreSQL está corriendo y la connection string es correcta. |
| "The name 'JuridicoContext' does not exist" | Ejecuta el scaffold de nuevo o asegúrate que la carpeta Data/ esté en el proyecto. |
| CORS errors desde Angular | Configura CORS en Program.cs (ver paso 6.2). |
| Swagger no se abre | Verifica que `app.UseSwagger()` y `app.UseSwaggerUI()` estén en Program.cs. |

---

## 12. Recursos útiles

- [Documentación EF Core + Npgsql](https://www.npgsql.org/efcore/)
- [ASP.NET Core Web API](https://learn.microsoft.com/es-es/aspnet/core/web-api/)
- [Swagger/OpenAPI en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/tutorials/web-api-help-pages-using-swagger)

---

¡Listo! Ahora puedes empezar a construir los controladores y servicios en Visual Studio.
