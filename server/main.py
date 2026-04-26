import json
import os
import random
import smtplib
from datetime import datetime, timedelta, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional

import bcrypt
import httpx
from dotenv import load_dotenv
from fastapi import BackgroundTasks, FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from jose import JWTError, jwt
from pydantic import BaseModel

from db import db

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(status_code=exc.status_code, content={'error': exc.detail})

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={'error': str(exc)})

JWT_SECRET = os.environ.get('JWT_SECRET', 'mindcheck_secret_key')
ALGO = 'HS256'

# ── Auth helpers ──────────────────────────────────────────────────────────────

def make_token(payload: dict) -> str:
    data = {**payload, 'exp': datetime.now(timezone.utc) + timedelta(days=7)}
    return jwt.encode(data, JWT_SECRET, algorithm=ALGO)


def get_current_user(request: Request) -> dict:
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        raise HTTPException(status_code=401, detail='No token')
    try:
        return jwt.decode(auth[7:], JWT_SECRET, algorithms=[ALGO])
    except JWTError:
        raise HTTPException(status_code=401, detail='Invalid token')


def get_admin(request: Request) -> dict:
    user = get_current_user(request)
    if user.get('role') != 'admin':
        raise HTTPException(status_code=403, detail='Forbidden')
    return user


# ── OTP / Email ───────────────────────────────────────────────────────────────

def make_otp() -> str:
    return str(random.randint(100000, 999999))


_email_configured = os.environ.get('SMTP_USER', 'your@gmail.com') != 'your@gmail.com'


def send_otp(email: str, otp: str):
    if not _email_configured:
        print(f'[DEV] OTP for {email}: {otp}', flush=True)
        return
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'MindCheck — Your verification code'
    msg['From'] = os.environ.get('SMTP_FROM', '')
    msg['To'] = email
    msg.attach(MIMEText(
        f'Your MindCheck verification code is: {otp}\n\nThis code expires in 15 minutes.', 'plain'))
    msg.attach(MIMEText(
        f'<p>Your MindCheck verification code is:</p><h2>{otp}</h2><p>This code expires in 15 minutes.</p>', 'html'))
    with smtplib.SMTP(os.environ.get('SMTP_HOST', 'smtp.gmail.com'),
                      int(os.environ.get('SMTP_PORT', 587))) as smtp:
        smtp.starttls()
        smtp.login(os.environ.get('SMTP_USER', ''), os.environ.get('SMTP_PASS', ''))
        smtp.send_message(msg)


# ── Gemini analysis ───────────────────────────────────────────────────────────

async def generate_analysis(category_label: str, answers: dict, questions: list) -> str:
    label_map = {'A': 'Rarely or Never', 'B': 'Sometimes', 'C': 'Often', 'D': 'Almost Always'}

    def get_answer(q):
        return answers.get(str(q['id']), answers.get(q['id'], '?'))

    answers_text = '\n\n'.join(
        f'Q{q["id"]} [{q["part"]}]: "{q["text"]}"\n'
        f'  Answer: {get_answer(q)} — {label_map.get(get_answer(q), "?")}\n'
        f'  Indicator: {q["indicator"]}'
        for q in questions
    )

    safety_flag = any(
        (q.get('safetyQuestion') or q.get('safety_question'))
        and get_answer(q) in ('C', 'D')
        for q in questions
    )

    system_prompt = (
        'You are a compassionate, professional mental health screening assistant. '
        'You interpret questionnaire results following this scoring framework:\n'
        '- Mostly A\'s & B\'s: Healthy coping — normal ups and downs, good coping skills.\n'
        '- Mix of B\'s & C\'s: Moderate stress — struggling in certain areas, may need support.\n'
        '- Mostly C\'s & D\'s: High distress / clinical concern — significant challenges, '
        'professional help recommended.\n'
        '- Safety override: If a safety question is answered C or D, address this FIRST and PROMINENTLY.\n\n'
        'Write warmly and in second person ("you"). Be honest but compassionate. '
        'Reference specific patterns from the actual answers rather than giving generic advice.'
    )

    safety_prefix = (
        '⚠️ SAFETY FLAG ACTIVE: The user answered C or D to a critical safety question. '
        'Address this urgently and prominently as the FIRST thing in your response.\n\n'
        if safety_flag else ''
    )

    first_point = (
        'FIRST: Urgently and clearly addresses the safety concern and recommends immediate professional help.'
        if safety_flag else
        'Opens by acknowledging the overall pattern you see in their responses.'
    )

    user_prompt = (
        f'Category: {category_label}\n\n'
        f'{safety_prefix}User\'s responses:\n{answers_text}\n\n'
        f'Write a 3–4 paragraph personalized mental health assessment that:\n'
        f'1. {first_point}\n'
        f'2. Highlights the 2–3 most significant areas of concern based on their specific answers.\n'
        f'3. States the assessment level (Healthy Coping / Moderate Stress / High Distress) and explains why.\n'
        f'4. Gives specific, actionable next steps tailored to their situation.\n\n'
        f'Do NOT use bullet points. Write in flowing paragraphs. Keep the tone warm, non-judgmental, and empowering.'
    )

    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
            f'?key={os.environ.get("GEMINI_API_KEY", "")}',
            json={
                'system_instruction': {'parts': [{'text': system_prompt}]},
                'contents': [{'role': 'user', 'parts': [{'text': user_prompt}]}],
                'generationConfig': {'maxOutputTokens': 900, 'temperature': 0.7},
            }
        )

    text = (resp.json()
            .get('candidates', [{}])[0]
            .get('content', {})
            .get('parts', [{}])[0]
            .get('text', ''))
    if not text:
        raise ValueError('Empty response from Gemini')
    return text


async def _store_analysis(submission_id: int, category_label: str, answers: dict, questions: list):
    try:
        analysis = await generate_analysis(category_label, answers, questions)
        with db() as cur:
            cur.execute('UPDATE submissions SET ai_analysis = %s WHERE id = %s', (analysis, submission_id))
    except Exception as exc:
        print(f'Gemini background error: {exc}', flush=True)


# ── Pydantic request models ───────────────────────────────────────────────────

class RegisterBody(BaseModel):
    name: str
    email: str
    password: str
    category: str
    captchaToken: Optional[str] = None

class VerifyOtpBody(BaseModel):
    email: str
    otp: str

class ResendOtpBody(BaseModel):
    email: str

class LoginBody(BaseModel):
    email: str
    password: str

class SubmitBody(BaseModel):
    category: str
    categoryLabel: Optional[str] = None
    answers: dict
    questions: Optional[list] = None
    score: int
    total: int
    level: str
    label: str
    action: str
    safety_flag: bool = False

class ReleaseBody(BaseModel):
    adminNotes: Optional[str] = None
    aiAnalysis: Optional[str] = None
    action: Optional[str] = None

class QuestionBody(BaseModel):
    category_id: Optional[str] = None
    part: str
    text: str
    indicator: str
    reversed: bool = False
    safety_question: bool = False

class QuestionUpdate(BaseModel):
    part: Optional[str] = None
    text: Optional[str] = None
    indicator: Optional[str] = None
    reversed: Optional[bool] = None
    safety_question: Optional[bool] = None
    sort_order: Optional[int] = None
    active: Optional[bool] = None

class SeedBody(BaseModel):
    category: Optional[str] = None


# ── Utility ───────────────────────────────────────────────────────────────────

def _rows(cur) -> list[dict]:
    cols = [d[0] for d in cur.description]
    return [dict(zip(cols, row)) for row in cur.fetchall()]


def _fmt(row: dict, *keys):
    for k in keys:
        if row.get(k):
            row[k] = row[k].isoformat()
    return row


# ── Auth routes ───────────────────────────────────────────────────────────────

@app.post('/api/auth/register')
async def register(body: RegisterBody, background_tasks: BackgroundTasks):
    if not all([body.name, body.email, body.password, body.category]):
        raise HTTPException(400, 'All fields are required.')

    captcha_secret = os.environ.get('RECAPTCHA_SECRET', 'your_recaptcha_secret')
    if captcha_secret != 'your_recaptcha_secret' and body.captchaToken:
        async with httpx.AsyncClient() as client:
            r = await client.post(
                f'https://www.google.com/recaptcha/api/siteverify'
                f'?secret={captcha_secret}&response={body.captchaToken}'
            )
        if not r.json().get('success'):
            raise HTTPException(400, 'CAPTCHA verification failed.')

    with db() as cur:
        cur.execute('SELECT id FROM users WHERE email = %s', (body.email,))
        if cur.fetchone():
            raise HTTPException(400, 'Email already registered.')

        hashed = bcrypt.hashpw(body.password.encode(), bcrypt.gensalt()).decode()
        otp = make_otp()
        otp_expires = datetime.now(timezone.utc) + timedelta(minutes=15)
        cur.execute(
            'INSERT INTO users (name, email, password, category, otp, otp_expires_at) '
            'VALUES (%s,%s,%s,%s,%s,%s)',
            (body.name, body.email, hashed, body.category, otp, otp_expires)
        )

    background_tasks.add_task(send_otp, body.email, otp)
    return {'ok': True}


@app.post('/api/auth/verify-otp')
def verify_otp(body: VerifyOtpBody):
    with db() as cur:
        cur.execute('SELECT id, otp, otp_expires_at FROM users WHERE email = %s', (body.email,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(400, 'User not found.')
        uid, stored_otp, expires_at = row
        if stored_otp != body.otp:
            raise HTTPException(400, 'Invalid code.')
        if datetime.utcnow() > expires_at.replace(tzinfo=None):
            raise HTTPException(400, 'Code has expired. Please request a new one.')
        cur.execute(
            'UPDATE users SET email_verified = TRUE, otp = NULL, otp_expires_at = NULL WHERE id = %s',
            (uid,)
        )
    return {'ok': True}


@app.post('/api/auth/resend-otp')
def resend_otp(body: ResendOtpBody, background_tasks: BackgroundTasks):
    with db() as cur:
        cur.execute('SELECT id FROM users WHERE email = %s', (body.email,))
        if not cur.fetchone():
            raise HTTPException(400, 'User not found.')
        otp = make_otp()
        otp_expires = datetime.now(timezone.utc) + timedelta(minutes=15)
        cur.execute(
            'UPDATE users SET otp = %s, otp_expires_at = %s WHERE email = %s',
            (otp, otp_expires, body.email)
        )
    background_tasks.add_task(send_otp, body.email, otp)
    return {'ok': True}


@app.post('/api/auth/login')
def login(body: LoginBody):
    with db() as cur:
        cur.execute(
            'SELECT id, name, email, password, role, category, email_verified, status '
            'FROM users WHERE email = %s',
            (body.email,)
        )
        row = cur.fetchone()

    if not row:
        raise HTTPException(400, 'Invalid email or password.')

    uid, name, email, pw_hash, role, category, email_verified, status = row

    if not email_verified:
        raise HTTPException(400, 'Please verify your email first.')
    if status == 'pending':
        raise HTTPException(400, 'Your account is pending admin approval.')
    if status == 'declined':
        raise HTTPException(400, 'Your account registration was declined.')
    if not bcrypt.checkpw(body.password.encode(), pw_hash.encode()):
        raise HTTPException(400, 'Invalid email or password.')

    payload = {'id': uid, 'name': name, 'email': email, 'role': role, 'category': category}
    return {'token': make_token(payload), 'user': payload}


# ── Questionnaire routes ──────────────────────────────────────────────────────

@app.post('/api/questionnaire/submit')
async def submit(body: SubmitBody, request: Request, background_tasks: BackgroundTasks):
    user = get_current_user(request)

    with db() as cur:
        cur.execute('SELECT name, email FROM users WHERE id = %s', (user['id'],))
        name, email = cur.fetchone()
        cur.execute(
            'INSERT INTO submissions '
            '(user_id, user_name, user_email, category, answers, score, total, level, label, action, safety_flag) '
            'VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id',
            (user['id'], name, email, body.category, json.dumps(body.answers),
             body.score, body.total, body.level, body.label, body.action, body.safety_flag)
        )
        submission_id = cur.fetchone()[0]

    if body.questions and body.categoryLabel:
        background_tasks.add_task(
            _store_analysis, submission_id, body.categoryLabel, body.answers, body.questions
        )

    return {'ok': True}


@app.get('/api/user/results')
def user_results(request: Request):
    user = get_current_user(request)
    with db() as cur:
        cur.execute(
            'SELECT id, category, score, total, level, label, action, ai_analysis, '
            'safety_flag, admin_notes, released_at, submitted_at '
            'FROM submissions WHERE user_id = %s AND result_released = TRUE '
            'ORDER BY released_at DESC',
            (user['id'],)
        )
        rows = [_fmt(r, 'released_at', 'submitted_at') for r in _rows(cur)]
    return {'ok': True, 'results': rows}


# ── Admin routes ──────────────────────────────────────────────────────────────

@app.get('/api/admin/pending-users')
def pending_users(request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute(
            "SELECT id, name, email, category, created_at FROM users "
            "WHERE status = 'pending' AND email_verified = TRUE ORDER BY created_at ASC"
        )
        rows = [_fmt(r, 'created_at') for r in _rows(cur)]
    return {'ok': True, 'users': rows}


@app.get('/api/admin/submissions')
def admin_submissions(request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute(
            'SELECT id, user_id, user_name, user_email, category, answers, score, total, '
            'level, label, action, safety_flag, ai_analysis, result_released, '
            'admin_notes, released_at, submitted_at '
            'FROM submissions ORDER BY safety_flag DESC, submitted_at DESC'
        )
        rows = [_fmt(r, 'released_at', 'submitted_at') for r in _rows(cur)]
    return {'ok': True, 'submissions': rows}


@app.get('/api/admin/stats')
def admin_stats(request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute("SELECT COUNT(*) FROM users WHERE status = 'pending' AND email_verified = TRUE")
        pending = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM submissions')
        total = cur.fetchone()[0]
        cur.execute('SELECT COUNT(*) FROM submissions WHERE safety_flag = TRUE AND result_released = FALSE')
        flags = cur.fetchone()[0]
    return {'ok': True, 'pendingUsers': pending, 'totalSubmissions': total, 'unreviewedSafetyFlags': flags}


@app.post('/api/admin/approve-user/{uid}')
def approve_user(uid: int, request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute("UPDATE users SET status = 'approved' WHERE id = %s", (uid,))
    return {'ok': True}


@app.post('/api/admin/decline-user/{uid}')
def decline_user(uid: int, request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute("UPDATE users SET status = 'declined' WHERE id = %s", (uid,))
    return {'ok': True}


@app.post('/api/admin/release-result/{sub_id}')
def release_result(sub_id: int, body: ReleaseBody, request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute(
            'UPDATE submissions SET result_released = TRUE, admin_notes = %s, '
            'ai_analysis = %s, action = COALESCE(%s, action), released_at = NOW() '
            'WHERE id = %s',
            (body.adminNotes or None, body.aiAnalysis, body.action, sub_id)
        )
    return {'ok': True}


# ── Questions routes ──────────────────────────────────────────────────────────

@app.get('/api/questions/{category}')
def get_questions(category: str, request: Request):
    get_current_user(request)
    with db() as cur:
        cur.execute(
            'SELECT id, category_id, sort_order, part, text, indicator, reversed, safety_question '
            'FROM questions WHERE category_id = %s AND active = TRUE ORDER BY sort_order ASC',
            (category,)
        )
        rows = _rows(cur)
    return {'ok': True, 'questions': rows}


@app.get('/api/admin/questions')
def admin_get_questions(request: Request, category: Optional[str] = None):
    get_admin(request)
    with db() as cur:
        if category:
            cur.execute('SELECT * FROM questions WHERE category_id = %s ORDER BY sort_order ASC', (category,))
        else:
            cur.execute('SELECT * FROM questions ORDER BY category_id, sort_order ASC')
        rows = _rows(cur)
    return {'ok': True, 'questions': rows}


@app.post('/api/admin/questions')
def admin_create_question(body: QuestionBody, request: Request):
    get_admin(request)
    if not body.category_id or not body.part or not body.text or not body.indicator:
        raise HTTPException(400, 'category_id, part, text, and indicator are required.')
    with db() as cur:
        cur.execute('SELECT COALESCE(MAX(sort_order), 0) FROM questions WHERE category_id = %s', (body.category_id,))
        sort_order = cur.fetchone()[0] + 1
        cur.execute(
            'INSERT INTO questions (category_id, sort_order, part, text, indicator, reversed, safety_question) '
            'VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING *',
            (body.category_id, sort_order, body.part, body.text, body.indicator, body.reversed, body.safety_question)
        )
        row = dict(zip([d[0] for d in cur.description], cur.fetchone()))
    return {'ok': True, 'question': row}


@app.put('/api/admin/questions/{qid}')
def admin_update_question(qid: int, body: QuestionUpdate, request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute(
            'UPDATE questions SET '
            'part = COALESCE(%s, part), text = COALESCE(%s, text), '
            'indicator = COALESCE(%s, indicator), reversed = COALESCE(%s, reversed), '
            'safety_question = COALESCE(%s, safety_question), '
            'sort_order = COALESCE(%s, sort_order), active = COALESCE(%s, active) '
            'WHERE id = %s RETURNING *',
            (body.part, body.text, body.indicator, body.reversed, body.safety_question,
             body.sort_order, body.active, qid)
        )
        row = cur.fetchone()
        if not row:
            raise HTTPException(404, 'Question not found.')
        q = dict(zip([d[0] for d in cur.description], row))
    return {'ok': True, 'question': q}


@app.delete('/api/admin/questions/{qid}')
def admin_delete_question(qid: int, request: Request):
    get_admin(request)
    with db() as cur:
        cur.execute('DELETE FROM questions WHERE id = %s', (qid,))
    return {'ok': True}


@app.post('/api/admin/questions/seed')
def admin_seed_questions(body: SeedBody, request: Request):
    get_admin(request)
    defaults_path = Path(__file__).parent / 'defaultQuestions.json'
    if not defaults_path.exists():
        raise HTTPException(500, 'defaultQuestions.json not found. Run: node server/export_defaults.js')

    with open(defaults_path) as f:
        default_questions = json.load(f)

    categories = [body.category] if body.category else list(default_questions.keys())

    with db() as cur:
        for cat in categories:
            qs = default_questions.get(cat, [])
            if not qs:
                continue
            cur.execute('DELETE FROM questions WHERE category_id = %s', (cat,))
            for i, q in enumerate(qs, start=1):
                cur.execute(
                    'INSERT INTO questions (category_id, sort_order, part, text, indicator, reversed, safety_question) '
                    'VALUES (%s,%s,%s,%s,%s,%s,%s)',
                    (cat, i, q['part'], q['text'], q['indicator'],
                     q.get('reversed', False), q.get('safetyQuestion', False))
                )

    return {'ok': True}


# ── Serve React SPA (production) ──────────────────────────────────────────────

_dist = Path(__file__).parent.parent / 'dist'

if _dist.exists():
    _assets = _dist / 'assets'
    if _assets.exists():
        app.mount('/assets', StaticFiles(directory=str(_assets)), name='assets')

    @app.get('/{full_path:path}')
    async def spa(_: str):
        return FileResponse(str(_dist / 'index.html'))
