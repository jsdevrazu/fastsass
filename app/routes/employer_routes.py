from fastapi import APIRouter, Depends
from app.utils.error_handler import api_error
from app.auth.jwt_handler import require_role, get_current_user, hash_password
from app.db.mongo import db
from bson.objectid import ObjectId
from app.validation_schema.user_validation_schema import TeamInviteRequestSchema, SetPasswordInviteSchema, InterviewSchedule, MessageSendSchema
from uuid import uuid4
from datetime import datetime, timezone
from app.configs.settings import settings
from app.utils.send_email import send_email, send_email_with_subject
from bson import ObjectId

router = APIRouter()

@router.post("/invite")
def invite_team_member(
    body: TeamInviteRequestSchema,
    user=Depends(require_role("employer"))
):
    if user.get("role") != 'employer':
        api_error(403, "Permission denied.")

    existing_invite = db.team_invites.find_one({"email": body.email, "status": "pending"})
    if existing_invite:
        api_error(400, "User already invited.")

    existing_user = db.users.find_one({"email": body.email })
    if existing_user:
        api_error(400, "User already exist another role.")

    invite_token = str(uuid4())

    invite_data = {
        "full_name": body.full_name,
        "email": body.email,
        "role": body.role,
        "company_id": ObjectId(user["company_id"]),
        "invited_by": ObjectId(user["_id"]),
        "invite_message": body.invite_message,
        "invite_token": invite_token,
        "status": "pending",
        "created_at": datetime.now(timezone.utc)
    }

    db.team_invites.insert_one(invite_data)

    invite_url = f"{settings.client_url}/set-password?token={invite_token}&email={body.email}"
    send_email(body.full_name, body.email, 6, {"INVITEE_NAME": body.full_name, "INVITE_LINK":  invite_url, "SENDER_NAME": f"{user.get("first_name")} {user.get("last_name")}", "TEAM_NAME": body.team_name, "APP_NAME": "FastSass"})

    return {"message": "Invitation sent successfully."}

@router.post("/set-password")
def set_password_from_invite(body: SetPasswordInviteSchema):
    invite = db.team_invites.find_one({
        "email": body.email,
        "invite_token": body.token,
        "status": "pending"
    })

    if not invite:
        api_error(400, "Invalid or expired invitation.")

    hashed_pw = hash_password(body.password)

    new_user = {
        "first_name": invite["full_name"].split()[0],
        "last_name": " ".join(invite["full_name"].split()[1:]),
        "email": invite["email"],
        "role": "employer",
        "employer_role": invite["role"],
        "company_id": invite["company_id"],
        "is_verified": True,
        "password": hashed_pw,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }

    db.users.insert_one(new_user)
    db.team_invites.update_one({"_id": invite["_id"]}, {"$set": {"status": "accepted"}})

    return {"message": "Password set and account created. Please log in."}


@router.get("/invites")
def get_team_invites(user=Depends(require_role("employer"))):
    company_id = user.get("company_id")
    invites = list(db.team_invites.find({"company_id": ObjectId(company_id)}))
    total = db.team_invites.count_documents({"company_id": ObjectId(company_id)})

    return {
        "users": [
            {
                "id": str(inv["_id"]),
                "full_name": inv["full_name"],
                "email": inv["email"],
                "role": inv["role"],
                "status": inv["status"],
                "created_at": inv["created_at"],
                "invite_message": inv.get("invite_message", ""),
            }
            for inv in invites
        ],
    "total": total
    }

@router.delete("/invite/{invite_id}")
def delete_invite(invite_id: str, user=Depends(require_role("employer"))):
    invite = db.team_invites.find_one({"_id": ObjectId(invite_id)})
    if not invite:
        api_error(404, "Invite not found.")
    if invite["company_id"] != ObjectId(user["company_id"]):
        api_error(403, "Unauthorized.")

    db.team_invites.delete_one({"_id": ObjectId(invite_id)})
    return {"message": "Invite deleted successfully."}

@router.post('/interview-invite/{user_id}')
def interview_invite(user_id:str, body:InterviewSchedule, user=Depends(require_role('employer'))):

    user = db.users.find_one({ "_id": ObjectId(user_id) })
    if not user:
        api_error(404, "User not found")
    
    db.applications.find_one_and_update(
        {"applicate": ObjectId(user_id)},
        {"$set": {"application_status": "Interviewed"}}
    )
    send_email(body.name, user.get('email'), 7, {"name": body.name, "date": body.date, "time": body.time, "notes": body.notes, "interview_type": body.interview_type, "meet_link": body.meet_link})

    return {
        "message":"Invite Send Successfully"
    }


@router.post('/interview-invite/{user_id}')
def interview_invite(user_id:str, body:InterviewSchedule, user=Depends(require_role('employer'))):

    user = db.users.find_one({ "_id": ObjectId(user_id) })
    if not user:
        api_error(404, "User not found")
    
    db.applications.find_one_and_update(
        {"applicate": ObjectId(user_id)},
        {"$set": {"application_status": "Interviewed"}}
    )
    send_email(body.name, user.get('email'), 7, {"name": body.name, "date": body.date, "time": body.time, "notes": body.notes, "interview_type": body.interview_type, "meet_link": body.meet_link})

    return {
        "message":"Invite Send Successfully"
    }

@router.post('/message/{user_id}')
def message_send(user_id:str, body:MessageSendSchema, user=Depends(require_role('employer'))):

    user = db.users.find_one({ "_id": ObjectId(user_id) })
    if not user:
        api_error(404, "User not found")
    
    if body.type == 'Rejected':
        db.applications.find_one_and_update(
            {"applicate": ObjectId(user_id)},
            {"$set": {"application_status": "Rejected"}}
    )
    send_email_with_subject(f"{user.get("first_name")} {user.get("last_name")}", body.subject, user.get('email'), 8, {"name": f"{user.get("first_name")} {user.get("last_name")}", "subject": body.subject, "message": body.message})

    return {
        "message":"Message Send Successfully"
    }