"""Runs on every deploy before uvicorn starts. Safe to run repeatedly."""
import bcrypt
from db import db
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

with db() as cur:
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id             SERIAL PRIMARY KEY,
            name           VARCHAR(100)  NOT NULL,
            email          VARCHAR(150)  UNIQUE NOT NULL,
            password       VARCHAR(255)  NOT NULL,
            category       VARCHAR(50),
            role           VARCHAR(20)   NOT NULL DEFAULT 'user',
            status         VARCHAR(20)   NOT NULL DEFAULT 'pending',
            otp            VARCHAR(6),
            otp_expires_at TIMESTAMP,
            email_verified BOOLEAN       NOT NULL DEFAULT FALSE,
            created_at     TIMESTAMP     NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS questions (
            id              SERIAL PRIMARY KEY,
            category_id     VARCHAR(50)  NOT NULL,
            sort_order      INTEGER      NOT NULL DEFAULT 0,
            part            VARCHAR(150) NOT NULL,
            text            TEXT         NOT NULL,
            indicator       TEXT         NOT NULL,
            reversed        BOOLEAN      NOT NULL DEFAULT FALSE,
            safety_question BOOLEAN      NOT NULL DEFAULT FALSE,
            active          BOOLEAN      NOT NULL DEFAULT TRUE
        );

        CREATE TABLE IF NOT EXISTS submissions (
            id              SERIAL PRIMARY KEY,
            user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
            user_name       VARCHAR(100),
            user_email      VARCHAR(150),
            category        VARCHAR(50)   NOT NULL,
            answers         JSONB         NOT NULL,
            score           INTEGER       NOT NULL,
            total           INTEGER       NOT NULL,
            level           VARCHAR(50),
            label           VARCHAR(100),
            action          TEXT,
            safety_flag     BOOLEAN       NOT NULL DEFAULT FALSE,
            ai_analysis     TEXT,
            result_released BOOLEAN       NOT NULL DEFAULT FALSE,
            admin_notes     TEXT,
            released_at     TIMESTAMP,
            submitted_at    TIMESTAMP     NOT NULL DEFAULT NOW()
        );

        ALTER TABLE submissions ADD COLUMN IF NOT EXISTS ai_analysis TEXT;
    """)

print('Tables ready.')

# Create admin account if it doesn't exist yet
email    = 'admin@mindcheck.com'
password = 'admin123'
hashed   = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

with db() as cur:
    cur.execute(
        "INSERT INTO users (name, email, password, category, role, status, email_verified) "
        "VALUES (%s,%s,%s,'student','admin','approved',TRUE) ON CONFLICT (email) DO NOTHING",
        ('Admin', email, hashed)
    )

print(f'Admin ready — {email} / {password}')
