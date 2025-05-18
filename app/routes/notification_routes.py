from fastapi import APIRouter, Depends
from app.utils.error_handler import api_error
from app.auth.jwt_handler import require_role, get_current_user
from app.db.mongo import db
from bson.objectid import ObjectId
from app.validation_schema.post_validation_schema import UpdateUserPreferences



router = APIRouter()

@router.put("/update")
def update_notification(
    body: UpdateUserPreferences,
    user=Depends(get_current_user)
):

    update_fields = {}

    if user.get('role') == 'job_seeker':

        if body.notification_feature is not None:
            update_fields["notification_feature"] = body.notification_feature.model_dump()

        if body.privacy_feature is not None:
            update_fields["privacy_feature"] = body.privacy_feature.model_dump()

        if body.prefer_settings is not None:
            update_fields["prefer_settings"] = body.prefer_settings.model_dump()

    if user.get('role') == 'employer':
        if body.employer_notification is not None:
            update_fields["employer_notification"] = body.employer_notification.model_dump()

    if not update_fields:
        api_error(400, "No fields to update.")

    result = db.users.update_one(
        {"_id": ObjectId(user["_id"])},
        {"$set": update_fields}
    )

    if result.modified_count == 0:
        api_error(404, "User not found or nothing updated.")

    return {
        "message": "Preferences updated successfully.",
        "updated_fields": update_fields
    }

@router.get("/")
def get_all_notifications(user=Depends(get_current_user)):

    pipeline = [
        {
            "$match": {
                "user_id": ObjectId(user.get("_id", ""))
            }
        },
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$project": {
                "_id": {"$toString": "$_id"},
                "firstname": "$user.firstname",
                "lastname": "$user.lastname",
                "type": 1,
                "status": 1,
                "title":1,
                "message":1,
                "created_at": 1
            }
        }
    ]

    notifications = list(db.notifications.aggregate(pipeline))

    return {
        "message": "success",
        "notifications": notifications
    }

@router.post("/read/{id}")
def update_notification_status(id:str, user=Depends(get_current_user)):

    notification = db.notifications.find_one_and_delete(
            {"_id": ObjectId(id), "user_id": ObjectId(user['_id'])}
    )

    if not notification:
        api_error(404, 'Notification not found')

    
    return {
        "message": "Update Success"
    }


@router.post("/mark-all")
def update_notification_status(user=Depends(get_current_user)):

    result =  db.notifications.delete_many(
        {"user_id": ObjectId(user["_id"]), "status": "UNREAD"},
    )
    return {
        "message": "All notifications marked as read",
        "modified_count": result.modified_count
    }

