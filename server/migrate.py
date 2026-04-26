from db import db
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

with db() as cur:
    cur.execute('ALTER TABLE submissions ADD COLUMN IF NOT EXISTS ai_analysis TEXT;')

print('Migration complete.')
