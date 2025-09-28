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
CREATE TABLE IF NOT EXISTS categories (
  category_id SERIAL PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL,
  category_slug VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS products(
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  product_slug VARCHAR(255) UNIQUE NOT NULL,
  product_description TEXT,
  product_short_description TEXT,
  product_price DECIMAL(10, 2) NOT NULL,
  product_sale_price DECIMAL(10, 2),
  status SMALLINT DEFAULT(0),
  category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE RESTRICT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP
)