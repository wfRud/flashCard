const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

// // login handle
// router.get("/login", (req, res) => {
//   res.render("login");
// });
// router.get("/register", (req, res) => {
//   res.render("register");
// });

// // register handle
// router.post("/register", (req, res) => {
//   console.log(__dirname + "\\public");
// });
// router.post("/login", (req, res) => {});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

module.exports = router;
