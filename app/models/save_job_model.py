from pydantic import BaseModel
from bson import ObjectId
from datetime import datetime

class SaveJobModel(BaseModel):

    job_id: ObjectId
    user_id: ObjectId
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

    class Config:
        name = 'save_jobs'