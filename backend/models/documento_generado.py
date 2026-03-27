from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class DocumentoGenerado(Base):
    __tablename__ = "documentos_generados"
    __table_args__ = {"schema": "juridico"}

    id = Column(Integer, primary_key=True)
    plantilla_id = Column(Integer, nullable=False)
    nombre_documento = Column(Text, nullable=False)
    contenido_final = Column(Text, nullable=False)
    estado = Column(Text, nullable=False, default="borrador")
    fecha_creacion = Column(DateTime, nullable=False, default=datetime.utcnow)
