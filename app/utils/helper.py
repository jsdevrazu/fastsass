from fastapi import Response
from app.auth.jwt_handler import create_token
from datetime import timedelta, datetime

import re

def fetch_token(id: str, role: str):
    access_token = create_token({
            "_id": id,
            "role": role
    })
    refresh_token = create_token({
            "_id": id,
             "role": role
    }, 
        expire_date= timedelta(days=7)
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token
    }

def set_cookie(res: Response, access_token:str, refresh_token: str):
    res.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True
    )
    res.set_cookie(
            key="refresh_token",
            value=refresh_token,
            httponly=True
    )

def slugify(title: str) -> str:
    text = title.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return  text
    

def calculate_match_percentage(job: dict, user: dict) -> int:
    job_skills = set(job.get("skills", []))
    user_skills = set(skill["name"].lower() for skill in user.get("skills", []))

    if not job_skills:
        return 0
    matched = job_skills & user_skills
    return int((len(matched) / len(job_skills)) * 100)


def serialize_notification(notification):
    return {
        "_id": str(notification["_id"]),
        "user_id": str(notification["user_id"]),
        "type": notification["type"],
        "status": notification["status"],
        "title": notification["title"],
        "message": notification["message"],
        "created_at": notification["created_at"].isoformat() if isinstance(notification["created_at"], datetime) else notification["created_at"],
        "updated_at": notification["updated_at"].isoformat() if isinstance(notification["updated_at"], datetime) else notification["updated_at"],
    }
