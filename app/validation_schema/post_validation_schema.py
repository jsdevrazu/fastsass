from pydantic import BaseModel
from typing import Optional, Literal, List
from app.models.user_model import NotificationFeature, PrivacyFeature, PreferencesFeature

class JobSchema(BaseModel):
    title: str
    body: str
    experience_level: str
    min_salary: int
    max_salary: int
    location: str
    job_type: str
    skills: list
    questions: Optional[list] = None
    apply_settings: Literal['email', 'external_link', 'application_form'] 
    application_email: Optional[str] = ''
    application_link: Optional[str] = ''
    status: Literal['active', 'closed'] ='active'

class UpdateJobSchema(BaseModel):
    title: Optional[str] = None
    body: Optional[str] = None
    experience_level: Optional[str] = None
    min_salary: Optional[int] = None
    max_salary: Optional[int] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    skills: Optional[list] = None
    questions: Optional[list] = None
    apply_settings: Literal['email', 'external_link', 'application_form'] = 'application_form'
    application_email: Optional[str] = ''
    application_link: Optional[str] = ''

class ApplicationStatus(BaseModel):
    application_status: Literal['Interviewed', 'Reviewed', 'Pending', 'Rejected', "Shortlist"] = 'Pending'

class ApplicationSchema(BaseModel):
    resume: str
    first_name: str
    last_name: str
    phone_number: str
    email: str
    location: str
    cover_letter: str
    linkedin_profile: str
    github_profile: str
    experience: str
    portfolio: str
    questions_answer: Optional[List] = []


class ReviewsRatinsSchema(BaseModel):
    rating: float
    employe_status: str
    title: str
    review: str
    props: List[str] 
    cons: List[str]
    is_recommend: bool 

class UpdateUserPreferences(BaseModel):
    notification_feature: Optional[NotificationFeature] = None
    privacy_feature: Optional[PrivacyFeature] = None
    prefer_settings: Optional[PreferencesFeature] = None