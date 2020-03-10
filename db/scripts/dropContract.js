const { query } = require("../index.js");

async function dropContract() {
  try {
    const res = await query(`DROP TABLE contract`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropContract();
