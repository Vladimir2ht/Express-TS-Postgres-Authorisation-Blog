import { Client } from "pg";

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  user: 'blog',
  password: 'pass23',
});

(async () => {
  await client.connect();

  await client.query(`CREATE TABLE IF NOT EXISTS person(
    name VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
  )`);
  
  await client.query(`CREATE TABLE IF NOT EXISTS posts(
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    date_created timestamp(3) NOT NULL,
    body TEXT,
    content_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_name) REFERENCES person (name)
  )`);
  
  console.log('db work');
  
  // await client.end();
})()


export default client;