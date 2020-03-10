const { query } = require("../db/index.js");

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
    `INSERT INTO contract (
              contract_id,
              start_date,
              end_date,
              number_of_learners,
              skill_level,
              summary,
              complete,
              budget) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
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

async function getProvider() {
  const data = await query(`SELECT * FROM provider`);
  return data.rows;
}
async function getPerson() {
  const data = await query(`SELECT * FROM person`);
  return data.rows;
}
async function getContract() {
  const data = await query(`SELECT * FROM contract`);
  return data.rows;
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
    `DELETE from person WHERE id=$1 RETURNING provider_name`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].provider_name;
  } else {
    return undefined;
  }
}
async function deleteContract(id) {
  const res = await query(
    `DELETE from contract WHERE id=$1 RETURNING provider_name`,
    [id]
  );
  if (res.rowCount) {
    return res.rows[0].provider_name;
  } else {
    return undefined;
  }
}

module.exports = {
  saveProvider,
  savePerson,
  saveContract,
  getProvider,
  getPerson,
  getContract,
  deleteProvider,
  deletePerson,
  deleteContract
};
