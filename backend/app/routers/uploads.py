from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from app.services.storage_service import StorageService
from app.services.project_service import ProjectService
from app.utils.response import success_response
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter()
storage_service = StorageService()
project_service = ProjectService()


def _assert_owner(project_id: str, user_id: str):
    """Raise 403 if current user is not the project owner."""
    proj = project_service.db.table("projects").select("developer_id").eq("id", project_id).execute()
    if not proj.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if proj.data[0]["developer_id"] != user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")


@router.post("/{project_id}/thumbnail", response_model=dict)
async def upload_thumbnail(
    project_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    _assert_owner(project_id, current_user["id"])
    url = storage_service.upload_thumbnail(project_id, file)
    return success_response("Thumbnail uploaded", {"thumbnail_url": url})


@router.post("/{project_id}/screenshots", response_model=dict)
async def upload_screenshot(
    project_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user),
):
    _assert_owner(project_id, current_user["id"])
    res = storage_service.upload_screenshot(project_id, file)
    return success_response("Screenshot uploaded", {"screenshot": res})


@router.delete("/screenshots/{image_id}", response_model=dict)
async def delete_screenshot(
    image_id: str,
    current_user: dict = Depends(get_current_user),
):
    # Verify the authenticated user owns the project this screenshot belongs to
    img_res = storage_service.db.table("project_images").select("project_id").eq("id", image_id).execute()
    if not img_res.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Screenshot not found")
    _assert_owner(img_res.data[0]["project_id"], current_user["id"])

    res = storage_service.delete_screenshot(image_id)
    return success_response("Screenshot deleted successfully")
