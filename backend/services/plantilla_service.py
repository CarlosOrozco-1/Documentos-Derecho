import re
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.plantilla import Plantilla
from models.plantilla_campo import PlantillaCampo
from models.documento_generado import DocumentoGenerado
from models.documento_valor import DocumentoValor


async def renderizar_plantilla(
    session: AsyncSession,
    plantilla_id: int,
    valores: dict[str, str]
) -> str:
    result = await session.execute(
        select(Plantilla).where(Plantilla.id == plantilla_id)
    )
    plantilla = result.scalar_one_or_none()
    
    if not plantilla:
        raise ValueError(f"Plantilla {plantilla_id} no encontrada")
    
    contenido = plantilla.contenido
    
    for campo, valor in valores.items():
        patron = rf"\{{\{{{campo}\}}\}}"
        contenido = re.sub(patron, str(valor), contenido)
    
    return contenido


async def generar_documento(
    session: AsyncSession,
    plantilla_id: int,
    nombre_documento: str,
    valores: dict[str, str]
) -> DocumentoGenerado:
    contenido = await renderizar_plantilla(session, plantilla_id, valores)
    
    documento = DocumentoGenerado(
        plantilla_id=plantilla_id,
        nombre_documento=nombre_documento,
        contenido_final=contenido,
        estado="borrador"
    )
    
    session.add(documento)
    await session.commit()
    await session.refresh(documento)
    
    return documento
