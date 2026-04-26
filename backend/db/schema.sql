-- Run this in Supabase SQL editor OR psql after creating the database

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  category    VARCHAR(100) NOT NULL,
  -- otp_pending → admin_pending → approved | declined
  status      VARCHAR(50)  NOT NULL DEFAULT 'otp_pending',
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS otp_verifications (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) NOT NULL,
  otp        VARCHAR(6)   NOT NULL,
  expires_at TIMESTAMP    NOT NULL,
  used       BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS submissions (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category        VARCHAR(100) NOT NULL,
  answers         JSONB        NOT NULL,
  score           INTEGER,
  total           INTEGER,
  level           VARCHAR(50),
  label           VARCHAR(100),
  action          TEXT,
  safety_flag     BOOLEAN NOT NULL DEFAULT FALSE,
  submitted_at    TIMESTAMP NOT NULL DEFAULT NOW(),
  result_released BOOLEAN NOT NULL DEFAULT FALSE,
  admin_notes     TEXT,
  released_at     TIMESTAMP
);
