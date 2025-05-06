from pydantic import BaseModel
from typing import Optional, Literal, List

class JobSchema(BaseModel):
    title: str
    meta_description: str
    body: str
    min_salary: int
    max_salary: int
    location: str
    job_type: str
    skills: list
    questions: Optional[list] = None
    apply_settings: Literal['email', 'external_link', 'application_form'] 
    application_email: Optional[str] = ''
    application_link: Optional[str] = ''
    status: Literal['active', 'closed'] ='acive'

class UpdateJobSchema(BaseModel):
    title: Optional[str] = None
    meta_description: Optional[str] = None
    body: Optional[str] = None
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