from sqlalchemy import column, Integer, Text, Boolean, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Plantilla(Base):
    __tablename__ = "plantilla_campos"
    __table_args__ = {"schema": "juridico"}

    id = Column(Integer, primary_key=True)
    plantilla_id = Column(Integer, nullable=False)
    nombre_campo = Column(Text, nullable=False)
    etiqueta = Column(Text, nullable=False)
    tipo_dato = Column(Text, nullable=False)
    obligatorio = Column(Boolean, nullable=False, default=True)
    fecha_creacion = Column(DateTime, nullable=False, default=datetime.utcnow)