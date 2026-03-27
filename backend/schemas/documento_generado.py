from pydantic import BaseModel
from datetime import datetime


class DocumentoGeneradoBase(BaseModel):
    plantilla_id: int
    nombre_documento: str
    contenido_final: str
    estado: str = "borrador"


class DocumentoGeneradoCreate(DocumentoGeneradoBase):
    pass


class DocumentoGeneradoUpdate(BaseModel):
    nombre_documento: str | None = None
    contenido_final: str | None = None
    estado: str | None = None


class DocumentoGeneradoResponse(DocumentoGeneradoBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
