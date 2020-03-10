const { query } = require("../index.js");

async function dropPerson() {
  try {
    const res = await query(`DROP TABLE person`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropPerson();
