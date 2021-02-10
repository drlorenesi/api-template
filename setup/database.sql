-- Clear DB first if necessary:
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Create tables and instert some data:
CREATE TABLE IF NOT EXISTS genres (
  genre_id SMALLSERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

INSERT INTO genres (name)
VALUES
  ('Action'),
  ('Comedy'),
  ('Thriller'),
  ('Romance');

CREATE TABLE IF NOT EXISTS movies (
  movie_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  number_in_stock INT NOT NULL DEFAULT 0,
  daily_rental_rate DECIMAL(5, 2) NOT NULL,
  genre_id SMALLINT NOT NULL REFERENCES genres (genre_id)
);

INSERT INTO movies (title, number_in_stock, daily_rental_rate, genre_id)
VALUES
  ('Terminator', 6, 2.5, 1),
  ('Die Hard', 5, 1.5, 1),
  ('Get Out', 8, 3.5, 3),
  ('Trip to Italy', 7, 3.5, 2),
  ('Wedding Crashers', 6, 2.5, 2),
  ('Gone Girl', 6, 2.5, 3),
  ('The Sixth Sense', 6, 2.5, 3),
  ('The Avengers', 6, 2.5, 1),
  ('Airplane', 7, 3.5, 2),
  ('Dumb and Dumber', 6, 2.5, 2),
  ('The Princes Bride', 6, 2.5, 4);

DROP TABLE IF EXISTS roles;
CREATE TABLE roles (
  role_id SMALLSERIAL PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);

INSERT INTO roles (role_name)
VALUES
  ('Administrator'),
  ('General Access');

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
  role_id INT NOT NULL DEFAULT 2 REFERENCES roles (role_id),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
	email VARCHAR (255) UNIQUE NOT NULL,
	pass VARCHAR (60) NOT NULL,
  activated CHAR(36) NULL,
	created_on TIMESTAMP NOT NULL DEFAULT NOW(),
  last_login TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, pass) 
VALUES
  ('Timmie', 'Lovel', 'tlovel0@craigslist.org', '12345'),
  ('Wilma', 'Iacomettii', 'wiacomettii1@statcounter.com', '12345'),
  ('Jackson', 'Spaunton', 'jspaunton2@irs.gov', '12345'),
  ('Ennis', 'Mabbott', 'emabbott3@123-reg.co.uk', '12345'),
  ('Reinold', 'Bater', 'rbater4@fastcompany.com', '12345'),
  ('Melicent', 'Dovinson', 'mdovinson5@google.cn', '12345'),
  ('Rozele', 'Beynke', 'rbeynke6@mysql.com', '12345'),
  ('Joshuah', 'Drover', 'jdrover7@illinois.edu', '12345'),
  ('Lia', 'Prazer', 'lprazer8@scribd.com', '12345'),
  ('Tiler', 'Harbach', 'tharbach9@marriott.com', '12345'),
  ('Jeremy', 'Threadgill', 'jthreadgilla@newyorker.com', '12345'),
  ('Monroe', 'Spriddle', 'mspriddleb@a8.net', '12345'),
  ('Harley', 'Cockrem', 'hcockremc@godaddy.com', '12345'),
  ('Luciano', 'Moorcroft', 'lmoorcroftd@ft.com', '12345'),
  ('Giacomo', 'Trout', 'gtroute@wsj.com', '12345'),
  ('Jarrod', 'Headland', 'jheadlandf@blogtalkradio.com', '12345'),
  ('Arthur', 'Jandl', 'ajandlg@europa.eu', '12345'),
  ('Edee', 'Wallice', 'ewalliceh@naver.com', '12345'),
  ('Rockey', 'MacFadyen', 'rmacfadyeni@bandcamp.com', '12345'),
  ('Hillie', 'Stilly', 'hstillyj@canalblog.com', '12345');

-- to update a user:
-- UPDATE users 
-- SET role_id=1
-- WHERE user_id=XX;

DROP VIEW IF EXISTS show_movies;
CREATE VIEW show_movies AS
    SELECT m.title, g.name, m.number_in_stock
    FROM movies AS m
    LEFT JOIN genres AS g ON m.genre_id = g.genre_id
    ORDER BY name ASC;