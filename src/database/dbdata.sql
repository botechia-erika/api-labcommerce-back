-- Active: 1701698893049@@127.0.0.1@3306
SELECT * FROM users;
CREATE TABLE posts (
id TEXT PRIMARY KEY NOT NULL UNIQUE,
creator_id TEXT NOT NULL ,
content TEXT NOT NULL,
likes INTEGER NOT NULL DEFAULT 0,
dislikes INTEGER NOT NULL DEFAULT 0 ,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY(creator_id) REFERENCES  users (id)
);
SELECT * FROM users;

CREATE TABLE likes_dislikes(
 user_id TEXT NOT NULL,
 posts_id TEXT NOT NULL,    
 like INTEGER NOT NULL default 0,
FOREIGN KEY (user_id) REFERENCES users (id),
FOREIGN KEY ( posts_id ) REFERENCES posts (id)
ON UPDATE CASCADE ON DELETE CASCADE
);




CREATE TABLE USERS (
    id TEXT PRIMARY KEY NOT NULL UNIQUE,
    fullName TEXT NOT NULL,
    nickname TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    role TEXT NOT NULL DEFAULT 'Normal',
    avatar TEXT NOT NULL DEFAULT "https://i.postimg.cc/cHP5gD7r/Pngtree-dinosaur-cartoon-avatar-frame-8462697-removebg-preview.png",
    keyProfile TEXT NOT NULL UNIQUE
);

DROP TABLE USERS;

INSERT INTO USERS(
    id,
    fullName,
    nickname,
    email,
    password,
    created_at,
    role ,
    avatar,
    keyProfile
) VALUES (
    "u001",
    "MARCELO REZENDE",
    "MARCELO-REZENDE",
    "marcelo@email.com",
    "marcelo123!",
     "2023-11-27T11:11:18.587Z",
     "Normal",
     "https://i.postimg.cc/cHP5gD7r/Pngtree-dinosaur-cartoon-avatar-frame-8462697-removebg-preview.png",
     "a2e8ca11-6fbb-4bc6-8894-f93fbf547a1c"
),
(
    "u002",
    "LAURA SILVA",
    "lau-silva",
    "lau@email.com",
        "L*u97!",
     "2023-11-27T11:11:19.587Z",
     "Normal",
     "https://i.postimg.cc/cHP5gD7r/Pngtree-dinosaur-cartoon-avatar-frame-8462697-removebg-preview.png",
     "d57d1690-8323-4233-bc4a-aba9b31cda39"
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
    "7ed684f2-8c72-425e-ae3b-864bcfc7f590",
    "HTML FUNDAMENTOS",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4jexwSIN0nY5w&usqp=CAU",
    117.00
),
(
    "7ed684f2-8c72-425e-ae3b-864bcfc7f591",
    "CSS FUNDAMENTOS",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4jexwSIN0nY5w&usqp=CAU",
    117.00
),
(
    "7ed684f2-8c72-425e-ae3b-864bcfc7f592",
    "JAVASCRIPT FUNDAMENTOS",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4jexwSIN0nY5w&usqp=CAU",
    117.00
),
(
    "7ed684f2-8c72-425e-ae3b-864bcfc7f593",
    "REACT FRONTEND",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4jexwSIN0nY5w&usqp=CAU",
    117.00
),
(
    "7ed684f2-8c72-425e-ae3b-864bcfc7f594",
    "REACT NATIVE FRONTEND",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4jexwSIN0nY5w&usqp=CAU",
    117.00
),
(
    "7ed684f2-8c72-425e-ae3b-864bcfc7f595",
    "NODE JS BACKEND",
    "cursos",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbkx19QbFAcx0xK7Y6vQPMo4
);


---
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

SELECT * FROM products WHERE description "cursos";

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
    owner_id TEXT NOT NULL,
    balance REAL DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id)
      ON UPDATE CASCADE
      ON DELETE CASCADE
);

INSERT INTO accounts (id, owner_id)
VALUES
	('a001', 'u001'),
	('a002', 'u002');


SELECT * FROM accounts;
-- SQLBook: Markup


SELECT * FROM users;

CREATE TABLE post_details(
    id TEXT PRIMARY KEY NOT NULL UNIQUE, 
    postImg  TEXT NOT NULL DEFAULT "https://i.postimg.cc/SKDqcQz5/postImg.png",
    stack TEXT NOT NULL DEFAULT "Generalidades",
    post_reference TEXT NOT NULL UNIQUE,
    FOREIGN KEY (post_reference) REFERENCES posts(id)
);
 DROP TABLE post_details;

SELECT * FROM posts;
SELECT * FROM post_details;
SELECT * FROM projects;
DROP TABLE projects;
CREATE TABLE projects (
            id TEXT PRIMARY KEY NOT NULL UNIQUE,
            projectName TEXT NOT NULL,
            author TEXT NOT NULL,
            stack TEXT NOT NULL,
            score INTEGER NOT NULL,
            description TEXT NOT NULL,  
            deploy  TEXT NOT NULL UNIQUE,
            repo TEXT NOT NULL UNIQUE,
            imgUrl TEXT NOT NULL DEFAULT "",
            likes INTEGER NOT NULL DEFAULT 0,
            dislikes INTEGER NOT NULL DEFAULT 0,
            createdAt TEXT NOT NULL ,
            updateAt TEXT NOT NULL
);

SELECT * FROM projects;
--2023-11-29T04:10:33.203Z

SELECT * products;