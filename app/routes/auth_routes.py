from fastapi import APIRouter, File, UploadFile, Response, Request, Form, Depends
from app.validation_schema.user_validation_schema import LoginSchema, ForgotPasswordSchema, ResetPasswordSchema, TokenSchema, ChangePasswordSchema, SetPasswordSchema
from app.constant.index import UPLOAD_DIR, UPLOAD_RESUME_DIR, UPLOAD_LOGO_DIR
from pydantic import ValidationError, EmailStr
from typing import Literal
from app.db.mongo import db
from app.auth.jwt_handler import hash_password, verify_password, decoded_token, get_current_user, require_role
from app.utils.helper import set_cookie, fetch_token
from bson.objectid import ObjectId
from sib_api_v3_sdk.rest import ApiException
from app.utils.error_handler import api_error
from app.configs.settings import settings
import random
from datetime import datetime, timezone, timedelta
from authlib.integrations.starlette_client import OAuth
from starlette.responses import RedirectResponse
from app.utils.send_email import send_email
from typing import Optional
import json
from app.models.user_model import Skills, Certification, Experience, Education
from app.models.companies_model import SocialMedia, CompanyCalture
import os

router = APIRouter()



oauth = OAuth()

oauth.register(
    name='google',
    client_id=settings.google_client_id,
    client_secret=settings.google_client_secret,
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile'
    }
)

oauth.register(
    name='github',
    client_id=settings.github_client_id,
    client_secret=settings.github_client_secret,
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'read:user user:email'},
)

@router.get("/login/google")
async def login_via_google(request: Request,  role: str = "job_seeker"):
    redirect_uri = request.url_for('google_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri, state=role)

@router.get("/login/github")
async def github_login(request: Request,  role: str = "job_seeker"):
    redirect_uri = request.url_for("github_callback")
    return await oauth.github.authorize_redirect(request, redirect_uri, state=role)

@router.get("/auth/google/callback")
async def google_callback(request: Request):
    token = await oauth.google.authorize_access_token(request)
    role = request.query_params.get("state")  
    
    try:
        user_info = await oauth.google.parse_id_token(request, token)
    except Exception:
        user_info = token.get("userinfo")

    email = user_info.get("email")
    name = user_info.get("name")
    picture = user_info.get("picture")

    existing_user = db.users.find_one({"email": email})
    token = fetch_token(name, email)
    company_id = None
    if "employer" in role:
           company = db.companies.insert_one({
                "name": name
            })
           company_id = company.inserted_id
    if not existing_user:
        user = {
            "email": email,
            "first_name": name,
            "avatar": picture,
            "is_verified": True,
            "auth_provider": "google",
            "refresh_token": token['refresh_token'],
            "role": role,
            "company_id": company_id
        }

        db.users.insert_one(user)

    response = RedirectResponse(url=f"{settings.client_url}/api/auth/callback?token={token['access_token']}")
    return response


@router.get("/auth/github/callback")
async def github_callback(request: Request):
    token = await oauth.github.authorize_access_token(request)
    role = request.query_params.get("state")  
    user_info = await oauth.github.get("user", token=token)
    user_data = user_info.json()

    email = user_data.get("email")
    username = user_data.get("login")
    avatar_url = user_data.get("avatar_url")

    existing_user = db.users.find_one({"email": f"{username}@github.com"})
    company_id = None
    if "employer" in role:
           company = db.companies.insert_one({
                "name": username
            })
           company_id = company.inserted_id

    token_data = fetch_token(username, email or f"{username}@github.com")
    if not existing_user:
        new_user = {
            "first_name": username,
            "email": f"{username}@github.com",
            "avatar": avatar_url,
            "auth_provider": "github",
            "is_verified": True,
            "refresh_token": token_data['refresh_token'],
            "role": role,
            "company_id": company_id
        }
        db.users.insert_one(new_user)

    return RedirectResponse(f"{settings.client_url}/api/auth/callback?token={token_data['access_token']}")

@router.post("/register")
async def register(
    last_name: str = Form(...),
    first_name: str = Form(...),
    company_name: str = Form(...),
    password: str = Form(...),
    email: EmailStr = Form(...),
    avatar: UploadFile = File(...),
    role: Literal['job_seeker', 'employer'] = Form(...),
):
    modi_email = email.lower()
    full_name = f"{first_name} {last_name}"
    try:
        db_user = db.users.find_one({"email": modi_email})
        if db_user:
            api_error(400, "Email already exits")
        
        file_location = f"{UPLOAD_DIR}/{avatar.filename}"
        with open(file_location, "wb") as f:
            content = await avatar.read()
            f.write(content)

        h_password = hash_password(password)
        token = fetch_token(full_name, modi_email)
        access_token = token['access_token']
        refresh_token = token['refresh_token']
        
        company_id = None
        if "employer" in role:
           company = db.companies.insert_one({
                "name": company_name
            })
           company_id = company.inserted_id
        
        payload = {
            "first_name": first_name,
            "last_name": last_name,
            "email": modi_email,
            "password": h_password,
            "avatar": f"{file_location}",
            "role": role,
            "is_verified": False,
            "verify_token": token['access_token'],
            "refresh_token": refresh_token,
            "company_id": company_id,
            "auth_provider": "email"
        }

        db.users.insert_one(payload)

        verify_link = f"http://localhost:8000/api/v1/auth/verify-email?token={access_token}"
        send_email(full_name, modi_email, 2, {"name": full_name, "verify_link": verify_link})
        
        return {
            'message': "Signup successful. Please verify your email",
        }
    except ValidationError as error:
        api_error(400, detail="All field is require!")
    except ApiException as error:
        api_error(500, f"Email Connection Configs Error {str(error)}")
    

@router.get('/verify-email')
async def verify_email(token: str):
    try:
        payload = decoded_token(token)
        email = payload.get("email")
        user =  db.users.find_one({"email": email})
        if not user:
            api_error(404, "User not found")
        if user.get("is_verified"):
            return {"msg": "Already verified"}

        db.users.update_one(
            {"email": email},
            {"$set": {"is_verified": True}, "$unset": {"verify_token": ""}}
        )
        response = RedirectResponse(url=f"{settings.client_url}/login")
        return response

    except Exception as error:
        api_error(400, f"{error}")

@router.post("/login")
async def login(res: Response, body:LoginSchema):
    try:
        db_user = db.users.find_one({'email': body.email})
        if not db_user:
            api_error(400, "User doesn't exit")

        if not db_user.get('password'):
            api_error(400, f'You are login {db_user['auth_provider']} please set password then you use login via password and email')
        
        match_password = verify_password(body.password, db_user['password'])
        if not match_password:
            api_error(400, 'Invalid Password')

        if not db_user['is_verified']:
            api_error(400, "Please Verify Email First!")
        

        db_user['_id'] = str(db_user['_id'])
        if db_user['role'] == 'employer':
            db_user['company_id'] = str(db_user['company_id'])
        
        full_name = f"{db_user.get('first_name', '')} {db_user.get('last_name', '')}"
        token = fetch_token(full_name, db_user['email'])
        access_token = token['access_token']
        refresh_token = token['refresh_token']

        db.users.update_one(
            {"_id": ObjectId(db_user['_id'])},
            {"$set": {"refresh_token": refresh_token}}
        )

        
        set_cookie(res, access_token, refresh_token)
        return {
            'message': "Login Successfully",
            "user": {
                **db_user,
                "refresh_token": refresh_token
            },
            "access_token": access_token,
            "refresh_token": refresh_token
        }
        
    except ValidationError as error:
        api_error(400, detail="All field is require!")

@router.get("/logout")
def logout(res: Response):
    res.delete_cookie(key='access_token')
    res.delete_cookie(key='refresh_token')
    return {
        "message": "Logout Success"
    }


@router.post("/forgot-password")
def forgot_password(body:ForgotPasswordSchema):
    try:
        db_user =  db.users.find_one({"email": body.email})
        if not db_user:
            api_error(404, "User not found")
        now = datetime.now(timezone.utc)

        full_name = f"{db_user['first_name']} {db_user['last_name']}"

        recent_otp = db.otps.find_one({
            "email": body.email,
            "created_at": {"$gt": now - timedelta(hours=1)}
        })

        if recent_otp:
            api_error(429, "OTP already sent recently. Please try again after 1 hour.")

        otp = str(random.randint(1000, 9999))
        

        db.otps.insert_one({
            "email": body.email,
            "otp": otp,
            "created_at": now,
            "updated_at": now,
            "expired_at": now + timedelta(minutes=10)
        })

        send_email(full_name, body.email, 3, {"name": full_name, "otp": otp})
    
        return {
            "message":"Otp Sent Successfully in your email"
        }
    except ValidationError as error:
        api_error(400, detail="All field is require!")
    except ApiException as error:
        api_error(500, f"Email Connection Configs Error {str(error)}")


@router.post("/reset-password")
def reset_password(body: ResetPasswordSchema):
    now = datetime.now(timezone.utc)

    try:
        otp = db.otps.find_one({
            "otp": body.otp,
            "expired_at": {"$gt": now}
        })
        if not otp:
            api_error(404, "Invalid Otp or Expired")
        h_password = hash_password(body.new_password)
        db.users.update_one(
            {
            "email": otp['email'],
            },
            {
             "$set": {"password": h_password}
            }
        )

        db.otps.delete_one({"_id": otp['_id']})
        return {
            "message": "Password Changed"
        }
    except ValidationError as error:
        api_error(400, detail="All field is require!")


@router.post('/refresh')
def refresh_token(req: Request, res: Response,  body: TokenSchema):
    
    body_token = req.cookies.get("refresh_token") or body.refresh_token
    if not body_token:
        api_error(401, "Refresh token error")
    decode_token = decoded_token(body_token)
    user = db.users.find_one({"email": decode_token['email']})
    if not user:
        api_error(404, 'User not found')

    if body_token != user['refresh_token']:
        api_error(400, "Refresh token not match")

    full_name = f"{user['first_name']} {user['last_name']}"
    token = fetch_token(full_name, user['email'])
    access_token = token['access_token']
    refresh_token = token['refresh_token']

    db.users.update_one(
        {"email": user['email']},
        {"$set": {"refresh_token": refresh_token}}
    )

    set_cookie(res, access_token, refresh_token)

    if user['role'] == 'employer':
            user['company_id'] = str(user['company_id'])

    user['_id'] = str(user['_id'])
    
    return {
            'message': "Access token convert refresh token Successfully",
            "user": {
                **user,
                "refresh_token": refresh_token
            },
            "access_token": access_token,
            "refresh_token": refresh_token
        }
    
@router.get("/me")
def get_current_user_profile(user=Depends(get_current_user)):
    pipeline = [
        {"$match": {
            "_id": ObjectId(user['_id'])
        }},
        {
            "$lookup":{
                "from": "companies",
                "localField":"company_id",
                "foreignField": "_id",
                "as": "comapny"
            }
        },
        {"$unwind": {"path": "$comapny", "preserveNullAndEmptyArrays": True}}, 
        {
                "$project": {
                    "_id": {"$toString": "$_id"}, 
                    "avatar": 1,
                    "email": 1,
                    "first_name": 1,
                    "is_verified": 1,
                    "last_name": 1,
                    "refresh_token": 1,
                    "role": 1,
                    "created_at": 1,
                    "updated_at": 1,
                    "profile_view": 1,
                    "phone_number": 1,
                    "location": 1,
                    "resume": 1,
                    "head_line_title": 1,
                    "summary": 1,
                    "skills": 1,
                    "experience": 1,
                    "website": 1,
                    "feature": 1,
                    "auth_provider": 1,
                    "education": 1,
                    "github_profile": 1,
                    "notification_feature": 1,
                    "prefer_settings": 1,
                    "privacy_feature": 1,
                    "linkedin_profile": 1,
                    "certifications": 1,
                    "comapny._id": {"$toString": "$comapny._id"},
                    "comapny.name": 1,
                    "comapny.logo": 1,
                    "comapny.website": 1,
                    "comapny.comapnies_calture": 1,
                    "comapny.company_description": 1,
                    "comapny.company_size": 1,
                    "comapny.headquatar_location": 1,
                    "comapny.industry": 1,
                    "comapny.website": 1,
                    "comapny.social_media": 1,
                }
            }
    ]

    user = list(db.users.aggregate(pipeline))

    if len(user) == 0:
        api_error(400, "User not found")

    
    return {
        "message": "success",
        "user": user[0]
    }


@router.post("/set-password")
def set_new_password(body:SetPasswordSchema, user=Depends(get_current_user)):

    h_password = hash_password(body.password)
    db.users.update_one(
        {"_id": ObjectId(user['_id'])},
        {"$set": {"password": h_password}}
    )

    return {
        "message": "Password Change Successfully"
    }


@router.patch('/me')
async def update_current_user_profile(
    last_name: Optional[str] = Form(None),
    first_name: Optional[str] = Form(None),
    phone_number: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    head_line_title: Optional[str] = Form(None),
    website: Optional[str] = Form(None),
    linkedin_profile: Optional[str] = Form(None),
    github_profile: Optional[str] = Form(None),
    summary: Optional[str] = Form(None),
    experience: Optional[str] = Form(None),
    certifications: Optional[str] = Form(None),
    education: Optional[str] = Form(None),
    skills: Optional[str] = Form(None),
    email: Optional[EmailStr] = Form(None),
    avatar: Optional[UploadFile] = File(None),
    resume: Optional[UploadFile] = File(None),
    user=Depends(get_current_user)
):


    try:
        payload = {}

        for field_name, value in {
            "first_name": first_name,
            "last_name": last_name,
            "phone_number": phone_number,
            "location": location,
            "head_line_title": head_line_title,
            "website": website,
            "linkedin_profile": linkedin_profile,
            "github_profile": github_profile,
            "summary": summary,
            "email": email
        }.items():
            if value is not None:
                payload[field_name] = value

        if skills:
            parsed_skills = [Skills(**s) for s in json.loads(skills)]
            payload["skills"] = [s.model_dump() for s in parsed_skills]

        if experience:
            parsed_experience = [Experience(**e) for e in json.loads(experience)]
            payload["experience"] = [e.model_dump() for e in parsed_experience]

        if certifications:
            parsed_certifications = [Certification(**c) for c in json.loads(certifications)]
            payload["certifications"] = [c.model_dump() for c in parsed_certifications]

        if education:
            edu_data = json.loads(education)
            parsed_education = Education(**edu_data)
            payload["education"] = parsed_education.model_dump()

        if avatar:
            if user.get("avatar"):
                    if os.path.exists(user["avatar"]):
                        os.remove(user["avatar"])

            file_location_avatar = f"{UPLOAD_DIR}/{avatar.filename}"
            with open(file_location_avatar, "wb") as f:
                content = await avatar.read()
                f.write(content)
            payload['avatar'] = file_location_avatar

        if resume:
            if user.get("resume"):
                    if os.path.exists(user["resume"]):
                        os.remove(user["resume"])
                      
            file_location_resume = f"{UPLOAD_RESUME_DIR}/{resume.filename}"
            with open(file_location_resume, "wb") as f:
                content = await resume.read()
                f.write(content)
            payload['resume'] = file_location_resume
        
        if not payload:
            return {"message": "No data provided for update"}
        
        db.users.update_one(
            {"_id": ObjectId(user['_id'])},
            {"$set": payload}
        )

        return {
            "message": "Profile updated successfully"
        }

    except Exception as e:
        api_error(400, f"Invalid data: {e}")
    

@router.delete("/me")
async def delete_current_user_account(user=Depends(get_current_user)):
    user = db.users.find_one_and_delete({"_id": ObjectId(user['_id'])})

    if not user:
        api_error(404, 'User not found')

    return {
        "message": "User delete successfully"
    }


@router.post('/change-password')
def change_password(
    body: ChangePasswordSchema,
    user=Depends(get_current_user)
):
    user = db.users.find_one({"_id": ObjectId(user['_id'])})
    if not user:
        api_error(404, "User not found")
    
    password = verify_password(body.current_password, user['password'])
    if not password:
        api_error(400, "Invalid Current Password")
    
    hash_pass = hash_password(body.new_password)

    db.users.update_one(
        {"_id": ObjectId(user['_id'])},
        {"$set": {"password": hash_pass}}
    )

    return {
        "message": "Password Changed Successfully"
    }

@router.post('/company-profile')
async def update_company_profile(
    name: Optional[str] = Form(None),
    logo: Optional[UploadFile] = File(None),
    website: Optional[str] = Form(None),
    industry: Optional[str] = Form(None),
    company_size: Optional[str] = Form(None),
    headquatar_location: Optional[str] = Form(None),
    company_description: Optional[str] = Form(None),
    comapnies_calture: Optional[str] = Form(None),
    social_media: Optional[str] = Form(None),
    user=Depends(require_role('employer'))
):
    company = db.companies.find_one({"_id": ObjectId(user['company_id'])})
    if not company:
        api_error(400, 'Company Profile not Created')

    payload = {
        "name": name,
        "website": website,
        "industry": industry,
        "company_size": company_size,
        "headquatar_location": headquatar_location,
        "company_description": company_description
    }
     
    if comapnies_calture:
            cal_data = json.loads(comapnies_calture)
            parsed_calture = CompanyCalture(**cal_data)
            payload["comapnies_calture"] = parsed_calture.model_dump()

    if social_media:
            social_data = json.loads(social_media)
            parsed_social = SocialMedia(**social_data)
            payload["social_media"] = parsed_social.model_dump()

    if logo:
            if company.get("logo"):
                    if os.path.exists(company["logo"]):
                        os.remove(company["logo"])

            file_location_avatar = f"{UPLOAD_LOGO_DIR}/{logo.filename}"
            with open(file_location_avatar, "wb") as f:
                content = await logo.read()
                f.write(content)
            payload['logo'] = file_location_avatar


    db.companies.update_one(
        {"_id": ObjectId(user['company_id'])},
        {"$set": payload}
    )

    return {
        "message": "Company Profile Update Success",
    }