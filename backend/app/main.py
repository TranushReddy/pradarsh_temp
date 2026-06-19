from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, users, projects, search, uploads

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Pradarsh App Showcase Platform",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://pradarsh-app.onrender.com",  # Your production frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Use the explicit list instead of "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------
app.include_router(auth.router,     prefix=f"{settings.API_V1_STR}/auth",     tags=["Authentication"])
app.include_router(users.router,    prefix=f"{settings.API_V1_STR}/users",    tags=["Users"])
app.include_router(projects.router, prefix=f"{settings.API_V1_STR}/projects", tags=["Projects"])
app.include_router(search.router,   prefix=f"{settings.API_V1_STR}/search",   tags=["Search"])
app.include_router(uploads.router,  prefix=f"{settings.API_V1_STR}/uploads",  tags=["Uploads"])

@app.get("/", include_in_schema=False)
@app.head("/", include_in_schema=False)
def read_root():
    return {"message": "Welcome to Pradarsh API", "docs": f"{settings.API_V1_STR}/openapi.json"}
