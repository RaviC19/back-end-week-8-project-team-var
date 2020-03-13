const express = require("express");
const router = express.Router();
const { saveUser, logInUser } = require("../models/contracts.js");

router.post("/", async (req, res) => {
  const body = req.body;
  const username = await saveUser(body);
  if (username) {
    return res.json({ payload: `${username} has been created` });
  }
  res.json({ success: false, message: "try again" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log({ username, password });
  const success = await logInUser({ username, password });
  if (success) {
    req.session.isLoggedIn = true;
    req.session.username = username;
    return res.json({ success: true, message: `${username} is logged in` });
  }
  return res.json({ success: false, message: `${username} is not logged in` });
});

router.get("/secret", (req, res) => {
  const { username, isLoggedIn } = req.session;
  if (isLoggedIn) {
    return res.json({ message: `logged in as ${username}` });
  }
  return res.json({ message: "not logged in" });
});

router.post("/logout", (req, res) => {
  req.session.destroy();
  return res.json({ success: true, message: "you are logged out" });
});

module.exports = router;
