-- Run in a terminal from the project folder:
-- psql postgres -f database.txt

-- Create database and revoke public permissions
DROP DATABASE IF EXISTS movies;
CREATE DATABASE movies;
\c movies
REVOKE ALL ON DATABASE movies FROM public;
REVOKE CREATE ON SCHEMA public FROM PUBLIC;

-- Create tables and instert some data
CREATE TABLE IF NOT EXISTS categories (
  cat_id SMALLSERIAL PRIMARY KEY,
  description VARCHAR(50) NOT NULL
);

INSERT INTO
  categories (description)
VALUES
  ('Action'),
  ('Comedy'),
  ('Romance');

CREATE TABLE IF NOT EXISTS movies (
  movie_id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  cat_id SMALLINT REFERENCES categories (cat_id) ON UPDATE CASCADE
);

INSERT INTO
  movies (name, price, cat_id)
VALUES
  ('Terminator', 9.99, 1),
  ('Dumb and Dumber', 12.99, 2),
  ('The Princes Bride', 8.99, 3);

DROP VIEW IF EXISTS show_movies;
CREATE VIEW show_movies AS
    SELECT *
    FROM movies
    ORDER BY name ASC;

-- Create user and grant access
DROP USER IF EXISTS webuser;
CREATE USER webuser WITH ENCRYPTED PASSWORD '12345';
GRANT CONNECT ON DATABASE mydb TO webuser;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO webuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO webuser;