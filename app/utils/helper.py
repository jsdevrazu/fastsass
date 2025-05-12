from fastapi import Response
from app.auth.jwt_handler import create_token
from datetime import timedelta
import re

def fetch_token(full_name: str, email: str):
    access_token = create_token({
            "full_name": full_name,
            "email": email.lower(),
    })
    refresh_token = create_token({
            "full_name": full_name,
            "email": email.lower(),
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