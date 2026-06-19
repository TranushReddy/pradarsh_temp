from fastapi import APIRouter, Query
from app.services.project_service import ProjectService
from app.utils.response import success_response

router = APIRouter()
project_service = ProjectService()

# NOTE: FastAPI matches routes in registration order.
# Specific literal paths like /category/{cat} and /tech/{tech} MUST be
# registered before the root "/" GET so there is no ambiguity.

@router.get("/category/{category}", response_model=dict)
async def search_by_category(category: str):
    res = project_service.search_projects(category=category)
    return success_response("Category results", {"projects": res})


@router.get("/tech/{technology}", response_model=dict)
async def search_by_technology(technology: str):
    res = project_service.search_projects(technology=technology)
    return success_response("Technology results", {"projects": res})


@router.get("/", response_model=dict)
async def search_projects(
    q: str = Query(None, description="Full-text search on project title"),
    category: str = Query(None),
    technology: str = Query(None),
):
    res = project_service.search_projects(query=q, category=category, technology=technology)
    return success_response("Search results", {"projects": res})
