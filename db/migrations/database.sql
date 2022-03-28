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

DROP TABLE IF EXISTS habits;

CREATE TABLE habits
(
    id serial PRIMARY KEY,
    user_id int,
    FOREIGN KEY(user_id) REFERENCES users(id),
    title VARCHAR(250),
    frequency int,
    timestampOfLastTrack timestamp,
    streak int,
    category VARCHAR(250)
)