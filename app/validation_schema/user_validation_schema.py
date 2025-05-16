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

class SetPasswordSchema(BaseModel):
    password: str


class TeamInviteRequestSchema(BaseModel):
    full_name: str
    team_name: str
    email:EmailStr
    role: Literal['employer_owner', 'hiring_manager', 'recruiter']
    invite_message: Optional[str] = None

class SetPasswordInviteSchema(BaseModel):
    email: EmailStr
    token: str
    password: str

class InterviewSchedule(BaseModel):
    name: str
    time: str
    date: str
    interview_type: str
    notes:str
    id:str
    meet_link: str

class MessageSendSchema(BaseModel):
    subject: str
    type: str
    message: str