create TABLE IF NOT EXISTS person(
	name VARCHAR(255) PRIMARY KEY,
	password VARCHAR(255) NOT NULL
)

CREATE TABLE IF NOT EXISTS posts(
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255) NOT NULL,
	date_created timestamp(3) NOT NULL,
	body TEXT,
  content_type VARCHAR(255) NOT NULL,
	FOREIGN KEY (user_name) REFERENCES person (name)
)

SELECT name FROM person WHERE name = $1 LIMIT 1

INSERT INTO person (name, password) VALUES ($1, $2)

SELECT user_name, date_created, body FROM posts

UPDATE posts SET body = $1, content_type = $2 WHERE id = $3 AND user_name = $4

DELETE FROM posts WHERE id = $1 RETURNING *
