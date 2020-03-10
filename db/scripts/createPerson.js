const { query } = require("../index.js");

async function createPersonTable() {
  try {
    const res = await query(`
    CREATE TABLE IF NOT EXISTS person (
      id SERIAL,
      person_id INTEGER,
      first_name TEXT,
      last_name TEXT,
      phone_number INTEGER, 
      email_address TEXT, 
      job_title TEXT,
      company_id INTEGER,
      PRIMARY KEY(id)
    )
    `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createPersonTable();
