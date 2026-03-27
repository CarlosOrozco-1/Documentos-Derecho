# Procedimientos Docker

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
