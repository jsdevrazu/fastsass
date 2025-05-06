from pydantic import BaseModel, EmailStr


class Otp(BaseModel):

    email: EmailStr
    otp: str

    class Config:
        name = 'otps'