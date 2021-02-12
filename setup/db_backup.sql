--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.1

-- Started on 2021-02-11 16:47:09 CST

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

ALTER TABLE ONLY public.users DROP CONSTRAINT users_role_id_fkey;
ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_genre_id_fkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
ALTER TABLE ONLY public.movies DROP CONSTRAINT movies_pkey;
ALTER TABLE ONLY public.genres DROP CONSTRAINT genres_pkey;
ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
ALTER TABLE public.movies ALTER COLUMN movie_id DROP DEFAULT;
ALTER TABLE public.genres ALTER COLUMN genre_id DROP DEFAULT;
DROP SEQUENCE public.users_user_id_seq;
DROP TABLE public.users;
DROP VIEW public.show_movies;
DROP SEQUENCE public.roles_role_id_seq;
DROP TABLE public.roles;
DROP SEQUENCE public.movies_movie_id_seq;
DROP TABLE public.movies;
DROP SEQUENCE public.genres_genre_id_seq;
DROP TABLE public.genres;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 203 (class 1259 OID 14727736)
-- Name: genres; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.genres (
    genre_id smallint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.genres OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 202 (class 1259 OID 14727734)
-- Name: genres_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE SEQUENCE public.genres_genre_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.genres_genre_id_seq OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 3993 (class 0 OID 0)
-- Dependencies: 202
-- Name: genres_genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.genres_genre_id_seq OWNED BY public.genres.genre_id;


--
-- TOC entry 205 (class 1259 OID 14727744)
-- Name: movies; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.movies (
    movie_id integer NOT NULL,
    title character varying(50) NOT NULL,
    number_in_stock integer DEFAULT 0 NOT NULL,
    daily_rental_rate numeric(5,2) NOT NULL,
    genre_id smallint NOT NULL
);


ALTER TABLE public.movies OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 204 (class 1259 OID 14727742)
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
-- TOC entry 3994 (class 0 OID 0)
-- Dependencies: 204
-- Name: movies_movie_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.movies_movie_id_seq OWNED BY public.movies.movie_id;


--
-- TOC entry 207 (class 1259 OID 14727761)
-- Name: roles; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.roles (
    role_id smallint NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 206 (class 1259 OID 14727759)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE SEQUENCE public.roles_role_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_role_id_seq OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 3995 (class 0 OID 0)
-- Dependencies: 206
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- TOC entry 210 (class 1259 OID 14728092)
-- Name: show_movies; Type: VIEW; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE VIEW public.show_movies AS
 SELECT m.movie_id,
    m.title,
    g.name AS genre,
    m.number_in_stock,
    m.daily_rental_rate
   FROM (public.movies m
     LEFT JOIN public.genres g ON ((m.genre_id = g.genre_id)));


ALTER TABLE public.show_movies OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 209 (class 1259 OID 14727769)
-- Name: users; Type: TABLE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    role_id integer DEFAULT 2 NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    pass character varying(60) NOT NULL,
    activated character(36),
    created_on timestamp without time zone DEFAULT now() NOT NULL,
    last_login timestamp without time zone
);


ALTER TABLE public.users OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 208 (class 1259 OID 14727767)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: mfzjgctxhfnlxn
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO mfzjgctxhfnlxn;

--
-- TOC entry 3996 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 3833 (class 2604 OID 14727739)
-- Name: genres genre_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.genres ALTER COLUMN genre_id SET DEFAULT nextval('public.genres_genre_id_seq'::regclass);


--
-- TOC entry 3834 (class 2604 OID 14727747)
-- Name: movies movie_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies ALTER COLUMN movie_id SET DEFAULT nextval('public.movies_movie_id_seq'::regclass);


--
-- TOC entry 3836 (class 2604 OID 14727764)
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- TOC entry 3837 (class 2604 OID 14727772)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 3980 (class 0 OID 14727736)
-- Dependencies: 203
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.genres (genre_id, name) FROM stdin;
1	Action
2	Comedy
3	Thriller
4	Romance
\.


--
-- TOC entry 3982 (class 0 OID 14727744)
-- Dependencies: 205
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.movies (movie_id, title, number_in_stock, daily_rental_rate, genre_id) FROM stdin;
1	Terminator	6	2.50	1
2	Die Hard	5	1.50	1
3	Get Out	8	3.50	3
4	Trip to Italy	7	3.50	2
5	Wedding Crashers	6	2.50	2
6	Gone Girl	6	2.50	3
7	The Sixth Sense	6	2.50	3
8	The Avengers	6	2.50	1
9	Airplane	7	3.50	2
10	Dumb and Dumber	6	2.50	2
11	The Princes Bride	6	2.50	4
\.


--
-- TOC entry 3984 (class 0 OID 14727761)
-- Dependencies: 207
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.roles (role_id, role_name) FROM stdin;
1	Administrator
2	General Access
\.


--
-- TOC entry 3986 (class 0 OID 14727769)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: mfzjgctxhfnlxn
--

COPY public.users (user_id, role_id, first_name, last_name, email, pass, activated, created_on, last_login) FROM stdin;
1	2	Timmie	Lovel	tlovel0@craigslist.org	12345	\N	2021-02-11 22:26:18.872248	\N
2	2	Wilma	Iacomettii	wiacomettii1@statcounter.com	12345	\N	2021-02-11 22:26:18.872248	\N
3	2	Jackson	Spaunton	jspaunton2@irs.gov	12345	\N	2021-02-11 22:26:18.872248	\N
4	2	Ennis	Mabbott	emabbott3@123-reg.co.uk	12345	\N	2021-02-11 22:26:18.872248	\N
5	2	Reinold	Bater	rbater4@fastcompany.com	12345	\N	2021-02-11 22:26:18.872248	\N
6	2	Melicent	Dovinson	mdovinson5@google.cn	12345	\N	2021-02-11 22:26:18.872248	\N
7	2	Rozele	Beynke	rbeynke6@mysql.com	12345	\N	2021-02-11 22:26:18.872248	\N
8	2	Joshuah	Drover	jdrover7@illinois.edu	12345	\N	2021-02-11 22:26:18.872248	\N
9	2	Lia	Prazer	lprazer8@scribd.com	12345	\N	2021-02-11 22:26:18.872248	\N
10	2	Tiler	Harbach	tharbach9@marriott.com	12345	\N	2021-02-11 22:26:18.872248	\N
11	2	Jeremy	Threadgill	jthreadgilla@newyorker.com	12345	\N	2021-02-11 22:26:18.872248	\N
12	2	Monroe	Spriddle	mspriddleb@a8.net	12345	\N	2021-02-11 22:26:18.872248	\N
13	2	Harley	Cockrem	hcockremc@godaddy.com	12345	\N	2021-02-11 22:26:18.872248	\N
14	2	Luciano	Moorcroft	lmoorcroftd@ft.com	12345	\N	2021-02-11 22:26:18.872248	\N
15	2	Giacomo	Trout	gtroute@wsj.com	12345	\N	2021-02-11 22:26:18.872248	\N
16	2	Jarrod	Headland	jheadlandf@blogtalkradio.com	12345	\N	2021-02-11 22:26:18.872248	\N
17	2	Arthur	Jandl	ajandlg@europa.eu	12345	\N	2021-02-11 22:26:18.872248	\N
18	2	Edee	Wallice	ewalliceh@naver.com	12345	\N	2021-02-11 22:26:18.872248	\N
19	2	Rockey	MacFadyen	rmacfadyeni@bandcamp.com	12345	\N	2021-02-11 22:26:18.872248	\N
20	2	Hillie	Stilly	hstillyj@canalblog.com	12345	\N	2021-02-11 22:26:18.872248	\N
21	1	Test	User	test@test.com	$2b$10$95gBqfeKgkrs6iZM7.xkReRPdRL1rMhPg6r0kMRtoqeSXAZ0v0EJ2	\N	2021-02-11 22:34:17.703493	\N
\.


--
-- TOC entry 3997 (class 0 OID 0)
-- Dependencies: 202
-- Name: genres_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.genres_genre_id_seq', 4, true);


--
-- TOC entry 3998 (class 0 OID 0)
-- Dependencies: 204
-- Name: movies_movie_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.movies_movie_id_seq', 11, true);


--
-- TOC entry 3999 (class 0 OID 0)
-- Dependencies: 206
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- TOC entry 4000 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mfzjgctxhfnlxn
--

SELECT pg_catalog.setval('public.users_user_id_seq', 21, true);


--
-- TOC entry 3841 (class 2606 OID 14727741)
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (genre_id);


--
-- TOC entry 3843 (class 2606 OID 14727750)
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (movie_id);


--
-- TOC entry 3845 (class 2606 OID 14727766)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3847 (class 2606 OID 14727778)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3849 (class 2606 OID 14727776)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3850 (class 2606 OID 14727751)
-- Name: movies movies_genre_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_genre_id_fkey FOREIGN KEY (genre_id) REFERENCES public.genres(genre_id);


--
-- TOC entry 3851 (class 2606 OID 14727779)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: mfzjgctxhfnlxn
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- TOC entry 3992 (class 0 OID 0)
-- Dependencies: 648
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO mfzjgctxhfnlxn;


-- Completed on 2021-02-11 16:47:29 CST

--
-- PostgreSQL database dump complete
--

