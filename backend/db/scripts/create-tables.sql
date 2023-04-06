CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS lists (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  user_id uuid NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS meals (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  meal_type VARCHAR(255) NOT NULL DEFAULT 'lunch',
  kind VARCHAR(255),
  description TEXT,
  url VARCHAR(255),
  meal_date DATE NOT NULL,
  user_id uuid NOT NULL,
  list_id uuid,
  updated_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (list_id) REFERENCES lists(id)
);
