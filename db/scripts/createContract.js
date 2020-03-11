const { query } = require("../index.js");

async function createContractTable() {
  try {
    const res = await query(`
    CREATE TABLE IF NOT EXISTS contract (
      id SERIAL,
      contract_id INTEGER NOT NULL UNIQUE,
      start_date TEXT,
      end_date TEXT,
      number_of_learners INTEGER, 
      skill_level TEXT, 
      summary TEXT,
      complete TEXT,
      budget INTEGER,
      PRIMARY KEY(id)
    )
    `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createContractTable();
