--
-- PostgreSQL database dump
--

-- Dumped from database version 13.16 (Debian 13.16-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Ubuntu 16.4-0ubuntu0.24.04.2)

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: clients; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.clients (
    id_client integer NOT NULL,
    id_type integer,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    phone character varying(20),
    address text
);


--
-- Name: clients_id_client_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.clients_id_client_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: clients_id_client_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.clients_id_client_seq OWNED BY public.clients.id_client;


--
-- Name: kardex; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.kardex (
    id_kardex integer NOT NULL,
    id_product integer,
    id_type_transaction integer,
    id_transaction integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


--
-- Name: kardex_id_kardex_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.kardex_id_kardex_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: kardex_id_kardex_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.kardex_id_kardex_seq OWNED BY public.kardex.id_kardex;


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    id_product integer NOT NULL,
    description character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0
);


--
-- Name: products_id_product_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_id_product_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_id_product_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_id_product_seq OWNED BY public.products.id_product;


--
-- Name: sales; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sales (
    id_sale integer NOT NULL,
    id_client integer,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: sales_detail; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sales_detail (
    id_sale_detail integer NOT NULL,
    id_sale integer,
    id_product integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


--
-- Name: sales_detail_id_sale_detail_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sales_detail_id_sale_detail_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sales_detail_id_sale_detail_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sales_detail_id_sale_detail_seq OWNED BY public.sales_detail.id_sale_detail;


--
-- Name: sales_id_sale_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sales_id_sale_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sales_id_sale_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sales_id_sale_seq OWNED BY public.sales.id_sale;


--
-- Name: type_id; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.type_id (
    id_type integer NOT NULL,
    description character varying(50) NOT NULL
);


--
-- Name: type_id_id_type_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.type_id_id_type_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: type_id_id_type_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.type_id_id_type_seq OWNED BY public.type_id.id_type;


--
-- Name: type_transaction; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.type_transaction (
    id_type_transaction integer NOT NULL,
    description character varying(50) NOT NULL
);


--
-- Name: type_transaction_id_type_transaction_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.type_transaction_id_type_transaction_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: type_transaction_id_type_transaction_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.type_transaction_id_type_transaction_seq OWNED BY public.type_transaction.id_type_transaction;


--
-- Name: clients id_client; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients ALTER COLUMN id_client SET DEFAULT nextval('public.clients_id_client_seq'::regclass);


--
-- Name: kardex id_kardex; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kardex ALTER COLUMN id_kardex SET DEFAULT nextval('public.kardex_id_kardex_seq'::regclass);


--
-- Name: products id_product; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN id_product SET DEFAULT nextval('public.products_id_product_seq'::regclass);


--
-- Name: sales id_sale; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales ALTER COLUMN id_sale SET DEFAULT nextval('public.sales_id_sale_seq'::regclass);


--
-- Name: sales_detail id_sale_detail; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_detail ALTER COLUMN id_sale_detail SET DEFAULT nextval('public.sales_detail_id_sale_detail_seq'::regclass);


--
-- Name: type_id id_type; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_id ALTER COLUMN id_type SET DEFAULT nextval('public.type_id_id_type_seq'::regclass);


--
-- Name: type_transaction id_type_transaction; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_transaction ALTER COLUMN id_type_transaction SET DEFAULT nextval('public.type_transaction_id_type_transaction_seq'::regclass);


--
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id_client);


--
-- Name: kardex kardex_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kardex
    ADD CONSTRAINT kardex_pkey PRIMARY KEY (id_kardex);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id_product);


--
-- Name: sales_detail sales_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_detail
    ADD CONSTRAINT sales_detail_pkey PRIMARY KEY (id_sale_detail);


--
-- Name: sales sales_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_pkey PRIMARY KEY (id_sale);


--
-- Name: type_id type_id_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_id
    ADD CONSTRAINT type_id_pkey PRIMARY KEY (id_type);


--
-- Name: type_transaction type_transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_transaction
    ADD CONSTRAINT type_transaction_pkey PRIMARY KEY (id_type_transaction);


--
-- Name: clients clients_id_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_id_type_fkey FOREIGN KEY (id_type) REFERENCES public.type_id(id_type);


--
-- Name: kardex kardex_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.kardex
    ADD CONSTRAINT kardex_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: sales_detail sales_detail_id_product_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_detail
    ADD CONSTRAINT sales_detail_id_product_fkey FOREIGN KEY (id_product) REFERENCES public.products(id_product);


--
-- Name: sales_detail sales_detail_id_sale_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales_detail
    ADD CONSTRAINT sales_detail_id_sale_fkey FOREIGN KEY (id_sale) REFERENCES public.sales(id_sale);


--
-- Name: sales sales_id_client_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sales
    ADD CONSTRAINT sales_id_client_fkey FOREIGN KEY (id_client) REFERENCES public.clients(id_client);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

