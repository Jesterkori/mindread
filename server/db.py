import os
from contextlib import contextmanager
from pathlib import Path

import psycopg2
from psycopg2 import pool
from dotenv import load_dotenv

load_dotenv(dotenv_path=Path(__file__).parent.parent / '.env')

_pool = None


def _get_pool():
    global _pool
    if _pool is None:
        url = os.environ.get('DATABASE_URL')
        if url:
            _pool = pool.ThreadedConnectionPool(1, 10, dsn=url)
        else:
            _pool = pool.ThreadedConnectionPool(
                1, 10,
                host=os.environ.get('DB_HOST', 'localhost'),
                port=int(os.environ.get('DB_PORT', 5432)),
                dbname=os.environ.get('DB_NAME', 'mindcheck'),
                user=os.environ.get('DB_USER', 'postgres'),
                password=os.environ.get('DB_PASSWORD', ''),
            )
    return _pool


@contextmanager
def db():
    p = _get_pool()
    conn = p.getconn()
    try:
        with conn.cursor() as cur:
            yield cur
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        p.putconn(conn)
