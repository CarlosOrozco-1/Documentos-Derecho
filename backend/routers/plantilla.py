from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database.database import get_session
from models.plantilla import Plantilla
from schemas.plantilla import PlantillaCreate, PlantillaResponse, PlantillaUpdate

router = APIRouter(prefix="/plantillas", tags=["plantillas"])


@router.get("/", response_model=list[PlantillaResponse])
async def get_plantillas(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Plantilla))
    return result.scalars().all()


@router.get("/{plantilla_id}", response_model=PlantillaResponse)
async def get_plantilla(plantilla_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Plantilla).where(Plantilla.id == plantilla_id))
    plantilla = result.scalar_one_or_none()
    if not plantilla:
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")
    return plantilla


@router.post("/", response_model=PlantillaResponse, status_code=201)
async def create_plantilla(data: PlantillaCreate, session: AsyncSession = Depends(get_session)):
    plantilla = Plantilla(**data.model_dump())
    session.add(plantilla)
    await session.commit()
    await session.refresh(plantilla)
    return plantilla


@router.put("/{plantilla_id}", response_model=PlantillaResponse)
async def update_plantilla(
    plantilla_id: int,
    data: PlantillaUpdate,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Plantilla).where(Plantilla.id == plantilla_id))
    plantilla = result.scalar_one_or_none()
    if not plantilla:
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")
    
    for key, value in data.model_dump(exclude_unset=True).items():
        setattr(plantilla, key, value)
    
    await session.commit()
    await session.refresh(plantilla)
    return plantilla


@router.delete("/{plantilla_id}", status_code=204)
async def delete_plantilla(plantilla_id: int, session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Plantilla).where(Plantilla.id == plantilla_id))
    plantilla = result.scalar_one_or_none()
    if not plantilla:
        raise HTTPException(status_code=404, detail="Plantilla no encontrada")
    
    await session.delete(plantilla)
    await session.commit()
