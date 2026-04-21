# Procedimientos Docker y Base de Datos

## Levantar contenedores después de reinicio

### 1. Ver estado de contenedores
```bash
docker ps -a
```

### 2. Levantar PostgreSQL
```bash
docker start basePrueba
```

### 3. Verificar que está corriendo
```bash
docker ps
```

### 4. Probar conexión a PostgreSQL
```bash
docker exec -it basePrueba psql -U postgres -c "SELECT version();"
```

### 5. Conectar desde aplicación
Verificar que la cadena de conexión apunte a:
- Host: localhost (o el nombre del contenedor si usas docker network)
- Puerto: 5432
- Usuario: postgres

---

## Comandos útiles

| Acción | Comando |
|--------|---------|
| Ver contenedores | `docker ps -a` |
| Iniciar | `docker start <nombre>` |
| Detener | `docker stop <nombre>` |
| Ver logs | `docker logs <nombre>` |
| Entrar al contenedor | `docker exec -it <nombre> bash` |
| Reiniciar | `docker restart <nombre>` |

## Red de contenedores
Si tienes múltiples contenedores (backend, frontend, postgres), verifica que estén en la misma red:
```bash
docker network ls
docker network inspect bridge
```

---

## Scaffolding EF Core desde PostgreSQL (Database-First)

Si estás usando .NET Core y EF Core (en Visual Studio 2026), sigue estos pasos para generar modelos y DbContext desde la base de datos PostgreSQL existente:

### Requisitos previos
1. PostgreSQL corriendo (docker o local).
2. Schema `juridico` creado (ejecutar `base-de-datos/scripts/Base.sql`).
3. Proyecto .NET Core creado en Visual Studio 2026.

### Pasos para scaffolding

#### 1. Instalar herramientas EF Core (si no las tienes)
Abre la PowerShell o Command Prompt y ejecuta:
```powershell
dotnet tool install --global dotnet-ef
```

Si ya las tienes instaladas, actualiza:
```powershell
dotnet tool update --global dotnet-ef
```

#### 2. Instalar Npgsql EF Core Provider
En el Project File (.csproj) o ejecuta en la carpeta del proyecto:
```bash
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

#### 3. Generar DbContext y Modelos
Desde la carpeta raíz del proyecto .NET, ejecuta el comando de scaffolding. Adapta la connection string según tu entorno:

```bash
dotnet ef dbcontext scaffold "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=123456***" Npgsql.EntityFrameworkCore.PostgreSQL ^
  --schema juridico ^
  --output-dir Data ^
  --context JuridicoContext ^
  --use-database-names ^
  --data-annotations
```

**Explicación de parámetros:**
- `Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=***`: tu connection string.
- `--schema juridico`: lee tablas del schema `juridico`.
- `--output-dir Data`: genera código en la carpeta `Data/` del proyecto.
- `--context JuridicoContext`: nombre de la clase del contexto.
- `--use-database-names`: mantiene nombres exactos de columnas/tablas.
- `--data-annotations`: usa DataAnnotations en lugar de Fluent API (opcional).

#### 4. Verificar entidades generadas
Revisa los archivos en la carpeta `Data/`:
- `JuridicoContext.cs`: tu DbContext.
- Archivos de entidades: `Plantilla.cs`, `PlantillaCampo.cs`, `DocumentoGenerado.cs`, `DocumentoValor.cs`.

#### 5. Ajustes recomendados (manual)
- **DateTime → DateTimeOffset**: Si prefieres trabajar con zonas horarias, convierte propiedades `DateTime` a `DateTimeOffset`:
  ```csharp
  public DateTimeOffset FechaCreacion { get; set; }
  ```

- **Configurar schema por defecto** (opcional, en OnModelCreating):
  ```csharp
  modelBuilder.HasDefaultSchema("juridico");
  ```

#### 6. Configurar en appsettings
Actualiza tu `appsettings.Development.json` con la connection string:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=tu_pass"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  }
}
```

#### 7. Usar en Startup/Program.cs
```csharp
builder.Services.AddDbContext<JuridicoContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
```

### Troubleshooting

| Problema | Solución |
|----------|----------|
| "Could not load type from assembly..." | Asegúrate de tener Npgsql.EntityFrameworkCore.PostgreSQL instalado. |
| Connection timeout | Verifica que PostgreSQL está corriendo y la connection string es correcta. |
| Schema no encontrado | Confirma que ejecutaste `Base.sql` y el schema `juridico` existe. |
| Entidades no se generan | Usa `--verbose` al final del comando para ver detalles de qué falla. |

### Alternativa: Script PowerShell automatizado
Copia este script a una carpeta del proyecto (por ejemplo `scripts/scaffold-db.ps1`) y ejecuta con:
```powershell
./scripts/scaffold-db.ps1 -Host "localhost" -Port 5432 -Database "postgres" -Username "postgres" -Password "tu_pass"
```

**Contenido del script:**
```powershell
param(
    [string]$Host = "localhost",
    [int]$Port = 5432,
    [string]$Database = "postgres",
    [string]$Username = "postgres",
    [string]$Password = "tu_pass"
)

$connectionString = "Host=$Host;Port=$Port;Database=$Database;Username=$Username;Password=$Password"

Write-Host "Generando DbContext y modelos desde PostgreSQL..."
Write-Host "Connection String: $connectionString"

dotnet ef dbcontext scaffold $connectionString Npgsql.EntityFrameworkCore.PostgreSQL `
  --schema juridico `
  --output-dir Data `
  --context JuridicoContext `
  --use-database-names `
  --data-annotations `
  --force

Write-Host "Scaffolding completado. Revisa la carpeta Data/."
```
