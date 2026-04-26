# MindCheck — Demo Guide

## What is MindCheck?
A mental health screening web app. Users register, take a category-specific MCQ assessment, and receive a **real-time AI-generated personal analysis** (via Google Gemini). An admin reviews submissions, manages questions, and releases results to users.

---

## Running Locally (Python backend)

### 1. Install dependencies
```bash
npm install
pip install -r server/requirements.txt
```

### 2. Set up the database
Make sure PostgreSQL is running, then from the `server/` folder:
```bash
cd server
python init_db.py
python create_admin.py
cd ..
```
> Admin login: `admin@mindcheck.com` / `admin123`

### 3. Export default questions to JSON
```bash
node server/export_defaults.js
```
This creates `server/defaultQuestions.json` which Python reads for the "Reset to Defaults" feature.

### 4. Start the app

You need **two terminals open at the same time**:

**Terminal 1 — Python backend:**
```bash
cd server
uvicorn main:app --port 5000 --reload
```
You should see: `Uvicorn running on http://127.0.0.1:5000`

**Terminal 2 — Vite frontend:**
```bash
npm run dev
```
Open **http://localhost:5173** in your browser.

### 5. Seed default questions
Log in as admin → **Questions** tab → pick a category → **Reset to Defaults**.

---

## Deploy to Render (one-time)

### Step 1 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mindcheck.git
git push -u origin main
```

### Step 2 — Create service on Render
1. Go to [render.com](https://render.com) → **New** → **Blueprint**
2. Connect your GitHub repo
3. Render reads `render.yaml` and creates the web service + PostgreSQL database automatically

### Step 3 — Set environment variables
In your Render service → **Environment**, add:
| Key | Value |
|---|---|
| `GEMINI_API_KEY` | `AIzaSyA6np7DOQPsxKnteoloI2za5kCXJO3xHec` |
| `RECAPTCHA_SECRET` | *(your Google key, or leave blank to skip)* |
| `SMTP_USER` | *(your Gmail, or leave blank to skip email)* |
| `SMTP_PASS` | *(your Gmail app password)* |
| `SMTP_FROM` | `MindCheck <your@gmail.com>` |

> `DATABASE_URL` and `JWT_SECRET` are auto-set by Render from `render.yaml`.

### Step 4 — Deploy
Render builds and deploys automatically. The build command:
- Builds the React frontend (`npm run build`)
- Exports question defaults to JSON
- Installs Python dependencies
- Runs `init_db.py` and `create_admin.py`

Your app will be live at `https://mindcheck.onrender.com` (or whatever Render assigns).

### Step 5 — Seed questions on Render
Log into the live admin dashboard → **Questions** tab → seed each category.

---

## Demo Flow (show this in order)

### Step 1 — Register as a user
- Go to `/register`, fill in details, pick **Student (10–18)**
- OTP prints to the **backend terminal** if email isn't configured — copy and paste it

### Step 2 — Admin approves the user
- Log in as `admin@mindcheck.com` / `admin123`
- **Pending Approvals** tab → click **Approve**

### Step 3 — User takes the assessment
- Log in as the regular user → questionnaire loads automatically
- Answer all 20 questions — answer mostly **C and D** to demonstrate High Distress
- Hit **Submit Assessment** → see the "pending review" confirmation

### Step 4 — Admin reviews and releases
- Admin dashboard → **Assessments** tab
- Find the submission, click **View & Release**
- See: all answers, the **PDF-scored result** (label + editable recommendation), and the **AI assessment** (editable Gemini text)
- Edit either text if needed, add an optional personal note → **Release Result to User**

### Step 5 — User sees their result
- Log back in as the user → dashboard → click **Details** on the released result
- Shows: score, level badge (green/amber/red), full AI assessment, admin note

### Step 6 — Admin manages questions (bonus)
- Admin → **Questions** tab → pick a category
- Show: edit a question inline, add one, delete one, Reset to Defaults

---

## Key Talking Points

| Feature | What to say |
|---|---|
| Python backend | "The backend is FastAPI (Python) — production-grade, async, deployed on Render with PostgreSQL." |
| AI analysis | "Gemini reads every single answer and writes a personalised 3–4 paragraph assessment — no generic buckets." |
| Admin gate | "Results are held until a human admin reviews and edits them before release — important for a clinical tool." |
| Editable results | "Admin can rewrite both the PDF recommendation and the AI analysis before the user sees anything." |
| Question editor | "Questions live in the database — the admin can change them without touching code." |
| PDF scoring | "Scoring follows the PDF methodology — A/B vs C/D pattern distribution, not a raw number." |

---

## Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@mindcheck.com | admin123 |
| Test user | register live during demo | anything |
