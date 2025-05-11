from fastapi import APIRouter, Depends, Query
from pymongo.errors import PyMongoError
from app.utils.error_handler import api_error
from app.validation_schema.post_validation_schema import JobSchema
from bson import ObjectId
from app.dependencies.subscription import require_active_subscription
from app.auth.jwt_handler import require_role, get_current_user, optional_get_current_user
from app.utils.helper import slugify
from datetime import datetime, timedelta, timezone
from app.db.mongo import db
from app.validation_schema.post_validation_schema import UpdateJobSchema, ApplicationStatus, ApplicationSchema, ReviewsRatinsSchema
from datetime import datetime
from fastapi.responses import StreamingResponse
from io import BytesIO
from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from typing import Optional

router = APIRouter()


@router.post('/post')
def post_job(
    body:JobSchema,
    user=Depends(require_active_subscription)
):
    try:
        now = datetime.now()
        payload = {
            **body.model_dump(),
            "slug": slugify(body.title),
            "created_at": now,
            "updated_at": now,
            "post_by": ObjectId(user['_id']),
            "application_dead_line": now + timedelta(days=30),
            "company_name": ObjectId(user['company_id'])
        }

        db.jobs.insert_one(payload)

        db.users.find_one_and_update(
            {"email": user['email'],},
            {"$inc": {"feature.used_job": 1}}
        )

        return {
            "message": "Job post successfully"
        }
    except PyMongoError:
        api_error(500, "Invalid Database Request")


@router.get("/jobs")
def get_all_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    title: str = Query('', alias="title"),
    location: str = Query('', alias="location"),
    job_type: str = Query('', alias="job_type"),
    min_salary: int = Query(None, alias="min_salary"),
    max_salary: int = Query(None, alias="max_salary"),

): 
    skip = (page - 1) * limit
    try:
        filters = {}

        if title:
            filters["title"] = {"$regex": title, "$options": "i"}
        
        if location:
            filters["location"] = {"$regex": location, "$options": "i"}
        
        if job_type:
            filters["job_type"] = job_type
        
        if min_salary is not None:
            filters["min_salary"] = {"$gte": min_salary}
        
        if max_salary is not None:
            filters["max_salary"] = {"$lte": max_salary}

        pipeline = [
            {"$match": filters},
            {
                "$lookup": {
                    "from": "companies", 
                    "localField": "company_name",
                    "foreignField": "_id", 
                    "as": "company"
                }
            },
            {"$unwind": {"path": "$company", "preserveNullAndEmptyArrays": True}}, 
            {"$skip": skip},
            {"$limit": limit},
            {
                "$project": {
                    "_id": {"$toString": "$_id"}, 
                    "title": 1,
                    "meta_description": 1,
                    "min_salary": 1,
                    "max_salary": 1,
                    "location": 1,
                    "job_type": 1,
                    "slug": 1,
                    "created_at": 1,
                    "updated_at": 1,
                    "location": 1,
                    "job_type": 1,
                    "skills": 1,
                    "questions": 1,
                    "apply_settings": 1,
                    "job_status": 1,
                    "company._id": {"$toString": "$company._id"},
                    "company.name": 1,
                    "company.logo": 1
                }
            }
        ]

        cursor = list(db.jobs.aggregate(pipeline))

        total = db.jobs.count_documents(filters)

        return {
            "message": "success",
            "total": total,
            "page": page,
            "limit": limit,
            "jobs": cursor
        }

    except PyMongoError as error:
        api_error(500, str(error))


@router.get('/{slug}/detail')
def get_single_job(
    slug: str,
    user: Optional[dict] = Depends(optional_get_current_user)
):
    pipeline = [
        {"$match": {"slug": slug}},
        {
            "$lookup": {
                "from": "companies",
                "localField": "company_name",
                "foreignField": "_id",
                "as": "company"
            }
        },
        {"$unwind": {"path": "$company", "preserveNullAndEmptyArrays": True}},
    ]

    if user:
        pipeline += [
            {
                "$lookup": {
                    "from": "save_jobs",
                    "let": {"jobId": "$_id"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        {"$eq": ["$job_id", "$$jobId"]},
                                        {"$eq": ["$user_id", ObjectId(user["_id"])]}
                                    ]
                                }
                            }
                        },
                        {"$limit": 1}
                    ],
                    "as": "saved"
                }
            },
            {
                "$addFields": {
                    "isBookmarked": {"$gt": [{"$size": "$saved"}, 0]}
                }
            }
        ]
    else:
        pipeline += [
            {
                "$addFields": {
                    "isBookmarked": False
                }
            }
        ]

    pipeline += [
        {
            "$project": {
                "_id": {"$toString": "$_id"},
                "title": 1,
                "body": 1,
                "meta_description": 1,
                "min_salary": 1,
                "max_salary": 1,
                "location": 1,
                "job_type": 1,
                "slug": 1,
                "created_at": 1,
                "updated_at": 1,
                "skills": 1,
                "questions": 1,
                "apply_settings": 1,
                "application_email": 1,
                "application_dead_line": 1,
                "application_link": 1,
                "job_status": 1,
                "isBookmarked": 1,
                "company._id": {"$toString": "$company._id"},
                "company.name": 1,
                "company.logo": 1,
                "company.company_description": 1,
            }
        }
    ]

    cursor_job = db.jobs.aggregate(pipeline)
    job_list = list(cursor_job)
    if not job_list:
        api_error(404, "Job not found")

    return {
        "message": "success",
        "job": job_list[0]
    }
    
    

@router.patch("/update/{job_id}")
def update_job(
    job_id: str,
    body: UpdateJobSchema,
    user=Depends(require_active_subscription)
):
    try:

        filtered_data = {k: v for k, v in body.model_dump().items() if v is not None}

        if "title" in filtered_data:
            filtered_data['slug'] = slugify(filtered_data['title'])

        if not filtered_data:
            api_error(400, "No valid fields to update")

        job = db.jobs.find_one_and_update(
            {"_id": ObjectId(job_id), "post_by": ObjectId(user['_id'])},
            {"$set": filtered_data},
            return_document=True
        )

        if not job:
            api_error(404, "Job not found")

        return {
            "message": "Update Successfully"
        }
    except PyMongoError as error:
        api_error(500, str(error))
    

@router.delete("/delete/{job_id}")
def delete_job(job_id: str, user=Depends(require_active_subscription)):
    try:
        job = db.jobs.delete_one({"_id": ObjectId(job_id), "post_by": ObjectId(user['_id'])})

        if job.deleted_count == 0:
            api_error(400, "Job not found")
        
        return {
            "message": "Job Delete Successfully"
        }
    except PyMongoError as error:
        api_error(500, str(error))


@router.post('/apply/{job_id}')
async def apply_job(
    body: ApplicationSchema,
    job_id: str,
    user=Depends(require_role('job_seeker'))
):
    try:
        job = db.jobs.find_one({"_id": ObjectId(job_id)})
        application = db.applications.find_one({
            "job_id": ObjectId(job_id),
            "applicate": {"$in": [ObjectId(user['_id'])]}
        })

        if not job:
            api_error(404, "Job not found")
        
        if application:
            api_error(400, 'You have already apply this job')
        
        payload = {
            **body.model_dump(),
            "job_id": ObjectId(job_id),
            "applicate": ObjectId(user['_id']),
            "created_at": datetime.now(),
            "updated_at": datetime.now(),
            "application_status": 'Pending'
        }

        db.applications.insert_one(payload)

        return {
            "message": "Job Apply Successfully"
        }
    
    except PyMongoError as error:
        api_error(500, str(error))

@router.get('/get-apply-jobs')
def get_apply_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role('job_seeker'))
):
    skip = (page - 1) * limit
    try:
        pipeine = [
            {"$match": {
                "applicate": ObjectId(user['_id'])
            }},
            {
            "$lookup": {
                "from": "jobs",            
                "localField": "job_id",       
                "foreignField": "_id",    
                "as": "job"
            }
            },
            {"$unwind": {"path": "$job", "preserveNullAndEmptyArrays": True}},
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "job.company_name",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {"$unwind": {"path": "$company", "preserveNullAndEmptyArrays": True}},
            {"$skip": skip},
            {"$limit": limit},
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "job_id": {"$toString": "$job._id"},
                    "application_status": 1,
                    "job.title": 1,
                    "job.created_at": 1,
                    "job.location": 1,
                    "job.slug": 1,
                    "company_name": "$company.name"

                }
            }
        ]

        applications = list(db.applications.aggregate(pipeine))
        total = db.applications.count_documents({"applicate": ObjectId(user['_id'])})
        

        return {
            "message": "success",
            "page": page,
            "total": total,
            "limit": limit,
            "applications": applications

        }

    except PyMongoError as error:
        api_error(500, str(error))

@router.get("/recent-applied")
def recent_applied_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role("job_seeker"))
):
        skip = (page - 1) * limit
        ten_days_ago = datetime.now(timezone.utc) - timedelta(days=10)

        pipeline = [
            {
                "$match": {
                    "applicate": ObjectId(user["_id"]),
                    "created_at": {"$gte": ten_days_ago}
                }
            },
            {
                "$lookup": {
                    "from": "jobs",
                    "localField": "job_id",
                    "foreignField": "_id",
                    "as": "job"
                }
            },
            {"$unwind": {"path": "$job", "preserveNullAndEmptyArrays": True}},
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "job.company_name",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {"$unwind": {"path": "$company", "preserveNullAndEmptyArrays": True}},
            {"$skip": skip},
            {"$limit": limit},
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "job_id": {"$toString": "$job._id"},
                    "application_status": 1,
                    "job.title": 1,
                    "job.created_at": 1,
                    "job.location": 1,
                    "job.slug": 1,
                    "company_name": "$company.name"

                }
            },
            {"$sort": {"created_at": -1}}
        ]

        applications = list(db.applications.aggregate(pipeline))
        total = db.applications.count_documents({"applicate": ObjectId(user['_id'])})

        return {
            "message": "success",
            "page": page,
            "total": total,
            "limit": limit,
            "applications": applications
        }


@router.get('/recommended')
def get_recommended_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(get_current_user)
):
    skip = (page - 1) * limit

    applied_jobs = list(db.applications.find(
            {"applicate": ObjectId(user['_id'])},
            {"job_id": 1}
        ))
    
    applied_job_ids = [item["job_id"] for item in applied_jobs]

    recent_job = db.jobs.find_one(
            {"_id": applied_job_ids[-1]} if applied_job_ids else {},
            {"job_type": 1, "location": 1}
        )

    filters = {}
    if recent_job:
            if recent_job.get("job_type"):
                filters["job_type"] = recent_job["job_type"]
            if recent_job.get("location"):
                filters["location"] = recent_job["location"]

    pipeline = [
            {
                "$match": {
                    **filters,
                    "_id": {"$nin": applied_job_ids}
                }
            },
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "company_name",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {
                "$unwind": {
                    "path": "$company",
                    "preserveNullAndEmptyArrays": True
                }
            },
            {
                "$project": {
                    "title": 1,
                    "job_type": 1,
                    "location": 1,
                    "slug": 1,
                    "post_by": 1,
                    "company_name": "$company.name",
                    "created_at": 1
                }
            },
            {"$skip": skip},
            {"$limit": limit}
        ]

    recommended_jobs = list(db.jobs.aggregate(pipeline))

    total = db.jobs.count_documents({
            **filters,
            "_id": {"$nin": applied_job_ids}
    })

    for job in recommended_jobs:
            job['_id'] = str(job['_id'])
            job['post_by'] = str(job['post_by'])

    return {
            "message": "success",
            "total": total,
            "page": page,
            "limit": limit,
            "recommended_jobs": recommended_jobs
        }


@router.post('/save/{job_id}')
def save_job(job_id: str, user=Depends(require_role('job_seeker'))):
        job = db.jobs.find_one({"_id": ObjectId(job_id)})
        if not job:
            api_error(404, "Job not found")

        save_job = db.save_jobs.find_one({
             "job_id": ObjectId(job_id),
             "user_id": {"$in": [ObjectId(user['_id'])]}
        })

        if save_job:
            api_error(400, "You already saved this job")


        db.save_jobs.insert_one({
            "job_id": ObjectId(job_id),
            "user_id": ObjectId(user['_id']),
            "created_at": datetime.now(),
            "updated_at": datetime.now()
        })

        return {
            "message": "Job Saved Successfully"
        }


@router.get("/stats")
def dashboard_stats(user=Depends(require_role('job_seeker'))):
    application = db.applications.count_documents({"applicate": ObjectId(user['_id'])})
    interviewed = db.applications.count_documents({"application_status": 'Interviewed'})
    save_jobs = db.save_jobs.count_documents({"user_id": ObjectId(user['_id'])})
    total_views_pipeline = [
        {
            "$group": {
                "_id": ObjectId(user['_id']),
                "total_views": {"$sum": "$profile_view"}
            }
        }
    ]

    result = list(db.users.aggregate(total_views_pipeline))
    total_views = result[0]['total_views'] if result else 0

    return {
        "message": "success",
        "application": application,
        "interviewed": interviewed,
        "save_jobs": save_jobs,
        "profile_views": total_views

    }

@router.get('/saved-jobs')
def get_saved_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role("job_seeker"))
):
    skip = (page-1) * limit
    try:
        
        pipeline = [
            {"$match": {"user_id": ObjectId(user['_id'])}},
            {
                "$lookup":{
                    "from": "jobs",
                    "localField": "job_id",
                    "foreignField": "_id", 
                    "as": "saved_jobs"

                }
            },
            {"$unwind": {"path": "$saved_jobs", "preserveNullAndEmptyArrays": True}}, 
            {
                "$lookup": {
                    "from": "companies",
                    "localField": "saved_jobs.company_name",
                    "foreignField": "_id",
                    "as": "company"
                }
            },
            {"$unwind": {"path": "$company", "preserveNullAndEmptyArrays": True}},
            {"$skip": skip},
            {"$limit": limit},
            {
                "$project": {
                   "_id": {"$toString": "$_id"}, 
                   "user_id": {"$toString": "$user_id"}, 
                   "saved_jobs._id": {"$toString": "$saved_jobs._id"}, 
                    "saved_jobs.title": 1,
                    "saved_jobs.meta_description": 1,
                    "saved_jobs.location": 1,
                    "saved_jobs.job_type": 1,
                    "company_name": "$company.name",
                    "saved_jobs.slug": 1,
                    "saved_jobs.created_at": 1,
                    "saved_jobs.updated_at": 1,
                }
            }
        ]

        total = db.save_jobs.count_documents({})
        jobs = list(db.save_jobs.aggregate(pipeline))


        return {
            "message": "success",
            "page": page,
            "limit": limit,
            "total": total,
            "jobs": jobs
        }
    except PyMongoError as error:
        api_error(500, str(error))

@router.post('/status/{application_id}')
def update_job_status(application_id: str, body: ApplicationStatus):
    job = db.applications.find_one_and_update(
        {"_id": ObjectId(application_id)},
        {"$set": {"application_status": body.application_status}},
        return_document=True
    )
    
    if not job:
        api_error(404, 'Job not found')

    return {
        "message": "Job update status success",
    }

@router.get('/update-view/{slug}')
def update_job_view(slug:str):

    job = db.jobs.find_one_and_update(
        {"slug": slug},
        {"$inc": {"job_view": 1}}
    )

    if not job:
        api_error(404, "Jon not found")


    return {
        "message": "View Update"
    }


@router.get('/profile-view/{user_id}')
def update_profile_view(user_id: str):

    user = db.users.find_one_and_update(
        {"_id": ObjectId(user_id)},
        {"$inc": {"profile_view": 1}}
    )

    if not user:
        api_error(404, "User not found")


    return {
        "message": "View Update"
    }

@router.get('/applications/export')
def export_applications(user=Depends(require_role('employer'))):
    try:
        applications_cursor = db.applications.find(
            {"applicate": ObjectId(user['_id'])},
            {"job_id": 1, "application_status": 1, "created_at": 1}
        )

        wb = Workbook()
        ws = wb.active
        ws.title = "Job Applications"

        headers = ["Job Title", "Company Name", "Application Status", "Apply Date"]
        for col_num, header in enumerate(headers, 1):
            col_letter = get_column_letter(col_num)
            ws[f"{col_letter}1"] = header

        row_num = 2
        for application in applications_cursor:
            job = db.jobs.find_one(
                {"_id": application['job_id']},
                {"title": 1, "company_name": 1}
            )

            if job:
                job_title = job.get("title", "")
                company_name = job.get("company_name", "")
                application_status = application.get("application_status", "")
                apply_date = application.get("created_at", datetime.now()).strftime("%Y-%m-%d %H:%M:%S")

                ws[f"A{row_num}"] = job_title
                ws[f"B{row_num}"] = company_name
                ws[f"C{row_num}"] = application_status
                ws[f"D{row_num}"] = apply_date

                row_num += 1

        output = BytesIO()
        wb.save(output)
        output.seek(0)

        return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                 headers={"Content-Disposition": "attachment; filename=job_applications_report.xlsx"})

    except Exception as e:
        api_error(500, f"Error generating report: {str(e)}")


@router.get('/my-jobs/export')
def export_applications(user=Depends(require_role('employer'))):
        jobs_cursor = db.jobs.find({"post_by": ObjectId(user['_id'])})

        wb = Workbook(write_only=True)  
        ws = wb.create_sheet(title="My All Job")

        headers = ["Job Title", "Applications", "Status", "Posted", "Expires"]
        ws.append(headers)

        for job in jobs_cursor:
            job_title = job.get("title", "")
            status = job.get("status", "")
            posted = job.get("created_at", datetime.now()).strftime("%Y-%m-%d")
            expires = job.get("application_dead_line", datetime.now()).strftime("%Y-%m-%d")

            application_count = db.applications.count_documents({"job_id": job["_id"]})

            ws.append([
                job_title,
                application_count,
                status,
                posted,
                expires
            ])

        output = BytesIO()
        wb.save(output)
        output.seek(0)

        return StreamingResponse(output, media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                                 headers={"Content-Disposition": "attachment; filename=my_jobs_export.xlsx"})


@router.get('/featured-jobs')
def featured_jobs():
    pipeline = [
        { "$sort": { "created_at": -1 } },
        { "$limit": 3 },
        {
            "$lookup": {
                "from": "companies",            
                "localField": "company_name",       
                "foreignField": "_id",    
                "as": "company"
            }
        },
        { "$unwind": "$company" },
        {
            "$project":{
                "_id":{"$toString": "$_id"},
                "company.name": 1,
                "job_type": 1,
                "location": 1,
                "title": 1,
                "meta_description": 1,
                "skills": 1,
                "slug": 1
            }
        }
    ]

    jobs = list(db.jobs.aggregate(pipeline))

    return {
        "message": "success",
        "jobs": jobs
    }

@router.get('/my-jobs')
async def get_my_jobs(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role('employer'))
):
    skip = (page -1) * limit

    pipeline = [
        {"$match": {"post_by": ObjectId(user['_id'])}},
        {
                "$lookup": {
                    "from": "companies", 
                    "localField": "company_name",
                    "foreignField": "_id", 
                    "as": "posted_by_user"
                }
        },
        {"$unwind": {"path": "$posted_by_user", "preserveNullAndEmptyArrays": True}}, 
        {
        "$lookup": {
            "from": "applications",
            "localField": "_id",
            "foreignField": "job_id",
            "as": "applications"
        }
        },
        {
            "$addFields": {
                "total_applications": {"$size": "$applications"}
            }
        },
        {"$skip": skip},
        {"$limit": limit},
        {
            "$project":{
                 "_id": {"$toString": "$_id"}, 
                    "title": 1,
                    "job_type": 1,
                    "slug": 1,
                    "created_at": 1,
                    "status": 1,
                    "updated_at": 1,
                    "total_applications": 1,
                    "job_status": 1,
                    "posted_by_user._id": {"$toString": "$posted_by_user._id"},
                    "posted_by_user.name": 1,
                    "posted_by_user.logo": 1
            }
        }
    ]

    jobs = list(db.jobs.aggregate(pipeline))


    return {
        "message": "success",
        "jobs": jobs
    }

@router.get('/employer/stats')
def get_employer_stats(user=Depends(require_role('employer'))):

    company_id = ObjectId(user['company_id'])

    jobs = list(db.jobs.find({"company_name": company_id}, {"_id": 1, "job_view": 1}))
    job_ids = [job["_id"] for job in jobs]

    active_job = db.jobs.count_documents({
        "company_name": company_id,
        "status": "active"
    })

    total_application = db.applications.count_documents({
        "job_id": {"$in": job_ids}
    })

    interviewed = db.applications.count_documents({
        "job_id": {"$in": job_ids},
        "application_status": "Interviewed"
    })

    jobs_view = sum(job.get("job_view", 0) for job in jobs)

    return {
        "active_jobs": active_job,
        "total_application": total_application,
        "interviewed": interviewed,
        "jobs_view": jobs_view
    }

@router.get("/employer/recent-applicants")
def get_recent_applicants(
    user=Depends(require_role("employer")),
    days: int = Query(10, ge=1),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    job_id: Optional[str] = None,
):
    company_id = ObjectId(user["company_id"])
    ten_days_ago = datetime.now(timezone.utc) - timedelta(days=days)

    job_query = {"company_name": company_id, "status": "active"}
    if job_id:
        job_query["_id"] = ObjectId(job_id)

    jobs = list(db.jobs.find(job_query, {"_id": 1, "title": 1}))
    job_id_to_title = {job["_id"]: job["title"] for job in jobs}
    job_ids = list(job_id_to_title.keys())

    if not job_ids:
        return {"applicants": [], "total": 0}

    skip = (page - 1) * limit
    applications_cursor = db.applications.find(
        {"job_id": {"$in": job_ids}, "created_at": {"$gte": ten_days_ago}}
    ).sort("created_at", -1).skip(skip).limit(limit)

    applications = list(applications_cursor)

    total_applications = db.applications.count_documents({
        "job_id": {"$in": job_ids},
        "created_at": {"$gte": ten_days_ago}
    })

    applicant_ids = list({app["applicate"] for app in applications})
    users = db.users.find({"_id": {"$in": applicant_ids}})
    user_map = {u["_id"]: u for u in users}

    enriched_apps = []
    for app in applications:
        applicant_info = user_map.get(app["applicate"], {})
        enriched_apps.append({
            "_id": str(app["_id"]),
            "job_id": str(app["job_id"]),
            "first_name": app.get("first_name"),
            "last_name": app.get("last_name"),
            "created_at": app["created_at"].isoformat(),
            "job_title": job_id_to_title.get(app["job_id"], "Unknown Job"),
            "application_status": app.get("application_status"),
            "applicant_email": applicant_info.get("email"),
        })

    return {
        "total": total_applications,
        "page": page,
        "limit": limit,
        "applicants": enriched_apps
    }




@router.get("/employer/active-jobs")
def get_active_jobs_with_application_count(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    user=Depends(require_role("employer"))
):
    skip = (page - 1) * limit
    company_id = ObjectId(user["company_id"])

    jobs = list(db.jobs.find(
        {"company_name": company_id, "status": "active"},
        {
            "_id": 1,
            "title": 1,
            "location": 1,
            "job_type": 1,
            "created_at": 1,
            "application_dead_line": 1,
            "slug": 1
        }
    ).skip(skip).limit(limit))

    job_ids = [job["_id"] for job in jobs]
    application_counts = db.applications.aggregate([
        {"$match": {"job_id": {"$in": job_ids}}},
        {"$group": {"_id": "$job_id", "count": {"$sum": 1}}}
    ])
    count_map = {item["_id"]: item["count"] for item in application_counts}

    for job in jobs:
        job["total_applications"] = count_map.get(job["_id"], 0)
        job["_id"] = str(job["_id"])  

    return {"jobs": jobs}


@router.get('/companies')
def get_companies(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1),
    title: str = Query(None),
    location: str = Query(None),
    industry: str = Query(None)
):
    skip = (page-1) * limit
    query = {}
    if title:
            query["name"] = {"$regex": title, "$options": "i"}  
    if location:
            query["headquatar_location"] = {"$regex": location, "$options": "i"}
    if industry:
            query["industry"] = {"$regex": industry, "$options": "i"}

    pipeline = [
            {"$match": query},
            {"$sort": {"_id": -1}},  
            {"$skip": skip},
            {"$limit": limit},
            {
                "$lookup": {
                    "from": "jobs",
                    "let": { "companyId": "$_id" },
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        { "$eq": ["$company_name", "$$companyId"] },
                                        { "$eq": ["$status", "active"] }
                                    ]
                                }
                            }
                        },
                        { "$count": "count" }
                    ],
                    "as": "active_jobs"
                }
            },
            {
                "$addFields": {
                    "jobs_open": {
                        "$ifNull": [{ "$arrayElemAt": ["$active_jobs.count", 0] }, 0]
                    }
                }
            },
            {
                "$project": {
                    "_id": { "$toString": "$_id" },
                    "name": 1,
                    "company_size": 1,
                    "logo": 1,
                    "company_description": 1,
                    "industry": 1,
                    "headquatar_location": 1,
                    "jobs_open": 1,
                    "rating": 1,
                }
            }
        ]

    companies = list(db.companies.aggregate(pipeline))
    total = db.companies.count_documents({})

    return {
            "message": "success",
            "page": page,
            "limit": limit,
            "total": total,
            "companies": companies
    }


@router.get('/company/{id}')
def get_single_company(id:str):

    pipeline = [
            {"$match": {"_id": ObjectId(id)}},
            {
                "$lookup": {
                    "from": "jobs",
                    "let": {"companyId": "$_id"},
                    "pipeline": [
                        {
                            "$match": {
                                "$expr": {
                                    "$and": [
                                        {"$eq": ["$company_name", "$$companyId"]},
                                        {"$eq": ["$status", "active"]}
                                    ]
                                }
                            }
                        },
                        {
                            "$project": {
                                "_id": 0,
                                "job_id": {"$toString": "$_id"},
                                "title": 1,
                                "slug": 1,
                                "job_type": 1,
                                "location": 1,
                                "min_salary": 1,
                                "max_salary": 1,
                                "created_at": 1
                            }
                        }
                    ],
                    "as": "active_jobs"
                }
            },
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "name": 1,
                    "logo": 1,
                    "rating": 1,
                    "website": 1,
                    "company_size": 1,
                    "company_description": 1,
                    "industry": 1,
                    "headquatar_location": 1,
                    "comapnies_calture": 1,
                    "active_jobs": 1,
                    "social_media": 1,
                    "ratings": {
                    "$map": {
                        "input": "$ratings",
                        "as": "r",
                        "in": {
                            "rating": "$$r.rating",
                            "employe_status": "$$r.employe_status",
                            "title": "$$r.title",
                            "review": "$$r.review",
                            "props": "$$r.props",
                            "cons": "$$r.cons",
                            "is_recommend": "$$r.is_recommend",
                            "date": "$$r.date",
                            "write_by": {"$toString": "$$r.write_by"}
                        }
                    }
        }
                }
            }
        ]

    companies = list(db.companies.aggregate(pipeline))

    if not companies:
            api_error(404, "Company not found")

    return {
            "message": "success",
            "company": companies[0]
        }

@router.post('/review/{id}')
def write_review(
    id: str,
    body: ReviewsRatinsSchema,
    user=Depends(require_role('employer'))
):
    company_id = ObjectId(id)
    reviewer_id = ObjectId(user['_id'])

    existing_review = db.companies.find_one({
        "_id": company_id,
        "ratings.write_by": reviewer_id
    })

    if existing_review:
        api_error(400, "You have already submitted a review for this company.")

    payload = {
        **body.model_dump(),
        "write_by": reviewer_id,
        "date": datetime.now(timezone.utc)
    }

    db.companies.update_one(
        {"_id": company_id},
        {"$push": {"ratings": payload}}
    )

    company = db.companies.find_one({"_id": company_id})
    all_ratings = company.get("ratings", [])

    if all_ratings:
        average = sum(r.get("rating", 0) for r in all_ratings if r.get("rating") is not None) / len(all_ratings)
        db.companies.update_one(
            {"_id": company_id},
            {"$set": {"rating": round(average, 2)}}
        )

    return {
        "message": "Review submitted successfully."
    }

@router.get('/candidates')
def get_candidates(
    user=Depends(require_role('employer')),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1)
):

    skip = (page-1) * limit
    jobs = list(db.jobs.find({"post_by": ObjectId(user["_id"])}, {"_id": 1}))
    job_ids = [job["_id"] for job in jobs]

    if not job_ids:
            return {
                "message": "No jobs posted by this employer",
                "applicants": []
            }

    pipeline = [
            {
                "$match": {
                    "job_id": {"$in": job_ids}
                }
            },
            {"$skip": skip},
            {"$limit": limit},
            {
                "$lookup": {
                    "from": "users",
                    "localField": "applicate",
                    "foreignField": "_id",
                    "as": "applicant"
                }
            },
            {"$unwind": "$applicant"},
            {
                "$lookup": {
                    "from": "jobs",
                    "localField": "job_id",
                    "foreignField": "_id",
                    "as": "job"
                }
            },
            {"$unwind": "$job"},
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "job_id": {"$toString": "$job._id"},
                    "job_title": "$job.title",
                    "first_name": "$applicant.first_name",
                    "avatar": "$applicant.avatar",
                    "last_name": "$applicant.last_name",
                    "email": "$applicant.email",
                    "resume": "$applicant.resume",
                    "location": "$applicant.location",
                    "application_status": 1,
                    "cover_letter": 1,
                    "experience": 1,
                    "skills": "$job.skills",
                    "applied_at": "$created_at"
                }
            }
        ]

    applicants = list(db.applications.aggregate(pipeline))

    return {
            "message": "success",
            "total": len(applicants),
            "applicants": applicants
        }