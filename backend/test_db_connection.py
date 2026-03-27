import asyncio
from database.database import engine


async def test_connection():
    try:
        async with engine.begin() as conn:
            version = (await conn.execute(__import__('sqlalchemy').text("SELECT version()"))).scalar()
            db_name = (await conn.execute(__import__('sqlalchemy').text("SELECT current_database()"))).scalar()
            schema = (await conn.execute(__import__('sqlalchemy').text("SELECT current_schema()"))).scalar()
            print(f"✓ Conexión exitosa")
            print(f"  Base de datos: {db_name}")
            print(f"  Schema: {schema}")
            print(f"  PostgreSQL: {version}")
            return True
    except Exception as e:
        print(f"✗ Error de conexión: {e}")
        return False
    finally:
        await engine.dispose()


if __name__ == "__main__":
    success = asyncio.run(test_connection())
    exit(0 if success else 1)
