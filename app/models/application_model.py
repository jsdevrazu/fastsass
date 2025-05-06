from pydantic import BaseModel, EmailStr
from typing import Optional, Literal
from bson import ObjectId
from datetime import datetime


class ApplicationModel(BaseModel):

    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    company_name: str
    location: str
    resume:str
    cover_letter: str
    linkedin_profile: Optional[str] = ''
    github_profile: Optional[str] = ''
    portfolio: Optional[str] = ''
    questions_answer: Optional[list] = []
    job_id: ObjectId
    applicate: ObjectId
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = datetime.now(),
    application_status: Literal['Interviewed', 'Reviewed', 'Pending', 'Rejected', "Shortlist"] = 'Pending',
    experience: Optional[str] = None

    class Config:
        name = 'applications'