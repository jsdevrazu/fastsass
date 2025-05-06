from fastapi import Depends
from app.utils.error_handler import api_error
from app.db.mongo import db
from app.auth.jwt_handler import get_current_user

async def require_active_subscription(user: dict=Depends(get_current_user)):
    sub = db.users.find_one({
        "email": user['email'],
        "is_active": True
    })
    if not sub:
        api_error(403, 'No active subscription')
    if not user['role'] == 'employer':
        api_error(403, 'You are not employer')
    return user