from pydantic import BaseModel
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import get_session
from services.plantilla_service import generar_documento
from models.documento_generado import DocumentoGenerado
from schemas.documento_generado import DocumentoGeneradoResponse

router = APIRouter(prefix="/generar", tags=["generar"])


class GenerarDocumentoRequest(BaseModel):
    plantilla_id: int
    nombre_documento: str
    valores: dict[str, str]


@router.post("/", response_model=DocumentoGeneradoResponse, status_code=201)
async def crear_documento_desde_plantilla(
    data: GenerarDocumentoRequest,
    session: AsyncSession = Depends(get_session)
):
    try:
        documento = await generar_documento(
            session=session,
            plantilla_id=data.plantilla_id,
            nombre_documento=data.nombre_documento,
            valores=data.valores
        )
        return documento
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
