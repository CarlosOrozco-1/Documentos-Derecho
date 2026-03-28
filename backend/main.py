from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from database.database import engine
from routers import plantilla, plantilla_campo, documento_generado, documento_valor, generar


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    await engine.dispose()


app = FastAPI(
    title="Sistema Documentos Jurídicos",
    description="API para gestión de documentos jurídicos",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(plantilla.router)
app.include_router(plantilla_campo.router)
app.include_router(documento_generado.router)
app.include_router(documento_valor.router)
app.include_router(generar.router)


@app.get("/")
async def root():
    return {"message": "API Sistema Documentos Jurídicos", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
