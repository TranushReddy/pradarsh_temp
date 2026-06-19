from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from datetime import datetime
from .user import UserProfileResponse


class ProjectBase(BaseModel):
    title: str
    short_description: str
    description: str
    category: str
    tech_stack: List[str]
    # project_url is the canonical live URL stored in the DB.
    # github_url is stored in the description or as metadata by convention;
    # it is NOT a DB column per the schema, so we keep it optional and
    # serialize it into the description or drop it on insert.
    project_url: str
    thumbnail_url: Optional[str] = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    short_description: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    project_url: Optional[str] = None
    thumbnail_url: Optional[str] = None


class ProjectResponse(ProjectBase):
    id: str
    developer_id: str
    visits_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProjectImageResponse(BaseModel):
    id: str
    project_id: str
    image_url: str
    created_at: datetime

    class Config:
        from_attributes = True


class ProjectDetailResponse(BaseModel):
    project: ProjectResponse
    developer: Optional[UserProfileResponse] = None
    screenshots: List[ProjectImageResponse] = []
