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
