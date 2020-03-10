const { query } = require("../index.js");

async function createProviderTable() {
  try {
    const res = await query(`
  CREATE TABLE IF NOT EXISTS provider (
    id SERIAL,
    provider_id INTEGER,
    provider_name TEXT,
    UKPRN INTEGER,
    sort_code INTEGER, 
    account_number INTEGER, 
    main_contact TEXT,
    contracts TEXT,
    PRIMARY KEY(id)
  )
  `);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

createProviderTable();
