# MindCheck — Mental Wellness Assessment Platform

MindCheck is a full-stack mental wellness self-assessment web application built by **Preflex Solutions Pvt. Ltd.** It allows users to register, take tailored psychological assessments, and receive results reviewed by a counsellor. Admins manage users, review submissions, and customise the homepage — all from a built-in dashboard.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Assessment Categories](#assessment-categories)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Deploying to Render](#deploying-to-render)
- [Admin Dashboard Guide](#admin-dashboard-guide)
- [Site Config (Homepage Editor)](#site-config-homepage-editor)
- [Recreating the Database](#recreating-the-database)

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, Vite 5, Tailwind CSS v3, React Router v6 |
| Backend   | FastAPI (Python), Uvicorn                       |
| Database  | PostgreSQL (via psycopg v3)                     |
| Auth      | JWT (7-day tokens), bcrypt password hashing     |
| Email     | Brevo (Sendinblue) transactional email API      |
| AI        | Google Gemini API (auto-generates AI analysis)  |
| Hosting   | Render (web service + managed PostgreSQL)       |

---

## Features

- **User registration & approval flow** — users register, admin approves before they can log in
- **6 assessment categories** — tailored questions per life stage
- **Admin result review** — admin reviews answers, writes notes, releases results to user
- **AI analysis** — Gemini auto-generates a personalised assessment on submission
- **Safety flagging** — high-risk answers are automatically flagged for urgent review
- **Institution support** — colleges/schools can enrol students; results filterable by section
- **Activity logs** — every login/logout recorded with IP address, searchable
- **Member management** — admin can disable/enable/delete approved users
- **Homepage editor (Site Config)** — admin edits all homepage text, feature cards, and logo without touching code
- **CSV & PDF export** — download filtered assessment reports
- **30-minute inactivity auto-logout**
- **Fully responsive** — works on mobile and desktop

---

## Assessment Categories

| DB ID           | Label                  | Description                              |
|-----------------|------------------------|------------------------------------------|
| `student`       | Children & Students    | School-going students aged 10–16         |
| `young-adult`   | Youngsters & Gen Z     | College students and young adults 17–25  |
| `married`       | Adult & Couples        | Adults and couples, relationship wellness|
| `divorced`      | Working Professionals  | Career stress and work-life balance      |
| `older`         | Senior Citizens        | Healthy ageing, 55+                      |
| `single-mother` | Single Parents         | Challenges of solo parenting             |

> **Note:** DB IDs are stable. Display labels can be changed without breaking existing data.

---

## Project Structure

```
mindcheck/
├── server/                  # FastAPI backend
│   ├── main.py              # All API endpoints
│   ├── startup.py           # Runs on deploy — creates tables, seeds defaults
│   ├── db.py                # PostgreSQL connection helper
│   └── requirements.txt
├── src/                     # React frontend
│   ├── pages/
│   │   ├── Landing.jsx      # Public homepage (reads /api/config)
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── UserDashboard.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── Questionnaire.jsx
│   │   └── ThankYou.jsx
│   ├── components/
│   │   ├── Navbar.jsx       # Shows custom logo if uploaded
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── context/
│   │   └── AuthContext.jsx  # JWT auth, inactivity logout
│   └── data/
│       └── questions.js     # CATEGORIES + QUESTIONS + calculateResult()
├── vite.config.js           # Proxies /api → localhost:5000 in dev
├── package.json
└── README.md
```

---

## Local Development Setup

### Prerequisites

- **Node.js** v18+
- **Python** 3.11+
- **PostgreSQL** running locally (or use a cloud DB)

---

### 1. Clone the repo

```bash
git clone https://github.com/Jesterkori/mindread.git
cd mindread
```

---

### 2. Frontend setup

```bash
npm install
```

---

### 3. Backend setup

```bash
cd server
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
```

---

### 4. Create a `.env` file

Create a `.env` file in the **project root**:

```env
# Database — use DATABASE_URL for a full connection string,
# or individual vars below for a local Postgres instance
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/mindcheck

# Or individual vars (used if DATABASE_URL is not set):
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mindcheck
DB_USER=postgres
DB_PASSWORD=yourpassword

# JWT — change this to a long random secret in production
JWT_SECRET=your_super_secret_key_here

# Admin account (created automatically on first startup)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=yourStrongPassword123

# Optional — Brevo email API (for OTP verification emails)
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER=noreply@yourdomain.com

# Optional — Google Gemini (free tier; primary AI for the assessment write-up).
# Get a key at aistudio.google.com/apikey — NEVER commit this key to git.
GEMINI_API_KEY=your_gemini_api_key

# Optional — Groq (free tier; falls back to this if Gemini errors/is unset, and
# always powers the admin-panel score sanity-check). Get a key at console.groq.com/keys
GROQ_API_KEY=your_groq_api_key

# Optional — frontend URL for CORS (defaults to http://localhost:5173)
FRONTEND_URL=http://localhost:5173
```

---

### 5. Initialise the database

```bash
# Make sure you're in the server/ directory with venv activated
python startup.py
```

This creates all tables and seeds:
- Default site config values
- Admin user account
- A sample institution (PES College) with sections

---

### 6. Run the backend

```bash
# From the server/ directory
uvicorn main:app --reload --port 5000
```

---

### 7. Run the frontend

```bash
# From the project root (new terminal)
npm run dev
```

Open **http://localhost:5173** — the Vite dev server proxies all `/api` requests to `localhost:5000` automatically.

---

## Environment Variables

| Variable         | Required | Description                                              |
|------------------|----------|----------------------------------------------------------|
| `DATABASE_URL`   | Yes*     | Full PostgreSQL connection string                        |
| `DB_HOST`        | Yes*     | Postgres host (used if DATABASE_URL not set)             |
| `DB_PORT`        | No       | Postgres port (default: 5432)                            |
| `DB_NAME`        | No       | Database name (default: mindcheck)                       |
| `DB_USER`        | No       | Postgres user (default: postgres)                        |
| `DB_PASSWORD`    | Yes*     | Postgres password                                        |
| `JWT_SECRET`     | Yes      | Secret key for signing JWT tokens                        |
| `ADMIN_EMAIL`    | No       | Admin account email (default: admin@mindcheck.com)       |
| `ADMIN_PASSWORD` | Yes      | Admin account password — **required or startup fails**   |
| `BREVO_API_KEY`  | No       | Brevo API key for sending OTP verification emails        |
| `BREVO_SENDER`   | No       | Sender email address for Brevo                           |
| `GEMINI_API_KEY` | No       | Google Gemini key — primary AI for the assessment write-up |
| `GROQ_API_KEY`   | No       | Groq key — fallback write-up AI + admin score sanity-check |
| `FRONTEND_URL`   | No       | Allowed CORS origin (default: http://localhost:5173)     |

*Either `DATABASE_URL` **or** the individual `DB_*` vars must be set.

---

## Deploying to Render

### First-time setup

1. **Create a PostgreSQL database** on Render (Free tier)
   - Note the **Internal Database URL**

2. **Create a Web Service** on Render
   - **Repository**: your GitHub repo
   - **Root Directory**: leave blank
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `python server/startup.py && uvicorn server.main:app --host 0.0.0.0 --port $PORT`

3. **Add Environment Variables** in the Render web service settings:

   ```
   DATABASE_URL        = <Internal Database URL from step 1>
   JWT_SECRET          = <long random string>
   ADMIN_EMAIL         = admin@yourdomain.com
   ADMIN_PASSWORD      = <strong password>
   FRONTEND_URL        = https://your-app-name.onrender.com
   GEMINI_API_KEY      = <optional>
   GROQ_API_KEY        = <optional>
   BREVO_API_KEY       = <optional>
   BREVO_SENDER        = <optional>
   ```

4. **Deploy** — Render auto-deploys on every push to `main`

> `startup.py` runs on every deploy and safely creates/alters tables using `IF NOT EXISTS` and `ON CONFLICT DO NOTHING` — it is safe to run repeatedly.

---

### Subsequent deploys

Just push to `main`:

```bash
git push origin main
```

Render picks it up automatically and rebuilds.

---

## Admin Dashboard Guide

Log in with your admin credentials and go to `/admin`.

### Pending Tab
- View all users awaiting approval
- **Approve** — user can now log in and take assessments
- **Decline** — user is rejected (optional reason sent)
- **Delete** — removes the user entirely
- Users with unverified emails are flagged with a badge

### Assessments Tab
- **Needs Review** — submissions not yet released to the user
  - Expand a card to view all answers, flag high-risk responses
  - Write an **Admin Answer** (shown to the user) and an optional personal note
  - Edit or paste the **AI Assessment** if needed
  - Click **Release Result to User** when ready
- **Reviewed** — already released results
  - Expand and click **Edit Result** to correct any mistakes post-release

### Members Tab
- View all approved users
- **Disable** — user cannot log in (account still exists)
- **Enable** — reactivates a disabled account
- **Delete** — permanently removes the user and all their data

### Activity Logs Tab
- Real-time log of every login and logout
- Shows user name, email, IP address, and timestamp
- Searchable by name or email

### Site Config Tab
- Edit all homepage content without touching code — see [Site Config](#site-config-homepage-editor) below

### Institutions Tab
- Add/delete institutions (colleges, schools)
- Add/delete sections within each institution (e.g. "1st Year", "CSE")

### Questions Tab
- View, edit, add, or delete questions per category
- Mark questions as **Safety Questions** (high-risk answers trigger urgent flag)
- Mark questions as **Reversed** (scoring: higher answer = lower risk)
- **Reset to Defaults** restores the original question set for a category

---

## Site Config (Homepage Editor)

In the Admin Dashboard → **Site Config** tab, you can edit:

| Section       | Fields                                                      |
|---------------|-------------------------------------------------------------|
| **Hero**      | Powered-by badge, heading line 1, heading line 2, subtitle  |
| **Logo**      | Upload a JPG/PNG — stored as base64 in the DB (persists across Render redeploys) |
| **About**     | Section heading, paragraph 1, paragraph 2, 4 mini-cards (icon / label / subtitle) |
| **Features**  | 6 feature cards (icon / title / description each)           |
| **Institution** | Section title, description, contact email, contact phone  |

Click **Save Changes** — updates go live on the homepage immediately for all visitors.

> The logo is stored as a base64 string in the database, not as a file, so it survives Render's ephemeral file system across redeploys.

---

## Recreating the Database

If your Render database is suspended or deleted (Render free tier expires after 90 days):

1. **Render → New → PostgreSQL** — create a fresh database
2. Copy the **Internal Database URL**
3. Go to your **Web Service → Environment** → update `DATABASE_URL`
4. **Manual Deploy → Deploy latest commit**
5. `startup.py` recreates all tables and seeds defaults automatically

> You will lose all user data, assessments, and uploaded logo. The admin account is re-created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars.

---

## License

Private project — Preflex Solutions Pvt. Ltd. All rights reserved.
