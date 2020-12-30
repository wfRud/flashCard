const express = require("express");
const router = express.Router();

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

// logout
router.get("/logout", (req, res) => {});

module.exports = router;
