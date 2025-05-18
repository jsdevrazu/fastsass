from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime
from bson import ObjectId


class JobModel(BaseModel):

    title: str
    body: str
    min_salary: int
    max_salary: int
    experience_level: str
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = datetime.now()
    application_dead_line: Optional[datetime] = None
    post_by: ObjectId
    slug: Optional[str]
    location: str
    job_type: str
    skills: Optional[list] = None
    questions: Optional[list] = None
    apply_settings: Literal['email', 'external_link', 'application_form'] = 'application_form'
    job_status: Literal['open', 'complete', 'closed'] = 'open'
    job_view: Optional[int] = 0
    application_email: Optional[str] = ''
    application_link: Optional[str] = ''
    company_name: ObjectId

    class Config:
        name = 'jobs'