from fastapi import APIRouter, Depends
from app.schemas.user import UserProfileUpdate, UserProfileResponse
from app.services.user_service import UserService
from app.utils.response import success_response
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter()
user_service = UserService()

@router.get("/me", response_model=dict)
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    return success_response("Profile fetched successfully", {"profile": current_user})

@router.put("/me", response_model=dict)
async def update_my_profile(profile_update: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    updated_profile = user_service.update_profile(current_user['id'], profile_update)
    return success_response("Profile updated successfully", {"profile": updated_profile})

@router.get("/{user_id}", response_model=dict)
async def get_user_profile(user_id: str):
    profile = user_service.get_profile(user_id)
    return success_response("Profile fetched successfully", {"profile": profile})
