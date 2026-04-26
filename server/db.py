import os
from contextlib import contextmanager
from pathlib import Path

import psycopg
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')


def _conninfo():
    url = os.environ.get('DATABASE_URL')
    if url:
        return url
    return (
        f"host={os.environ.get('DB_HOST', 'localhost')} "
        f"port={os.environ.get('DB_PORT', '5432')} "
        f"dbname={os.environ.get('DB_NAME', 'mindcheck')} "
        f"user={os.environ.get('DB_USER', 'postgres')} "
        f"password={os.environ.get('DB_PASSWORD', '')}"
    )


@contextmanager
def db():
    with psycopg.connect(_conninfo()) as conn:
        with conn.cursor() as cur:
            yield cur
