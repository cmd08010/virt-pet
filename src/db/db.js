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
    hunger_level INT DEFAULT '3',
    tired_level INT DEFAULT '2',
    love_level INT DEFAULT '3',
    image VARCHAR DEFAULT 'https://i.imgur.com/Y0q6OiD.jpg?1',
    date_create TIMESTAMP default CURRENT_TIMESTAMP
  );

  INSERT INTO pet("name", hunger_level, tired_level,  love_level, image) VALUES ('Woodley', '3','10','5', 'https://i.imgur.com/Y0q6OiD.jpg?1');



  INSERT INTO pet("name", hunger_level, tired_level,  love_level, image) VALUES ('Bridges', '5','5','3', 'https://i.imgur.com/EzMJmh4.jpg?1');


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


const setLoveLevel = async id => {
  const SQL = `
  UPDATE pet SET love_level = love_level + 1 where id = $1
  returning *`
  const response = await client.query(SQL, [id])
  return response.rows[0]
}

const increaseTiredLevel = async id => {
  const SQL = ` UPDATE pet SET tired_level = tired_level + 1 where id = $1
  returning *`
  const response = await client.query(SQL, [id])

  return response.rows[0]
}
const decreaseTiredLevel = async id => {
  const SQL = ` UPDATE pet SET tired_level = tired_level - 1 where id = $1
  returning *`
  const response = await client.query(SQL, [id])

  return response.rows[0]
}

const decreaseHungerLevel = async id => {
  const SQL = ` UPDATE pet SET hunger_level = hunger_level - 1 where id = $1
  returning *
  `
  const response = await client.query(SQL, [id])

  return response.rows[0]
}
const increaseHungerLevel = async id => {
  const SQL = ` UPDATE pet SET hunger_level = hunger_level + 1 where id = $1
  returning *
  `
  const response = await client.query(SQL, [id])
  return response.rows[0]
}

const setName = async (id, name) => {
  const SQL = `UPDATE pet SET name = $2 WHERE id= $1 returning *`
  const response = await client.query(SQL, [id, name])

  return response.rows[0]
}

const setPet = async (name, image) => {
  const SQL = `INSERT INTO pet("name", image) VALUES ($1, $2)`
  const response = await client.query(SQL, (name, image))
  return response.rows[0]
}

const decreaseLoveLevel = async id => {
  const SQL = ` UPDATE pet SET love_level = love_level - 1 where id = $1
  returning *
  `
  const response = await client.query(SQL, [id])

  return response.rows[0]
}

module.exports = {
  sync,
  getPet,
  getPetById,
  decreaseHungerLevel,
  increaseHungerLevel,
  setLoveLevel,
  decreaseLoveLevel,
  increaseTiredLevel,
  decreaseTiredLevel,
  setName,
  setPet
}
