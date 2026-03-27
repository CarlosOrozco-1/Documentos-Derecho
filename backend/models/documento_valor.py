from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class DocumentoValor(Base):
    __tablename__ = "documento_valores"
    __table_args__ = {"schema": "juridico"}

    id = Column(Integer, primary_key=True)
    documento_id = Column(Integer, nullable=False)
    campo_plantilla_id = Column(Integer, nullable=False)
    valor = Column(Text, nullable=False)
    fecha_creacion = Column(DateTime, nullable=False, default=datetime.utcnow)
