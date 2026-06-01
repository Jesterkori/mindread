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
        ALTER TABLE submissions ADD COLUMN IF NOT EXISTS admin_action TEXT;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS institution VARCHAR(100);
        ALTER TABLE submissions ADD COLUMN IF NOT EXISTS section VARCHAR(100);

        CREATE TABLE IF NOT EXISTS institutions (
            id         SERIAL PRIMARY KEY,
            name       VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS institution_sections (
            id             SERIAL PRIMARY KEY,
            institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
            name           VARCHAR(100) NOT NULL,
            created_at     TIMESTAMP NOT NULL DEFAULT NOW(),
            UNIQUE(institution_id, name)
        );
    """)

print('Tables ready.')

# Create admin account if it doesn't exist yet
import os as _os
email    = _os.environ.get('ADMIN_EMAIL', 'admin@mindcheck.com')
password = _os.environ.get('ADMIN_PASSWORD')
if not password:
    raise EnvironmentError('ADMIN_PASSWORD env var is required')

hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

with db() as cur:
    cur.execute(
        "INSERT INTO users (name, email, password, category, role, status, email_verified) "
        "VALUES (%s,%s,%s,'student','admin','approved',TRUE) ON CONFLICT (email) DO NOTHING",
        ('Admin', email, hashed)
    )

print(f'Admin ready — {email}')

# Seed default institution and sections
with db() as cur:
    cur.execute(
        "INSERT INTO institutions (name) VALUES ('PES College') ON CONFLICT (name) DO NOTHING RETURNING id"
    )
    row = cur.fetchone()
    if row:
        inst_id = row[0]
        for sec in ['1st Year', '2nd Year', '3rd Year', '4th Year']:
            cur.execute(
                'INSERT INTO institution_sections (institution_id, name) VALUES (%s,%s) ON CONFLICT DO NOTHING',
                (inst_id, sec)
            )
        print('Default institution + sections seeded.')
    else:
        print('Default institution already exists.')
