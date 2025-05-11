from fastapi import APIRouter, Depends
from app.utils.error_handler import api_error
from app.auth.jwt_handler import require_role
from app.db.mongo import db
from bson.objectid import ObjectId
from app.validation_schema.post_validation_schema import UpdateUserPreferences



router = APIRouter()

@router.put("/update")
def update_notification(
    body: UpdateUserPreferences,
    user=Depends(require_role('job_seeker'))
):

    update_fields = {}

    if body.notification_feature is not None:
        update_fields["notification_feature"] = body.notification_feature.model_dump()

    if body.privacy_feature is not None:
        update_fields["privacy_feature"] = body.privacy_feature.model_dump()

    if body.prefer_settings is not None:
        update_fields["prefer_settings"] = body.prefer_settings.model_dump()

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