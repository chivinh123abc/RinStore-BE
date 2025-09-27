-- user
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  role SMALLINT DEFAULT(0),
  status SMALLINT DEFAULT(0),
  avatar TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  verify_token VARCHAR(255),
  is_active BOOLEAN DEFAULT false,
  is_destroy BOOLEAN DEFAULT false
);