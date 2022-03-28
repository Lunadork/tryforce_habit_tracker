DROP TABLE IF EXISTS habits;

CREATE TABLE habits
(
    id serial PRIMARY KEY,
    user_id int FOREIGN KEY,
    title VARCHAR(250),
    frequency int,
    timestampOfLastTrack timestamp,
    streak int,
    category VARCHAR(250)
)