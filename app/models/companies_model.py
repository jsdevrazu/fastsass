from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class CompanyCalture(BaseModel):
    mission_statement: Optional[str] = ''
    core_value: Optional[str] = ''
    benefit: Optional[str] = ''

class CompanyContact(BaseModel):
    email: Optional[EmailStr] = ''
    phone: Optional[str] = ''


class SocialMedia(BaseModel):
    linkedin: Optional[str] = ''
    twitter: Optional[str] = ''
    facebook: Optional[str] = ''
    instagram:Optional[str] = ''
    contact_email:Optional[str] = ''
    phone_number: Optional[str] = ''

class ReviewsRatins(BaseModel):
    rating: Optional[float] = None
    employe_status: Optional[str] = None
    title: Optional[str] = None
    review: Optional[str] = None
    props: Optional[List[str]] = []
    cons: Optional[List[str]] = []
    is_recommend: Optional[bool] = False
    write_by: str
    date: Optional[datetime] = datetime

class CompaniesModel(BaseModel):

    name: Optional[str] = ''
    logo: Optional[str] = ''
    website: Optional[str] = ''
    industry: Optional[str] = ''
    company_size: Optional[str] = ''
    headquatar_location:Optional[str] = ''
    company_description: Optional[str] = ''
    comapnies_calture: Optional[CompanyCalture] = None
    social_media: Optional[SocialMedia] = None
    rating: Optional[float] = None
    founded: Optional[str] = None
    ratings: Optional[List[ReviewsRatins]] = []
    contact: Optional[CompanyContact] = None



    class Config:
        name = 'companies'