from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.snippets import router as snippet_router
from routes.auth import router as auth_router
from db.models import init_db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database
    init_db()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(snippet_router)


@app.get("/health")
def health():
    return {"status": "ok"}
