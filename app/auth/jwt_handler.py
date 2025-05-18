import jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from datetime import timedelta, datetime, timezone
from app.configs.settings import settings
from fastapi import Request, Depends
from typing import Optional
from app.utils.error_handler import api_error
from jwt.exceptions import PyJWTError
from app.db.mongo import db
from bson import ObjectId

pwd_context = CryptContext(schemes='bcrypt', deprecated = 'auto')
oauth2_schema = OAuth2PasswordBearer(tokenUrl='token')

def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(planpassword:str, hashpassword:str):
    return pwd_context.verify(planpassword, hashpassword)

def create_token(data: dict,expire_date: timedelta | None = None):
    to_encode = data.copy()
    if expire_date:
        expire = datetime.now(timezone.utc) + expire_date
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=1)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, settings.secret_key, settings.algorithm)
    return token

def decoded_token(token:str):
    return jwt.decode(token, settings.secret_key, [settings.algorithm])

def exact_token(req: Request) -> Optional[str]:
    token = None
    if 'Authorization' in req.headers:
        auth = req.headers['Authorization']
        if auth.startswith('Bearer '):
            token = auth.split(" ")[1]
    elif 'authorization' in req.headers:
        auth = req.headers['authorization']
        if auth.startswith('Bearer '):
            token = auth.split(" ")[1]
    elif "access_token" in req.cookies:
        token = req.cookies['access_token']
    return token

async def get_current_user(req: Request):

    token = exact_token(req)

    if not token or token.count('.') != 2:
        api_error(401, "Invalid or missing token")
        
    if not token:
        api_error(401, "Login required pls!")
    try:
        payload = decoded_token(token)
        user_id = payload.get('_id') or payload.get('sub')
        if not user_id:
            api_error(401, 'Invalid Token')
        user = db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            api_error(404, 'User not found')
        
        user['_id'] = str(user['_id'])
        return user
    except PyJWTError as error:
        api_error(403, "Token is invalid or expired")

def require_role(*allowed_roles):
    async def role_checker(user: dict = Depends(get_current_user)):
        if user.get('role') not in allowed_roles:
            api_error(403, 'Permissson denied')
        return user
    return role_checker

def optional_get_current_user(request: Request) -> Optional[dict]:
    try:
        token = request.cookies.get("access_token")
        if not token:
            return None
        decoded = decoded_token(token)
        user = db.users.find_one({"_id": ObjectId(decoded["_id"])})
        if user:
            user["_id"] = str(user["_id"])
            return user
        return None
    except:
        return None
