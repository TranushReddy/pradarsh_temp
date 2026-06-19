from fastapi import APIRouter, Depends
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.project_service import ProjectService
from app.utils.response import success_response
from app.dependencies.auth_dependencies import get_current_user

router = APIRouter()
project_service = ProjectService()

# Static paths must come before parameterised paths.
@router.get("/my-projects", response_model=dict)
async def get_my_projects(current_user: dict = Depends(get_current_user)):
    res = project_service.get_user_projects(current_user["id"])
    return success_response("User projects fetched", {"projects": res})


@router.get("/", response_model=dict)
async def get_all_projects():
    res = project_service.get_all_projects()
    return success_response("Projects fetched", {"projects": res})


@router.post("/", response_model=dict)
async def create_project(
    project: ProjectCreate,
    current_user: dict = Depends(get_current_user),
):
    res = project_service.create_project(current_user["id"], project)
    return success_response("Project created successfully", {"project": res})


@router.get("/{project_id}", response_model=dict)
async def get_project(project_id: str):
    res = project_service.get_project(project_id)
    return success_response("Project fetched successfully", res)


@router.put("/{project_id}", response_model=dict)
async def update_project(
    project_id: str,
    project_update: ProjectUpdate,
    current_user: dict = Depends(get_current_user),
):
    res = project_service.update_project(project_id, current_user["id"], project_update)
    return success_response("Project updated successfully", {"project": res})


@router.delete("/{project_id}", response_model=dict)
async def delete_project(
    project_id: str,
    current_user: dict = Depends(get_current_user),
):
    project_service.delete_project(project_id, current_user["id"])
    return success_response("Project deleted successfully")
