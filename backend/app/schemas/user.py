from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserProfileBase(BaseModel):
    username: str

class UserProfileUpdate(BaseModel):
    username: Optional[str] = None

class UserProfileResponse(UserProfileBase):
    id: str
    email: EmailStr
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
