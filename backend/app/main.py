import os
from .auth import create_access_token, get_current_user
from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import status

from sqlalchemy.orm import Session
from .db import Base, engine, get_db
from .auth import authenticate_user, get_password_hash
from .schemas import AnalysisOut, AnalysisDetailOut, TokenData, UserIn, UserOut
from .ai import Summarizer
from .models import Analysis

app = FastAPI(title="ai-analyzer")

cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in cors_origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

summarizer: Summarizer | None = None

MAX_CHARS = int(os.getenv("MAX_CHARS", "25000"))

@app.on_event("startup")
def load_model():
    global summarizer
    summarizer = Summarizer()


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/api/analyze", response_model=AnalysisDetailOut)
async def analyze_text_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    if not file.filename.lower().endswith(".txt"):
        raise HTTPException(status_code=400, detail="Please upload a .txt file")

    raw = await file.read()

    def decode_text(raw_bytes: bytes) -> str:
        for enc in ("utf-8-sig", "utf-16", "utf-16-le", "utf-16-be", "utf-8"):
            try:
                return raw_bytes.decode(enc)
            except UnicodeDecodeError:
                continue

        return raw_bytes.decode("latin-1", errors="replace")

    text = decode_text(raw).strip()

    text = text.replace("\x00", "")

    if not text:
        raise HTTPException(status_code=400, detail="File is empty")

    if len(text) > MAX_CHARS:
        text = text[:MAX_CHARS]

    if summarizer is None:
        raise HTTPException(status_code=503, detail="Model not loaded yet")

    summary = summarizer.summarize(text)
    summary = summary.replace("\x00", "")

    print(summary)

    row = Analysis(filename=file.filename, content=text, summary=summary)
    db.add(row)
    db.commit()
    db.refresh(row)

    return row


@app.get("/api/analyses", response_model=list[AnalysisOut])
def list_analyses(db: Session = Depends(get_db)):
    rows = db.query(Analysis).order_by(Analysis.created_at.desc()).limit(50).all()
    return rows


@app.get("/api/analyses/{analysis_id}", response_model=AnalysisDetailOut)
def get_analysis(analysis_id: int, db: Session = Depends(get_db)):
    row = db.query(Analysis).filter(Analysis.id == analysis_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Not found")
    return row

@app.delete("/api/delete/{analysis_id}")
def delete_analysis(analysis_id: int, db: Session = Depends(get_db)):
    print(analysis_id)
    row = db.query(Analysis).filter(Analysis.id == analysis_id).delete()
    db.commit()
    return {'status': 'ok'}


# Users

from .schemas import Token
from .models import User
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    print(user)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/register")
def create_user(user: UserIn, db: Session = Depends(get_db)):
    print(user)

    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    hashed_password = get_password_hash(user.hashed_password)
    new_user = User(username=user.username,email=user.email,hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}

@app.get("/users/me", response_model=UserOut)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.get("/users/all", response_model=list[UserOut])
def get_users(db: Session = Depends(get_db)):
    rows = db.query(User).order_by(User.id.desc()).limit(50).all()
    return rows


