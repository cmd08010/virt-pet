const pg = require("pg")
const { Client } = pg
const uuid = require("uuid")
const client = new Client(
  process.env.DATABASE_URL || "postgres://localhost/virt_pet"
)

client.connect()

const sync = async () => {
  const SQL = `    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS pet;
  CREATE TABLE pet
  (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    image VARCHAR DEFAULT 'https://i.imgur.com/Y0q6OiD.jpg?1',
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );

  INSERT INTO pet("name", image) VALUES ('Woodley', 'https://i.imgur.com/Y0q6OiD.jpg?1');



  INSERT INTO pet("name", image) VALUES ('Bridges', 'https://i.imgur.com/EzMJmh4.jpg?1');


  `
  await client.query(SQL)
}

const getPet = async () => {
  const SQL = `
  SELECT * FROM pet`
  const response = await client.query(SQL)
  return response.rows

}

const getPetById = async (id) => {
  const SQL = `SELECT * FROM pet WHERE id=$1`
  const response = await client.query(SQL, [id])
  return response.rows
}

const setName = async (id, name) => {
  const SQL = `UPDATE pet SET name = $2 WHERE id= $1 returning *`
  const response = await client.query(SQL, [id, name])

  return response.rows[0]
}

const setPet = async (name, image) => {
  console.log(name, image)
  const SQL = `INSERT INTO pet("name", image) VALUES ($1, $2)`
  const response = await client.query(SQL, [name, image])
  console.log(response.rows)
  return response.rows
}


module.exports = {
  sync,
  getPet,
  getPetById,
  setName,
  setPet
}
