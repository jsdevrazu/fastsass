from pydantic import BaseModel, EmailStr
from bson import ObjectId
from typing import Literal, Optional
from datetime import datetime, timezone

class TeamInvite(BaseModel):
    full_name: str
    email: EmailStr
    company_id: ObjectId
    role: Literal['employer_owner', 'hiring_manager', 'recruiter']
    invite_message: Optional[str] = ""
    invited_by: ObjectId
    invite_token: str
    status: Literal['pending', 'accepted', 'expired'] = 'pending'
    created_at: datetime = datetime.now(timezone.utc)

    class Config:
        name = 'team_invites'
