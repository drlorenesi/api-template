-- Create tables and instert some data
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
  daily_rental_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
  genre_id SMALLINT REFERENCES genres (genre_id) ON UPDATE CASCADE
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

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

INSERT INTO users (first_name, last_name, email) 
VALUES
  ('John', 'Smith', 'john@gmail.com'),
  ('Timmie', 'Lovel', 'tlovel0@craigslist.org'),
  ('Wilma', 'Iacomettii', 'wiacomettii1@statcounter.com'),
  ('Jackson', 'Spaunton', 'jspaunton2@irs.gov'),
  ('Ennis', 'Mabbott', 'emabbott3@123-reg.co.uk'),
  ('Reinold', 'Bater', 'rbater4@fastcompany.com'),
  ('Melicent', 'Dovinson', 'mdovinson5@google.cn'),
  ('Rozele', 'Beynke', 'rbeynke6@mysql.com'),
  ('Joshuah', 'Drover', 'jdrover7@illinois.edu'),
  ('Lia', 'Prazer', 'lprazer8@scribd.com'),
  ('Tiler', 'Harbach', 'tharbach9@marriott.com'),
  ('Jeremy', 'Threadgill', 'jthreadgilla@newyorker.com'),
  ('Monroe', 'Spriddle', 'mspriddleb@a8.net'),
  ('Harley', 'Cockrem', 'hcockremc@godaddy.com'),
  ('Luciano', 'Moorcroft', 'lmoorcroftd@ft.com'),
  ('Giacomo', 'Trout', 'gtroute@wsj.com'),
  ('Jarrod', 'Headland', 'jheadlandf@blogtalkradio.com'),
  ('Arthur', 'Jandl', 'ajandlg@europa.eu'),
  ('Edee', 'Wallice', 'ewalliceh@naver.com'),
  ('Rockey', 'MacFadyen', 'rmacfadyeni@bandcamp.com'),
  ('Hillie', 'Stilly', 'hstillyj@canalblog.com');

DROP VIEW IF EXISTS show_movies;
CREATE VIEW show_movies AS
    SELECT m.title, g.name, m.number_in_stock
    FROM movies AS m
    LEFT JOIN genres AS g ON m.genre_id = g.genre_id
    ORDER BY name ASC;