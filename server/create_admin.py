import os
import bcrypt
from db import db
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

email    = os.environ.get('ADMIN_EMAIL', 'admin@mindcheck.com')
password = os.environ.get('ADMIN_PASSWORD')
if not password:
    raise EnvironmentError('ADMIN_PASSWORD env var is required')

hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

with db() as cur:
    cur.execute(
        "INSERT INTO users (name, email, password, category, role, status, email_verified) "
        "VALUES (%s,%s,%s,'student','admin','approved',TRUE) ON CONFLICT (email) DO NOTHING",
        ('Admin', email, hashed)
    )

print(f'Admin created — email: {email}')
