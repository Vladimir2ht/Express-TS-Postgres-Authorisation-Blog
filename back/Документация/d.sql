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

SELECT * FROM posts

INSERT INTO person (name, password) VALUES ($1, $2)

UPDATE posts x SET body = $1, content_type = $2 FROM posts y WHERE x.id = $3 AND x.id = y.id AND x.user_name = $4 RETURNING y.content_type, y.body

DELETE FROM posts WHERE id = $1 RETURNING *
