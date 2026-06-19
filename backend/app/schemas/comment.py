from pydantic import BaseModel
from datetime import datetime
from .user import UserProfileResponse

class CommentBase(BaseModel):
    comment_text: str

class CommentCreate(CommentBase):
    pass

class CommentResponse(CommentBase):
    id: str
    project_id: str
    user_id: str
    created_at: datetime
    user: UserProfileResponse

    class Config:
        from_attributes = True
