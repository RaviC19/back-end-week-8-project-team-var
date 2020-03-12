const { query } = require("../db/index.js");
const bcrypt = require("bcryptjs");

async function saveProvider(provider) {
  const {
    provider_id,
    provider_name,
    UKPRN,
    sort_code,
    account_number,
    main_contact,
    contracts
  } = provider;
  const newProvider = await query(
    `INSERT INTO provider (
            provider_id,
            provider_name,
            UKPRN,
            sort_code,
            account_number,
            main_contact,
            contracts) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      provider_id,
      provider_name,
      UKPRN,
      sort_code,
      account_number,
      main_contact,
      contracts
    ]
  );
  return newProvider;
}

async function savePerson(person) {
  const {
    person_id,
    first_name,
    last_name,
    phone_number,
    email_address,
    job_title,
    company_id
  } = person;
  console.log(person);
  const newPerson = await query(
    `INSERT INTO person (
              person_id,
              first_name,
              last_name,
              phone_number,
              email_address,
              job_title,
              company_id) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      person_id,
      first_name,
      last_name,
      phone_number,
      email_address,
      job_title,
      company_id
    ]
  );
  return newPerson;
}

async function saveContract(contract) {
  const {
    provider_name,
    contract_id,
    start_date,
    end_date,
    number_of_learners,
    skill_level,
    summary,
    complete,
    budget
  } = contract;
  const newContract = await query(
    `INSERT INTO contract (provider_name,
              contract_id,
              start_date,
              end_date,
              number_of_learners,
              skill_level,
              summary,
              complete,
              budget) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      provider_name,
      contract_id,
      start_date,
      end_date,
      number_of_learners,
      skill_level,
      summary,
      complete,
      budget
    ]
  );
  return newContract;
}

async function saveUser(user) {
  const { username, email, password } = user;
  const hash = await bcrypt.hash(password, 10);
  const newUser = await query(
    `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username`,
    [username, email, hash]
  );
  return newUser.rowCount > 0 ? newUser.rows[0].username : null;
}

async function logInUser(user) {
  const { username, password } = user;
  console.log({ user });
  const res = await query(`SELECT password FROM users WHERE username=$1`, [
    username
  ]);
  console.log(res.rows);
  const hash = res.rows[0].password;
  const success = await bcrypt.compare(password, hash);
  return success;
}

async function getProvider() {
  const data = await query(`SELECT * FROM provider`);
  return data.rows;
}

async function getProviderByName(name) {
  const provider = await query(
    `SELECT * FROM provider WHERE provider_name ILIKE '%' || $1 || '%'`,
    [name]
  );
  return provider.rows;
}

async function getPerson() {
  const data = await query(`SELECT * FROM person`);
  return data.rows;
}

async function getPersonByFirstName(firstName) {
  const person = await query(
    `SELECT * FROM person WHERE first_name ILIKE '%' || $1 || '%'`,
    [firstName]
  );
  return person.rows;
}

async function getContract() {
  const data = await query(`SELECT * FROM contract`);
  return data.rows;
}

async function getContractById(id) {
  const contracts = await query(`SELECT * FROM contract WHERE contract_id=$1`, [
    id
  ]);
  return contracts.rows;
}

async function deleteProvider(id) {
  const res = await query(
    `DELETE from provider WHERE id=$1 RETURNING provider_name`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].provider_name;
  } else {
    return undefined;
  }
}
async function deletePerson(id) {
  const res = await query(
    `DELETE from person WHERE id=$1 RETURNING first_name`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].first_name;
  } else {
    return undefined;
  }
}
async function deleteContract(id) {
  const res = await query(
    `DELETE from contract WHERE id=$1 RETURNING contract_id`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].contract_id;
  } else {
    return undefined;
  }
}

async function updateProvider(body, id) {
  const {
    provider_id,
    provider_name,
    UKPRN,
    sort_code,
    account_number,
    main_contact,
    contracts
  } = body;
  const res = await query(
    `UPDATE provider SET provider_id = COALESCE($1, provider_id), provider_name = COALESCE($2, provider_name), UKPRN = COALESCE($3, UKPRN), sort_code = COALESCE($4, sort_code), account_number = COALESCE($5, account_number), main_contact = COALESCE($6, main_contact), contracts = COALESCE($7, contracts) WHERE id = $8 RETURNING provider_name`,
    [
      provider_id,
      provider_name,
      UKPRN,
      sort_code,
      account_number,
      main_contact,
      contracts,
      id
    ]
  );
  return res;
}

async function updatePerson(body, id) {
  const {
    person_id,
    first_name,
    last_name,
    phone_number,
    email_address,
    job_title,
    company_id
  } = body;
  const res = await query(
    `UPDATE person SET person_id = COALESCE($1, person_id), first_name = COALESCE($2, first_name), last_name = COALESCE($3, last_name), phone_number = COALESCE($4, phone_number), email_address = COALESCE($5, email_address), job_title = COALESCE($6, job_title), company_id = COALESCE($7, company_id) WHERE id = $8 RETURNING first_name`,
    [
      person_id,
      first_name,
      last_name,
      phone_number,
      email_address,
      job_title,
      company_id,
      id
    ]
  );
  return res;
}

async function updateContract(body, id) {
  const {
    provider_name,
    contract_id,
    start_date,
    end_date,
    number_of_learners,
    skill_level,
    summary,
    complete,
    budget
  } = body;
  const res = await query(
    `UPDATE contract SET provider_name = COALESCE($1, provider_name) contract_id = COALESCE($2, contract_id), start_date = COALESCE($3, start_date), end_date = COALESCE($4, end_date), number_of_learners = COALESCE($5, number_of_learners), skill_level = COALESCE($6, skill_level), summary = COALESCE($7, summary), complete = COALESCE($8, complete), budget = COALESCE($9, budget) WHERE id = $10 RETURNING provider_name`,
    [
      provider_name,
      contract_id,
      start_date,
      end_date,
      number_of_learners,
      skill_level,
      summary,
      complete,
      budget,
      id
    ]
  );
  return res;
}

module.exports = {
  saveProvider,
  savePerson,
  saveContract,
  saveUser,
  logInUser,
  getProvider,
  getPerson,
  getContract,
  deleteProvider,
  deletePerson,
  deleteContract,
  updateProvider,
  updatePerson,
  updateContract,
  getProviderByName,
  getPersonByFirstName,
  getContractById
};
