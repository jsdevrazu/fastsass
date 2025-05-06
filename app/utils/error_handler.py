from fastapi import HTTPException
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
import traceback
import logging

logger = logging.getLogger("uvicorn.error")

async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled Exception: {repr(exc)}\n{traceback.format_exc()}")
    
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "Internal Server Error",
            "detail": str(exc)
        }
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.warning(f"Validation Error: {exc.errors()}")
    
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "error": "Validation Error",
            "details": exc.errors()
        }
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    logger.warning(f"HTTP Error: {exc.detail}")
    
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
        }
    )

def api_error(status_code: int = 500, message: str = 'Internal Server Error'):
    raise HTTPException(status_code, message)

