import { Client } from "pg";

const client = new Client({
  // host: 'localhost',
  host: '192.168.99.100',
  // port: 50783,
  port: 5432,
  database: 'postgres',
  user: 'admin',
  password: 'root',
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
  
  console.log('db_work');
  
  // await client.end();
})()


export default client;