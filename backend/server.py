from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="YourAllyPro API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME")

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    company: str
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    company: str
    message: str
    created_at: str

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(form: ContactForm):
    contact_data = {
        "name": form.name,
        "email": form.email,
        "company": form.company,
        "message": form.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    result = await db.contacts.insert_one(contact_data)
    return ContactResponse(
        id=str(result.inserted_id),
        name=contact_data["name"],
        email=contact_data["email"],
        company=contact_data["company"],
        message=contact_data["message"],
        created_at=contact_data["created_at"]
    )

@app.get("/api/contacts")
async def get_contacts():
    contacts = []
    async for contact in db.contacts.find({}, {"_id": 0}).limit(100):
        contacts.append(contact)
    return contacts
