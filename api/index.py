from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend
import httpx


# ROOT_DIR = Path(__file__).parent
# load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL', 'lalogalindo@gmail.com')
RECAPTCHA_SECRET_KEY = os.environ.get('RECAPTCHA_SECRET_KEY', '')
CONTACT_PHONE = os.environ.get('CONTACT_PHONE', '2221401900')

# Create the main app without a prefix
app = FastAPI(title="MercSoft API")

# Create a router without a prefix (Vercel handles the /api mapping)
api_router = APIRouter()


# ===== Models =====
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default="", max_length=160)
    subject: str = Field(..., min_length=1, max_length=160)
    message: str = Field(..., min_length=1, max_length=5000)
    recaptcha_token: str = Field(..., min_length=1)
    locale: str = Field(default="en", max_length=8)


# ===== reCAPTCHA verification =====
async def verify_recaptcha(token: str) -> bool:
    """Verify reCAPTCHA token with Google. Returns True on success."""
    if not RECAPTCHA_SECRET_KEY:
        logger.warning("RECAPTCHA_SECRET_KEY not set; rejecting request")
        return False
    try:
        async with httpx.AsyncClient(timeout=10.0) as http:
            r = await http.post(
                "https://www.google.com/recaptcha/api/siteverify",
                data={"secret": RECAPTCHA_SECRET_KEY, "response": token},
            )
            data = r.json()
            return bool(data.get("success", False))
    except Exception as e:
        logger.error(f"reCAPTCHA verification failed: {e}")
        return False


# ===== Email template =====
def build_email_html(payload: ContactRequest) -> str:
    safe = lambda s: (s or "").replace("<", "&lt;").replace(">", "&gt;")
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0B14;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0F1020;border:1px solid #1f2235;border-radius:12px;overflow:hidden;">
          <tr><td style="padding:24px 28px;border-bottom:1px solid #1f2235;">
            <div style="font-size:11px;letter-spacing:.18em;color:#00E5FF;text-transform:uppercase;">MercSoft &middot; New Lead</div>
            <h1 style="margin:6px 0 0;color:#fff;font-size:22px;">{safe(payload.subject)}</h1>
          </td></tr>
          <tr><td style="padding:22px 28px;color:#cdd2e2;font-size:14px;line-height:1.6;">
            <p style="margin:0 0 6px;color:#8892B0;">From</p>
            <p style="margin:0 0 14px;color:#fff;"><strong>{safe(payload.name)}</strong> &lt;{safe(payload.email)}&gt;</p>
            <p style="margin:0 0 6px;color:#8892B0;">Company</p>
            <p style="margin:0 0 14px;color:#fff;">{safe(payload.company) or '—'}</p>
            <p style="margin:0 0 6px;color:#8892B0;">Locale</p>
            <p style="margin:0 0 14px;color:#fff;">{safe(payload.locale)}</p>
            <p style="margin:0 0 6px;color:#8892B0;">Message</p>
            <div style="white-space:pre-wrap;color:#fff;background:#0A0B14;border:1px solid #1f2235;border-radius:8px;padding:14px;">{safe(payload.message)}</div>
          </td></tr>
          <tr><td style="padding:18px 28px;border-top:1px solid #1f2235;color:#8892B0;font-size:11px;">
            Sent via mercsoft.com contact form
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


# ===== Routes =====
@api_router.get("/")
async def root():
    return {"message": "MercSoft API", "status": "ok"}


@api_router.get("/config")
async def public_config():
    """Public, non-secret config used by the frontend (phone, etc.)."""
    return {"contact_phone": CONTACT_PHONE, "contact_email": RECIPIENT_EMAIL}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(client_name=input.client_name)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/contact")
async def submit_contact(payload: ContactRequest):
    # 1) reCAPTCHA
    ok = await verify_recaptcha(payload.recaptcha_token)
    if not ok:
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    # 2) Persist submission (best-effort)
    submission_id = str(uuid.uuid4())
    doc = {
        "id": submission_id,
        "name": payload.name,
        "email": payload.email,
        "company": payload.company,
        "subject": payload.subject,
        "message": payload.message,
        "locale": payload.locale,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "delivered": False,
    }
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception as e:
        logger.error(f"Failed to persist contact submission: {e}")

    # 3) Send email via Resend
    if not resend.api_key:
        raise HTTPException(status_code=500, detail="Email service not configured")

    params = {
        "from": f"MercSoft <{SENDER_EMAIL}>",
        "to": [RECIPIENT_EMAIL],
        "reply_to": payload.email,
        "subject": f"[MercSoft] {payload.subject}",
        "html": build_email_html(payload),
    }

    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"delivered": True, "email_id": result.get("id")}},
        )
        return {"status": "success", "id": submission_id}
    except Exception as e:
        msg = str(e)
        logger.error(f"Resend error: {msg}")
        # Free-tier quota / rate limit -> 500 per requirement
        lower = msg.lower()
        if any(k in lower for k in ["quota", "rate", "limit", "429", "too many"]):
            raise HTTPException(
                status_code=500,
                detail="Email quota reached. Please try again later or contact us directly.",
            )
        raise HTTPException(status_code=500, detail=f"Failed to send email: {msg}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
