from pydantic import BaseModel
from datetime import datetime


class PlantillaCampoBase(BaseModel):
    plantilla_id: int
    nombre_campo: str
    etiqueta: str
    tipo_dato: str
    obligatorio: bool = True


class PlantillaCampoCreate(PlantillaCampoBase):
    pass


class PlantillaCampoUpdate(BaseModel):
    nombre_campo: str | None = None
    etiqueta: str | None = None
    tipo_dato: str | None = None
    obligatorio: bool | None = None


class PlantillaCampoResponse(PlantillaCampoBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
