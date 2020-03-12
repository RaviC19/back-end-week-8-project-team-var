function authenticate(req, res, next) {
  if (req.isLoggedIn) {
    return next();
  }
  return res.json({ success: false, message: "not logged in" });
}

module.exports = { authenticate };
