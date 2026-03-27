from pydantic import BaseModel
from datetime import datetime


class DocumentoValorBase(BaseModel):
    documento_id: int
    campo_plantilla_id: int
    valor: str


class DocumentoValorCreate(DocumentoValorBase):
    pass


class DocumentoValorUpdate(BaseModel):
    valor: str | None = None


class DocumentoValorResponse(DocumentoValorBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
