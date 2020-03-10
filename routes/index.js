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
  deleteContract
} = require("../models/contracts.js");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json({ message: "AEB Homepage" });
});

router.get("/provider", async (req, res) => {
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

router.get("/person", async (req, res) => {
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

router.get("/contract", async (req, res) => {
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
      .send(`You have deleted the person ${name} with the id of ${id}`);
  } else {
    res.status(406).send(`There are no persons with that id to delete`);
  }
});

module.exports = router;
