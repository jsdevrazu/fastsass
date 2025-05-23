from fastapi import FastAPI
from app.routes.auth_routes import router as auth_routes
from app.routes.employer_routes import router as employer_routes
from app.routes.payment_routes import router as payment_routes
from app.routes.admin_routes import router as admin_routes
from app.routes.jobs_routes import router as posts_routes
from app.routes.notification_routes import router as notification_routes
from fastapi.staticfiles import StaticFiles
from app.constant.index import API_PREFIX
from starlette.middleware.sessions import SessionMiddleware
from app.configs.settings import settings
from app.utils.error_handler import (
    global_exception_handler,
    validation_exception_handler,
    http_exception_handler,
)
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from app.socket import socket_app


origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "https://fastsass.vercel.app",
]

# Create Upload Folder
os.makedirs("uploads", exist_ok=True)
os.makedirs("uploads/logo", exist_ok=True)
os.makedirs("uploads/resume", exist_ok=True)
os.makedirs("uploads/profile", exist_ok=True)


app = FastAPI()
app.mount("/socket.io", socket_app)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(SessionMiddleware, secret_key=settings.google_client_secret)
app.add_exception_handler(Exception, global_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)


app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(auth_routes, prefix=f"{API_PREFIX}/auth")
app.include_router(employer_routes, prefix=f"{API_PREFIX}/employer")
app.include_router(notification_routes, prefix=f"{API_PREFIX}/notification")
app.include_router(payment_routes, prefix=f"{API_PREFIX}/pay")
app.include_router(admin_routes, prefix=f"{API_PREFIX}/admin")
app.include_router(posts_routes, prefix=f"{API_PREFIX}/job")

@app.get("/")
def home():
    return{
        "message": "App working fine..."
}