const { query } = require("../index.js");

async function dropProvider() {
  try {
    const res = await query(`DROP TABLE provider`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

dropProvider();
