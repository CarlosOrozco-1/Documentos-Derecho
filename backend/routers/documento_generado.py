from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import get_session
from models.documento_generado import DocumentoGenerado
from schemas.documento_generado import DocumentoGeneradoCreate, DocumentoGeneradoResponse, DocumentoGeneradoUpdate

router = APIRouter(prefix="/documentos", tags=["documentos"])


@router.get("/", response_model=list[DocumentoGeneradoResponse])
async def get_documentos(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(DocumentoGenerado))
    return result.scalars().all()


@router.get("/{documento_id}", response_model=DocumentoGeneradoResponse)
async def get_documento(documento_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(DocumentoGenerado).where(DocumentoGenerado.id == documento_id)
    )
    documento = result.scalar_one_or_none()
    if not documento:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    return documento


@router.post("/", response_model=DocumentoGeneradoResponse, status_code=201)
async def create_documento(data: DocumentoGeneradoCreate, session: AsyncSession = Depends(get_session)):
    documento = DocumentoGenerado(**data.model_dump())
    session.add(documento)
    await session.commit()
    await session.refresh(documento)
    return documento


@router.put("/{documento_id}", response_model=DocumentoGeneradoResponse)
async def update_documento(
    documento_id: int,
    data: DocumentoGeneradoUpdate,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(DocumentoGenerado).where(DocumentoGenerado.id == documento_id)
    )
    documento = result.scalar_one_or_none()
    if not documento:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(documento, key, value)
    
    await session.commit()
    await session.refresh(documento)
    return documento


@router.delete("/{documento_id}", status_code=204)
async def delete_documento(documento_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(DocumentoGenerado).where(DocumentoGenerado.id == documento_id)
    )
    documento = result.scalar_one_or_none()
    if not documento:
        raise HTTPException(status_code=404, detail="Documento no encontrado")
    
    await session.delete(documento)
    await session.commit()
