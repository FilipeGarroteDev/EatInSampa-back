PGDMP     
                 
    z         
   eatinsampa #   14.5 (Ubuntu 14.5-0ubuntu0.22.04.1) #   14.5 (Ubuntu 14.5-0ubuntu0.22.04.1) /    N           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            O           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            P           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            Q           1262    33885 
   eatinsampa    DATABASE     _   CREATE DATABASE eatinsampa WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE eatinsampa;
                postgres    false            �            1259    33910 
   categories    TABLE     e   CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(15) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    33909    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    210            R           0    0    categories_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
          public          postgres    false    209            �            1259    33956    ratings    TABLE     �   CREATE TABLE public.ratings (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "restaurantId" integer NOT NULL,
    rating integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.ratings;
       public         heap    postgres    false            �            1259    33955    ratings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ratings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.ratings_id_seq;
       public          postgres    false    216            S           0    0    ratings_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.ratings_id_seq OWNED BY public.ratings.id;
          public          postgres    false    215            �            1259    33919    restaurants    TABLE     �   CREATE TABLE public.restaurants (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    "categoryId" integer NOT NULL,
    "creatorId" integer NOT NULL
);
    DROP TABLE public.restaurants;
       public         heap    postgres    false            �            1259    33918    restaurants_id_seq    SEQUENCE     �   CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.restaurants_id_seq;
       public          postgres    false    212            T           0    0    restaurants_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;
          public          postgres    false    211            �            1259    33974    sessions    TABLE     r   CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL
);
    DROP TABLE public.sessions;
       public         heap    postgres    false            �            1259    33973    sessions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.sessions_id_seq;
       public          postgres    false    218            U           0    0    sessions_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;
          public          postgres    false    217            �            1259    33933    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    33932    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    214            V           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    213            �           2604    33913    categories id    DEFAULT     n   ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 <   ALTER TABLE public.categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    33959 
   ratings id    DEFAULT     h   ALTER TABLE ONLY public.ratings ALTER COLUMN id SET DEFAULT nextval('public.ratings_id_seq'::regclass);
 9   ALTER TABLE public.ratings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    33922    restaurants id    DEFAULT     p   ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);
 =   ALTER TABLE public.restaurants ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    33977    sessions id    DEFAULT     j   ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);
 :   ALTER TABLE public.sessions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    33936    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            C          0    33910 
   categories 
   TABLE DATA           .   COPY public.categories (id, name) FROM stdin;
    public          postgres    false    210   b3       I          0    33956    ratings 
   TABLE DATA           G   COPY public.ratings (id, "userId", "restaurantId", rating) FROM stdin;
    public          postgres    false    216   �3       E          0    33919    restaurants 
   TABLE DATA           J   COPY public.restaurants (id, name, "categoryId", "creatorId") FROM stdin;
    public          postgres    false    212   D4       K          0    33974    sessions 
   TABLE DATA           7   COPY public.sessions (id, "userId", token) FROM stdin;
    public          postgres    false    218   �4       G          0    33933    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    214   6       W           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 8, true);
          public          postgres    false    209            X           0    0    ratings_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.ratings_id_seq', 46, true);
          public          postgres    false    215            Y           0    0    restaurants_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.restaurants_id_seq', 24, true);
          public          postgres    false    211            Z           0    0    sessions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.sessions_id_seq', 23, true);
          public          postgres    false    217            [           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 9, true);
          public          postgres    false    213            �           2606    33917    categories categories_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);
 H   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_name_key;
       public            postgres    false    210            �           2606    33915    categories categories_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    210            �           2606    33962    ratings ratings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT ratings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.ratings DROP CONSTRAINT ratings_pkey;
       public            postgres    false    216            �           2606    33926     restaurants restaurants_name_key 
   CONSTRAINT     [   ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_name_key UNIQUE (name);
 J   ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_name_key;
       public            postgres    false    212            �           2606    33924    restaurants restaurants_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.restaurants DROP CONSTRAINT restaurants_pkey;
       public            postgres    false    212            �           2606    33981    sessions sessions_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_pkey;
       public            postgres    false    218            �           2606    33983    sessions sessions_token_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);
 E   ALTER TABLE ONLY public.sessions DROP CONSTRAINT sessions_token_key;
       public            postgres    false    218            �           2606    33942    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    214            �           2606    33940    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    33968 !   ratings ratings_restaurantId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES public.restaurants(id);
 M   ALTER TABLE ONLY public.ratings DROP CONSTRAINT "ratings_restaurantId_fkey";
       public          postgres    false    212    3240    216            �           2606    33963    ratings ratings_userId_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.ratings
    ADD CONSTRAINT "ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 G   ALTER TABLE ONLY public.ratings DROP CONSTRAINT "ratings_userId_fkey";
       public          postgres    false    214    3244    216            �           2606    33927 '   restaurants restaurants_categoryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT "restaurants_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id);
 S   ALTER TABLE ONLY public.restaurants DROP CONSTRAINT "restaurants_categoryId_fkey";
       public          postgres    false    210    3236    212            �           2606    33984    sessions sessions_userId_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);
 I   ALTER TABLE ONLY public.sessions DROP CONSTRAINT "sessions_userId_fkey";
       public          postgres    false    214    218    3244            C   U   x�3�Ȭ�J�2��I�K�H-�2�t*J,��I�,J�2�t��+I�-�/:�(/5�ˌ�7��8��˜�9�(�ނ�%?H��qqq �l      I   m   x����@C�3.&ʰ��K��#��8<�ln�F�+ME�e��h[*V�_�T\{��-)?h�x�m���"�\�ϕ캯�e���D-DK::$�Uf��-�����k      E      x��=� ��?��Fj[p�t�����E�Dy	-��q���0�>̀��_Lz����a�1S�%d�������ڷ53\�����'8e\����������Gߤ�j�&��}З���*���$$�      K   6  x���ˎ�0 ��5��F*(.�*��Mp2		��V�P�釽�̬Ͽ�r�LX
y���ȈC0:H�	z��d:Z �ġ�W�1�2�~��ft���1��p ,�����O\rD�MO�E���hv�9��Bb��������%?pA�b�n�]�0�$A�U|@1��PTSFT��	CF�lZ��X�w1�]�.��� �.II�/�& ��A�wT0"ޟ�YC�GT��fǟE�u��૚�}����]i�|/�k�y���������Ը�#�$
���>2���jO�jq��מh��&�@_�9T�ߩ(����a      G   �   x�M�Mo�0 ��s�;8w�+72��&��`���J*t�EE������}n/����bJ˩,l[�ig�zdKe���9�iR�\�������z�uz�38R�%������}��~5FI��pc�7u�p��n���6%���{����w�։�
��U=`3�篚�8�zc./��(���vB��hӺ��6o�عw����i{�LsB�<zT�     