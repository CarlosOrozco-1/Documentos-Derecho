from pydantic import BaseModel
from datetime import datetime


class PlantillaBase(BaseModel):
    nombre: str
    tipo_documento: str
    contenido: str


class PlantillaCreate(PlantillaBase):
    pass


class PlantillaUpdate(BaseModel):
    nombre: str | None = None
    tipo_documento: str | None = None
    contenido: str | None = None
    activo: bool | None = None


class PlantillaResponse(PlantillaBase):
    id: int
    activo: bool
    fecha_creacion: datetime

    class Config:
        from_attributes = True
