DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(500) NOT NULL,
    rupees bigint,
    profilePic int,
    xp bigint,
    xpTarget bigint,
    level int
);