from pydantic import BaseModel, EmailStr
from typing import Literal, Optional, List
from datetime import datetime
from bson import ObjectId

class Skills(BaseModel):
    id: str
    name: str
    level: str

class Experience(BaseModel):
    id: str
    title: str
    company_name: str
    start_date: str
    end_date: str
    currently_work: bool
    job_description: str

class Certification(BaseModel):
    id: str
    name: str
    org_name: str
    issue_date: str
    expiry_date: str
    url: str

class Education(BaseModel):
    degree_name: str
    start_date: str
    end_date:str
    institution: str

class EmployerFeature(BaseModel):
    max_job_post: int
    current_plan_name: str
    subscription_id: str
    is_active: bool
    stripe_customer_ids: List[str]

class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    role: Literal['job_seeker', 'admin', 'employer'] = 'job_seeker'
    avatar: Optional[str] = ''
    is_verified: Optional[bool] = False
    refresh_token: Optional[str] = ''
    verify_token: Optional[str] = ''
    created_at: Optional[datetime] =  datetime.now()
    updated_at: Optional[datetime] =  datetime.now()
    company_id: ObjectId
    profile_view: Optional[int] = 0
    phone_number: Optional[str] = ''
    location: Optional[str] = ''
    head_line_title: Optional[str] = ''
    summary: Optional[str] = ''
    skills: Optional[List[Skills]] = []
    experience: Optional[List[Experience]] = []
    certifications: Optional[List[Certification]] = [],
    resume: Optional[str] = ''
    website: Optional[str] = ''
    linkedin_profile: Optional[str] = ''
    github_profile: Optional[str] = ''
    auth_provider: Optional[str] = ''
    education: Optional[Education] = None
    feature: Optional[EmployerFeature] = None



    class Config:
        name = 'users'
        arbitrary_types_allowed = True

