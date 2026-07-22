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
        ALTER TABLE users ADD COLUMN IF NOT EXISTS service VARCHAR(20) DEFAULT 'mindcheck';
        ALTER TABLE users ADD COLUMN IF NOT EXISTS grade VARCHAR(10);

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

        CREATE TABLE IF NOT EXISTS site_config (
            key        VARCHAR(100) PRIMARY KEY,
            value      TEXT NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS activity_logs (
            id         SERIAL PRIMARY KEY,
            user_id    INTEGER,
            user_name  VARCHAR(100),
            user_email VARCHAR(150),
            action     VARCHAR(50) NOT NULL,
            ip_address VARCHAR(50),
            session_id VARCHAR(100),
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
        );
    """)

with db() as cur:
    cur.executemany(
        'INSERT INTO site_config (key, value) VALUES (%s, %s) ON CONFLICT (key) DO NOTHING',
        [
            ('powered_by',         'Preflex Solutions Pvt. Ltd.'),
            ('hero_title',         'Mental Wellness'),
            ('hero_line2',         'Assessment Tool'),
            ('hero_subtitle',      'A gate to personalized counselling & support for all ages. Understand your mental wellness and get connected to the right help.'),
            ('contact_email',      'support@preflexsol.com'),
            ('contact_phone',      '+91 98866 29446'),
            ('about_title',        'Why Mental Wellness Matters Today'),
            ('about_p1',           'MindCheck is a professional mental wellness self-assessment platform developed by Preflex Solutions Pvt. Ltd. to help individuals across all age groups understand and manage their mental health.'),
            ('about_p2',           'From school students to senior adults, our tailored assessments provide actionable insights and connect users with qualified counsellors when professional help is needed.'),
            ('about_cards_json',   '[{"icon":"\U0001f393","label":"Students","sub":"School & College"},{"icon":"\U0001f491","label":"Couples","sub":"Relationship Support"},{"icon":"\U0001f331","label":"Recovery","sub":"After Separation"},{"icon":"\U0001f31f","label":"Seniors","sub":"Healthy Ageing"}]'),
            ('features_json',      '[{"icon":"\U0001f512","title":"Confidential","desc":"Your responses are private and reviewed only by verified professionals."},{"icon":"\U0001f3af","title":"Personalised","desc":"Questions and results are tailored to your age group and life situation."},{"icon":"\U0001f3eb","title":"Institution Support","desc":"Colleges and schools can enrol students and track wellness by section."},{"icon":"\U0001f4c8","title":"Actionable Insights","desc":"Admins get CSV/PDF reports sortable by institution and section."},{"icon":"⚡","title":"Fast & Simple","desc":"The full assessment takes under 10 minutes on any device."},{"icon":"\U0001f91d","title":"Professional Review","desc":"Every result is reviewed by a counsellor before being released."},{"icon":"\U0001f5fa️","title":"Career Pathfinding","desc":"50-question career aptitude assessments for 10th and 12th grade students."},{"icon":"\U0001f393","title":"Stream Guidance","desc":"Structured career counselling helps students choose the right stream and college."}]'),
            ('institution_title',  'Built for Colleges & Schools'),
            ('institution_desc',   'MindCheck offers dedicated institution support — from student enrolment and section-wise assessments to bulk reporting for counsellors and administrators.'),
            ('logo_base64',        ''),
        ]
    )

# Force-update features_json so new career counselling cards always appear
with db() as cur:
    cur.execute(
        "INSERT INTO site_config (key, value) VALUES ('features_json', %s) "
        "ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        ('[{"icon":"\U0001f512","title":"Confidential","desc":"Your responses are private and reviewed only by verified professionals."},{"icon":"\U0001f3af","title":"Personalised","desc":"Questions and results are tailored to your age group and life situation."},{"icon":"\U0001f3eb","title":"Institution Support","desc":"Colleges and schools can enrol students and track wellness by section."},{"icon":"\U0001f4c8","title":"Actionable Insights","desc":"Admins get CSV/PDF reports sortable by institution and section."},{"icon":"⚡","title":"Fast & Simple","desc":"The full assessment takes under 10 minutes on any device."},{"icon":"\U0001f91d","title":"Professional Review","desc":"Every result is reviewed by a counsellor before being released."},{"icon":"\U0001f5fa️","title":"Career Pathfinding","desc":"50-question career aptitude assessments for 10th and 12th grade students."},{"icon":"\U0001f393","title":"Stream Guidance","desc":"Structured career counselling helps students choose the right stream and college."}]',)
    )

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
