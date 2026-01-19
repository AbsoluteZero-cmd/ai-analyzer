from pydantic import BaseModel
from datetime import datetime


class AnalysisOut(BaseModel):
    id: int
    filename: str
    summary: str
    created_at: datetime

    class Config:
        from_attributes = True


class AnalysisDetailOut(AnalysisOut):
    content: str

# User Verification

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class UserIn(BaseModel):
    username: str
    email: str | None = None
    hashed_password: str

    class Config:
        from_attributes = True

class UserOut(UserIn):
    id: int
    username: str
    email: str | None = None