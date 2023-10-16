-- Active: 1696932624147@@127.0.0.1@3306




CREATE TABLE USERS (
    ID TEXT PRIMARY KEY NOT NULL UNIQUE,
    NAME TEXT NOT NULL,
    NICKNAME TEXT NOT NULL UNIQUE,
    EMAIL TEXT NOT NULL UNIQUE,
    PASSWORD TEXT NOT NULL,
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE USERS;

INSERT INTO USERS(
    ID,
    NAME,
    NICKNAME,
    EMAIL,
    PASSWORD
) VALUES (
    "u001",
    "MARCELO REZENDE",
    "MARCELO-REZENDE",
    "marcelo@email.com",
    "marcelo123"
),
(
    "u002",
    "LAURA SILVA",
    "lau-silva",
    "lau@email.com",
    "lau123"
);

SELECT
    *
FROM
    USERS
WHERE
    NAME LIKE '%BELTRANO%';

SELECT
    *
FROM
    USERS
WHERE
    NAME LIKE '%ERIKA%';

SELECT
    *
FROM
    USERS
WHERE
    NAME LIKE '%FULANO%';

SELECT
    *
FROM
    USERS;

SELECT
    ID,
    CREATED_AT
FROM
    USERS
ORDER BY
    ID DESC;

CREATE TABLE PRODUCTS(
    ID TEXT PRIMARY KEY NOT NULL UNIQUE,
    NAME TEXT NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    IMAGE_URL TEXT NOT NULL,
    PRICE REAL NOT NULL
);

INSERT INTO PRODUCTS(
    ID,
    NAME,
    DESCRIPTION,
    IMAGE_URL,
    PRICE
) VALUES (
    "P001",
    "PREMIUM-MUSIC",
    "MENSAL",
    "https://cms-fym.imgix.net/free_apple_music_362cfbaf74.png?auto=compress,format&fit=fillmax&ch=Save-Data&w=1600&max-h=1600",
    7.00
),
(
    "P002",
    "PREMIUM-PLANNER",
    "MENSAL",
    "data:image/jpeg;base64,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",
    7.00
),
(
    "P003",
    "PREMIUM-TASKS",
    "MENSAL",
    "https://cms-fym.imgix.net/how_much_is_spotify_premium_e81b7f47ff.png?auto=compress,format&fit=fillmax&ch=Save-Data&w=1600&max-h=1600",
    8.00
);

SELECT
    *
FROM
    PRODUCTS;


SELECT
    *
FROM
    PRODUCTS_PURCHASES;

DROP TABLE USERS_TASKS;

CREATE TABLE classrooms(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL
);


CREATE TABLE students (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    classroom_id TEXT NOT NULL,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

-- selecionar buyer todos os pagamentos com id associado e lista de produtos

SELECT * FROM purchases WHERE id = PG001
JOIN products 
WHERE products.id=product_id;

-- AULA INTRO SQL
CREATE TABLE IF NOT EXISTS books(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL ,
    author TEXT NOT NULL ,
    page_count INTEGER ,
    price REAL NOT NULL
);
DROP TABLE books;
SELECT * FROM books;




INSERT INTO books(
    id,
    name,
    author,
    page_count,
    price
) VALUES(
    "3012928",
    "O Quinze",
    "Raquel de Quiroz", 
    208,
    24.9
);

INSERT INTO books(
    id,
    name,
    author,
    page_count,
    price
) VALUES(
    "8503012928",
    "O Quinze",
    "Raquel de Queiroz", 
    208,
    24.95
);




INSERT INTO books(
    id,
    name,
    author,
    price
) VALUES(
    "8578897239",
    "Dom Casmurro",
    "Machado de Assis", 
    46.77
);

UPDATE books 
SET page_count = 463
WHERE id="8503012928"

-- TASKS

CREATE TABLE tasks (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    CREATED_AT DATETIME DEFAULT CURRENT_TIMESTAMP,
    status INTEGER NOT NULL DEFAULT 0 
);
SELECT * FROM tasks;
DROP TABLE  tasks;

CREATE TABLE user_tasks (
    user_id TEXT NOT NULL,
    task_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON UPDATE CASCADE ON DELETE CASCADE
);

SELECT * FROM user_tasks;
DROP TABLE user_tasks;

INSERT INTO user_tasks  (
    user_id, task_id 
) VALUES (
    "f003",
    "t001"
),(
    "f003",
     "t002"
  ),
( 
"f003",
    "t003"
);

INSERT INTO tasks  (
    id, title, description 
) VALUES(
    "t001",
    "criar header",
    "criar header para frontend unico labecommerce, labeedit e labebooks"
),(
     "t002",
    "criar footer",
    "criar footer para frontend unico labecommerce, labeedit e labebooks"
),
( 
    "t003",
    "criar componentes do labecommerce",
    "criar componentes para frontend unico labecommerce, labeedit e labebooks"
);

-- Conecte o arquivo pratica-aprofundamento-sql.db com a extensão MySQL e ative a conexão aqui

-- Deletar tabela
DROP TABLE pokemons;

-- Criar tabela
CREATE TABLE pokemons (
    id INTEGER PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL,
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    special_attack INTEGER NOT NULL,
    special_defense INTEGER NOT NULL,
    speed INTEGER NOT NULL
);

-- Popular tabela
INSERT INTO pokemons (
    id,
    name,
    type,
    hp,
    attack,
    defense,
    special_attack,
    special_defense,
    speed
)
VALUES 
    (1, "bulbasaur", "grass", 45, 49, 49, 65, 65, 45),
    (2, "ivysaur", "grass", 60, 62, 63, 80, 80, 60),
    (3, "venusaur", "grass", 80, 82, 83, 100, 100, 80),
    (4, "charmander", "fire", 39, 52, 43, 60, 50, 65),
    (5, "charmeleon", "fire", 58, 64, 58, 80, 65, 80),
    (6, "charizard", "fire", 78, 84, 78, 109, 85, 100),
    (7, "squirtle", "water", 44, 48, 65, 50, 64, 43),
    (8, "wartortle", "water", 59, 63, 80, 65, 80, 58),
    (9, "blastoise", "water", 79, 83, 100, 85, 105, 78);

-- Buscar todos os pokemons
SELECT * FROM pokemons;
SELECT name, attack, special_attack FROM pokemons
WHERE attack >= 60  AND special_attack >= 60;
-- Práticas

SELECT * FROM pokemons WHERE ATTACK >= 60;
SELECT name FROM pokemons WHERE name LIKE "%saur";

CREATE TABLE accounts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    owner TEXT NOT NULL,
    balance REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO accounts (id, owner, balance, category)
VALUEs(
        "a001",
        "Ciclano",
       10000,
        "Gold"
),
(
       "a002",
        "Astrodev",
        500000,
        "Black"
),
(
         "a003",
         "Fulana",
       20000,
        "Platinum"
),
    (
         "a004",
         "wilsom",
       10500,
        "Ouro"
),
    (
         "a0058801bd24-3ce0-42fc-9fd6-be112afdfc35",
        "Melissa",
        10900,
         "Ouro"
   )
;


SELECT * FROM accounts WHERE owner LIKE "%a%"


SELECT name, defense FROM pokemons ORDER BY defense DESC;

SELECT * from pokemons GROUP BY TYPE;

SELECT * FROM accounts LIMIT 3;


CREATE TABLE classrooms(
   id TEXT PRIMARY KEY UNIQUE NOT NULL,
   name TEXT UNIQUE NOT NULL
);
INSERT INTO classrooms (id, name)
VALUES ('c001', 'A');

SELECT * FROM classrooms;
CREATE TABLE students(
   id TEXT PRIMARY KEY UNIQUE NOT NULL,
   user_id TEXT NOT NULL,
   classroom_id TEXT NOT NULL,
   FOREIGN KEY (classroom_id) REFERENCES classroom(id)
   FOREIGN KEY (user_id) REFERENCES users(id)
);
INSERT INTO students(id, user_id, classroom_id)
VALUES ('s001', 'f001', 'c001');
DROP TABLE students;
SELECT * FROM students;


SELECT 
    *
FROM students
INNER JOIN users
ON user_id = users.id;

SELECT *
FROM users
RIGHT JOIN students
ON users.id = students.user_id;
CREATE TABLE phones(
   id TEXT PRIMARY KEY UNIQUE NOT NULL,
   user_id TEXT  NOT NULL,
   phone_number TEXT NOT NULL,
   FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM phones WHERE user.id = "u001";
INSERT INTO phones (id, user_id, phone_number ) VALUES 
    ("p001",  "u001" ,"559399999393"),
     ('p002', 'u001', '559399991561')
  ;
INSERT INTO phones (id, user_id, phone_number ) VALUES 
    ("p004",  "u003" ,"5593865135131")
  ;
SELECT * FROM phones;
DROP TABLE phones;
INSERT INTO phones (id, user_id, phone_number)VALUES
("p003",  "u001" ,"5593865131");
SELECT 
    email,
    name
FROM users
INNER JOIN phones
ON phones.user_id = users.id;


CREATE TABLE products_purchases(
    purchases_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL
);

DROP TABLE products_purchases;

INSERT INTO products_purchases(
    purchases_id, product_id, quantity
)VALUES(
    "PG001",
    "DFE-3388",
    7
);

CREATE TABLE PURCHASES(
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
      paid  INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE PURCHASES;
SELECT * FROM purchases;
INSERT INTO PURCHASES(
    id,
    buyer,
    total_price,
    paid
) VALUES (
    "PG001",
    "400.032.000-21",
    10500,
    1
), (
    "PG002",
    "268.809.688-56",
    2700,
    1
);

SELECT
    purchases.id,
    purchases.buyer,
    purchases.created_at,
    purchases.total_price, 
    name,
    email
FROM
    users
    INNER JOIN PURCHASES
    ON buyer = users.id;
UPDATE purchases
SET total_price = 5400
WHERE id = "PG002";
SELECT
    *
FROM
    PRODUCTS_PURCHASES;

SELECT
    PRODUCTS.NAME,
    *
FROM
    PURCHASES
    INNER JOIN PRODUCTS_PURCHASES
    ON PURCHASES.ID = PRODUCTS_PURCHASES.PURCHASE_ID
    INNER JOIN PRODUCTS
    ON PRODUCTS_PURCHASES.PRODUCT_ID = PRODUCTS.ID
WHERE
    PURCHASE_ID="PG001";

-- SQLBook: Code
SELECT * FROM products_purchases 
INNER JOIN products
ON products_purchases.product_id = products.id
INNER JOIN purchases
ON products_purchases.purchases_id = "PG001"

--pratica relacoes 2

CREATE TABLE follows(
     follower_id TEXT NOT NULL,
     followed_id TEXT NOT NULL,
     FOREIGN KEY (follower_id) REFERENCES users(id),
     FOREIGN KEY (followed_id) REFERENCES  users(id)
     
);

SELECT * FROM follows;

--A SEGUE B E C
-- B SEGUE A
-- C NÃP SEGUE NINGUEM

INSERT INTO follows (
     follower_id, followed_id
)
VALUES
("f001", "f002"),
("f001","f003"),
("f002","f001");

SELECT * FROM users
INNER JOIN follows
ON follows.follower_id = users.id;

SELECT 
* 
FROM users
LEFT JOIN follows
ON follows.followed_id = users.id
;

--- PRATICA 3.2

--REMOVER AMBIGUIDADES
SELECT 
users.id as usersId,
users.name,
users.email,
users.password,
users.created_at as createdAt,
follows.follower_id AS followerId,
follows.followed_id AS followedId,
userFollowed.name AS nameFollowed
FROM users
INNER JOIN follows
ON follows.followed_id = users.id
INNER JOIN users AS userFollowed
INNER JOIN users AS followedId
ON follows.followed_id = users.id
;





--RELACOES SQL2 PROJETO


CREATE TABLE purchases_products (
     purchase_id TEXT NOT NULL,
     product_id TEXT NOT NULL,
     quantity INTEGER NOT NULL,
     FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON UPDATE CASCADE ON DELETE CASCADE,
     FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
)

SELECT * FROM purchases_products;
CREATE TABLE bands (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE songs (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    band_id TEXT NOT NULL,
    FOREIGN KEY (band_id) REFERENCES bands (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
);

DROP TABLE SONGS;
DROP TABLE BANDS;
-- Bandas já foram inseridas
INSERT INTO bands (id, name)
VALUES
    ('b001', 'Evanescence'),
    ('b002', 'LS Jack'),
    ('b003', 'Blink-182');
SELECT * FROM bands;
-- Músicas já foram inseridas
INSERT INTO songs (id, name, band_id)
VALUES
    ('s001', 'Bring me to life', 'b001'),
    ('s002', 'Carla', 'b002'),
    ('s003', 'Uma carta', 'b002'),
    ('s004', 'All the small things', 'b003'),
    ('s005', 'I miss you', 'b003');

SELECT * FROM songs;

-- CONSULTA PARA BANDAS E "USERS" COM INFO DETAIL DE BANDS EM CONSULTA UNICA 
       SELECT * FROM bands 
       INNER JOIN users
       ON bands.id = users.id
       WHERE bands.name LIKE "TAN BIONICA";

ALTER TABLE users ADD COLUMN avatar_img TEXT NOT NULL DEFAULT "https://i.postimg.cc/ZYx00WwP/img-Avatar.webp";
ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT "Normal";

SELECT * FROM users;

SELECT * FROM purchases;

SELECT * FROM products_purchases;

drop table accounts;

CREATE TABLE accounts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    owner TEXT NOT NULL,
    balance REAL DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    update_at TEXT NOT NULL DEFAULT ( DATETIME()),
    FOREIGN KEY (owner) REFERENCES users (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

INSERT INTO accounts (id, owner_id)
VALUES
	('a001', 'u001'),
	('a002', 'u002');


SELECT * FROM products;
-- SQLBook: Markup



SELECT * FROM users 
INNER JOIN bands
ON bands.name = users.name
 where users.role = "Bands";


 SELECT * FROM purchases;
select * from purchases_products;
on id = purchase_id;


INSERT INTO purchases VALUES(
    "PG001",
    "u001",     
    16500,
    0,
)

INSERT INTO purchases_products VALUES(
    "PG001",
    "u001",     
    6
)