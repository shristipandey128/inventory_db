from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.database.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)

    customer_id = Column(
        Integer,
        ForeignKey("customers.id")
    )

    total_amount = Column(
        Float,
        default=0
    )

    customer = relationship(
        "Customer"
    )

    items = relationship(
        "OrderItem",
        cascade="all, delete"
    )