from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://postgres:123456***@localhost:5432/postgres"
    database_schema: str = "juridico"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
