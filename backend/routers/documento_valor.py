from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import get_session
from models.documento_valor import DocumentoValor
from schemas.documento_valor import DocumentoValorCreate, DocumentoValorResponse, DocumentoValorUpdate

router = APIRouter(prefix="/valores", tags=["valores"])


@router.get("/", response_model=list[DocumentoValorResponse])
async def get_valores(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(DocumentoValor))
    return result.scalars().all()


@router.get("/{valor_id}", response_model=DocumentoValorResponse)
async def get_valor(valor_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(DocumentoValor).where(DocumentoValor.id == valor_id)
    )
    valor = result.scalar_one_or_none()
    if not valor:
        raise HTTPException(status_code=404, detail="Valor no encontrado")
    return valor


@router.get("/documento/{documento_id}", response_model=list[DocumentoValorResponse])
async def get_valores_por_documento(documento_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(DocumentoValor).where(DocumentoValor.documento_id == documento_id)
    )
    return result.scalars().all()


@router.post("/", response_model=DocumentoValorResponse, status_code=201)
async def create_valor(data: DocumentoValorCreate, session: AsyncSession = Depends(get_session)):
    valor = DocumentoValor(**data.model_dump())
    session.add(valor)
    await session.commit()
    await session.refresh(valor)
    return valor


@router.put("/{valor_id}", response_model=DocumentoValorResponse)
async def update_valor(
    valor_id: int,
    data: DocumentoValorUpdate,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(DocumentoValor).where(DocumentoValor.id == valor_id)
    )
    valor = result.scalar_one_or_none()
    if not valor:
        raise HTTPException(status_code=404, detail="Valor no encontrado")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(valor, key, value)
    
    await session.commit()
    await session.refresh(valor)
    return valor


@router.delete("/{valor_id}", status_code=204)
async def delete_valor(valor_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(DocumentoValor).where(DocumentoValor.id == valor_id)
    )
    valor = result.scalar_one_or_none()
    if not valor:
        raise HTTPException(status_code=404, detail="Valor no encontrado")
    
    await session.delete(valor)
    await session.commit()
