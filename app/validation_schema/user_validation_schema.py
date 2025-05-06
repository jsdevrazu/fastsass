from pydantic import BaseModel, EmailStr
from typing import Literal, Optional

class LoginSchema(BaseModel):
    email: EmailStr
    password:str

class RoleSchema(BaseModel):
    id: str
    role: Literal['user', 'admin']


class ForgotPasswordSchema(BaseModel):
    email: EmailStr

class ResetPasswordSchema(BaseModel):
    otp: str
    new_password: str

class PaymentSchema(BaseModel):
    email: EmailStr
    price_id: str

class TokenSchema(BaseModel):
    refresh_token: Optional[str] = None


class ChangePasswordSchema(BaseModel):
    current_password: str
    new_password: str
