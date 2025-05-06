from fastapi import APIRouter, Depends, Query
from app.utils.error_handler import api_error
from app.auth.jwt_handler import require_role
from app.db.mongo import db
from pymongo.errors import PyMongoError
from app.validation_schema.user_validation_schema import RoleSchema
from bson.objectid import ObjectId



router = APIRouter()


@router.get("/all-users")
def get_dashboard_stats(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role('admin'))
):
    try:
        skip = (page - 1) * limit
        cursor = db.users.find().skip(skip).limit(limit)
        users = []
        for user in cursor:
            user['_id'] = str(user['_id'])
            del user['password']
            users.append(user)

        total = db.users.count_documents({})

        return {
            "message": "success",
            "total": total,
            "page": page,
            "limit": limit,
            "users": users
        }
    except PyMongoError as error:
        api_error(500, str(error))

@router.post('/update-role')
def mange_role(
    body: RoleSchema,
    user=Depends(require_role('admin'))
):
    try:
        db_user = db.users.find_one({"_id": ObjectId(body.id)})
        if not db_user:
            api_error(404, "User not found")
        
        db.users.update_one(
            {"_id": ObjectId(body.id)},
            {"$set": {"role": body.role}}
        )
        return {
            "message":"User role update success"
        }
    except PyMongoError as error:
        api_error(500, str(error))
