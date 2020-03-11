const { query } = require("../index.js");

async function dropUser() {
  try {
    const res = await query(`DROP TABLE users`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropUser();
