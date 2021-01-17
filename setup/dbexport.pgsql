--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.categories (
    cat_id smallint NOT NULL,
    description character varying(50) NOT NULL
);


ALTER TABLE public.categories OWNER TO mfzjgctxhfnlxn;

--
-- Name: categories_cat_id_seq; Type: SEQUENCE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE SEQUENCE public.categories_cat_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_cat_id_seq OWNER TO mfzjgctxhfnlxn;

--
-- Name: categories_cat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.categories_cat_id_seq OWNED BY public.categories.cat_id;


--
-- Name: movies; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.movies (
    movie_id integer NOT NULL,
    name character varying(50) NOT NULL,
    price numeric(5,2) DEFAULT 0.00 NOT NULL,
    cat_id smallint
);


ALTER TABLE public.movies OWNER TO mfzjgctxhfnlxn;

--
-- Name: movies_movie_id_seq; Type: SEQUENCE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE SEQUENCE public.movies_movie_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_movie_id_seq OWNER TO mfzjgctxhfnlxn;

--
-- Name: movies_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.movies_movie_id_seq OWNED BY public.movies.movie_id;


--
-- Name: show_movies; Type: VIEW; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE VIEW public.show_movies AS
 SELECT movies.movie_id,
    movies.name,
    movies.price,
    movies.cat_id
   FROM public.movies
  ORDER BY movies.name;


ALTER TABLE public.show_movies OWNER TO mfzjgctxhfnlxn;

--
-- Name: categories cat_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.categories ALTER COLUMN cat_id SET DEFAULT nextval('public.categories_cat_id_seq'::regclass);


--
-- Name: movies movie_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies ALTER COLUMN movie_id SET DEFAULT nextval('public.movies_movie_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.categories (cat_id, description) FROM stdin;
1	Action
2	Comedy
3	Romance
\.


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.movies (movie_id, name, price, cat_id) FROM stdin;
1	Terminator	9.99	1
2	Dumb and Dumber	12.99	2
3	The Princes Bride	8.99	3
\.


--
-- Name: categories_cat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.categories_cat_id_seq', 3, true);


--
-- Name: movies_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.movies_movie_id_seq', 3, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (cat_id);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movie_id);


--
-- Name: movies movies_cat_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_cat_id_fkey FOREIGN KEY (cat_id) REFERENCES public.categories(cat_id) ON UPDATE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: mfzjgctxhfnlxn
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO mfzjgctxhfnlxn;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO mfzjgctxhfnlxn;


--
-- PostgreSQL database dump complete
--

