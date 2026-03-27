from sqlalchemy import Column, Integer, Text, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Plantilla(Base):
    __tablename__ = "plantillas"
    __table_args__ = {"schema": "juridico"}

    id = Column(Integer, primary_key=True)
    nombre = Column(Text, nullable=False)
    tipo_documento = Column(Text, nullable=False)
    contenido = Column(Text, nullable=False)
    activo = Column(Boolean, nullable=False, default=True)
    fecha_creacion = Column(DateTime, nullable=False, default=datetime.utcnow)
