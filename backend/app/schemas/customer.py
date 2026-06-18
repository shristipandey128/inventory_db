from pydantic import BaseModel
from pydantic import EmailStr


class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str


class CustomerResponse(CustomerCreate):
    id: int

    class Config:
        from_attributes = True