from fastapi import APIRouter, Depends
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.auth_service import AuthService
from app.utils.response import success_response
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter()
auth_service = AuthService()


@router.post("/register")
async def register(request: RegisterRequest):
    res = auth_service.register_user(request)
    return success_response("User registered successfully", {
        "user_id": res.user.id,
        "email": res.user.email,
    })


@router.post("/login")
async def login(request: LoginRequest):
    session = auth_service.login_user(request)
    return success_response("Login successful", {
        "access_token": session.access_token,
        "token_type": "bearer",
        "expires_in": session.expires_in,
        "user": {
            "id": session.user.id,
            "email": session.user.email,
            "username": session.user.user_metadata.get("username", session.user.email.split('@')[0])
        }
    })


@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return success_response("Current user fetched", {"user": current_user})
