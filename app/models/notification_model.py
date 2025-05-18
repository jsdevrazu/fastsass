from pydantic import BaseModel
from bson import ObjectId
from typing import Optional, Literal
from datetime import datetime

class ReletedResource(BaseModel):
    type: str
    id: str

class NotificationModel(BaseModel):

    user_id: ObjectId
    type: Literal['MENTION', 'ASSIGNED', 'RESOURCE_UPDATE'] = 'ASSIGNED'
    status: Literal['READ', 'UNREAD'] = 'UNREAD'
    title: str
    message: str
    relatedResource: ReletedResource
    created_at: Optional[datetime] =  datetime.now()
    updated_at: Optional[datetime] =  datetime.now()

    class Config:
        name = 'notifications'