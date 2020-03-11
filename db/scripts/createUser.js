const { query } = require("../index");

async function createUser() {
  try {
    const res = await query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT,
      password TEXT,
      email TEXT
  )
  `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createUser();
