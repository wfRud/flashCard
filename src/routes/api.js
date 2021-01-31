const express = require("express");
const router = express.Router();


const { ensureAuthenticated } = require("../config/auth");

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  const userData = {
    login: req.user.login,
    cards: req.user.cards,
    categories: req.user.categories,
  };
  res.send(userData);
});

module.exports = router;
