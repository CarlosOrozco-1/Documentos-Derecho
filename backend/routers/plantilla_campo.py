from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import get_session
from models.plantilla_campo import PlantillaCampo
from schemas.plantilla_campo import PlantillaCampoCreate, PlantillaCampoResponse, PlantillaCampoUpdate

router = APIRouter(prefix="/campos", tags=["campos"])


@router.get("/", response_model=list[PlantillaCampoResponse])
async def get_campos(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(PlantillaCampo))
    return result.scalars().all()


@router.get("/{campo_id}", response_model=PlantillaCampoResponse)
async def get_campo(campo_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(PlantillaCampo).where(PlantillaCampo.id == campo_id))
    campo = result.scalar_one_or_none()
    if not campo:
        raise HTTPException(status_code=404, detail="Campo no encontrado")
    return campo


@router.get("/plantilla/{plantilla_id}", response_model=list[PlantillaCampoResponse])
async def get_campos_por_plantilla(plantilla_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(
        select(PlantillaCampo).where(PlantillaCampo.plantilla_id == plantilla_id)
    )
    return result.scalars().all()


@router.post("/", response_model=PlantillaCampoResponse, status_code=201)
async def create_campo(data: PlantillaCampoCreate, session: AsyncSession = Depends(get_session)):
    campo = PlantillaCampo(**data.model_dump())
    session.add(campo)
    await session.commit()
    await session.refresh(campo)
    return campo


@router.put("/{campo_id}", response_model=PlantillaCampoResponse)
async def update_campo(
    campo_id: int,
    data: PlantillaCampoUpdate,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(PlantillaCampo).where(PlantillaCampo.id == campo_id))
    campo = result.scalar_one_or_none()
    if not campo:
        raise HTTPException(status_code=404, detail="Campo no encontrado")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(campo, key, value)
    
    await session.commit()
    await session.refresh(campo)
    return campo


@router.delete("/{campo_id}", status_code=204)
async def delete_campo(campo_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(PlantillaCampo).where(PlantillaCampo.id == campo_id))
    campo = result.scalar_one_or_none()
    if not campo:
        raise HTTPException(status_code=404, detail="Campo no encontrado")
    
    await session.delete(campo)
    await session.commit()
