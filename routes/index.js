const express = require("express");
const router = express.Router();
const {
  saveProvider,
  savePerson,
  saveContract,
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
} = require("../models/contracts.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "AEB Homepage" });
});

router.get("/provider", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const providerName = await getProviderByName(name);
    res.json(providerName);
    return;
  }
  const provider = await getProvider();
  res.json(provider);
});

router.post("/provider", (req, res) => {
  const { body } = req;
  saveProvider(body);
  res.send(`You have saved a new provider`);
});

router.delete("/provider/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deleteProvider(id);
  if (name) {
    res
      .status(200)
      .send(`You have deleted the provider ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no providers with that id to delete`);
  }
});

router.patch("/provider/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await updateProvider(body, id);
  res.send({
    success: true,
    message: `Provider with id ${id} has been updated`
  });
});

router.get("/person", async (req, res) => {
  const { first } = req.query;
  if (first) {
    const firstName = await getPersonByFirstName(first);
    res.json(firstName);
    return;
  }
  const person = await getPerson();
  res.json(person);
});

router.post("/person", (req, res) => {
  const { body } = req;
  savePerson(body);
  res.send(`You have saved a new person`);
});

router.delete("/person/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deletePerson(id);
  if (name) {
    res
      .status(200)
      .send(`You have deleted the person ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no persons with that id to delete`);
  }
});

router.patch("/person/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await updatePerson(body, id);
  res.send({
    success: true,
    message: `Person with id ${id} has been updated`
  });
});

router.get("/contract", async (req, res) => {
  const { id } = req.query;
  if (id) {
    const contractId = await getContractById(id);
    res.json(contractId);
    return;
  }
  const contract = await getContract();
  res.json(contract);
});

router.post("/contract", (req, res) => {
  const { body } = req;
  saveContract(body);
  res.send(`You have saved a new contract`);
});

router.delete("/contract/:id", async (req, res) => {
  const { id } = req.params;
  const name = await deleteContract(id);
  if (name) {
    res
      .status(200)
      .send(`You have deleted the contract ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no contracts with that id to delete`);
  }
});

router.patch("/contract/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  await updateContract(body, id);
  res.send({
    success: true,
    message: `Contract with id ${id} has been updated`
  });
});

module.exports = router;
