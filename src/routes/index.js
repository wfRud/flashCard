const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();

// ====GET====

router.get("/", (req, res) => {
  res.render("home", {
    // session: req.session.passport.user,
    user: req.user,
    path: req.path,
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("succes_msg", `You've logged out`);
  res.redirect("/");
});

// ====POST====

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "user/dashboard",
    failureRedirect: "login",
    failureFlash: true,
  })(req, res, next);
});

router.post("/register", (req, res) => {
  const { email, login, password, password2 } = req.body;

  let errors = [];
  const emailRe = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
  const loginRe = /^[\w.-]{0,10}[0-9a-zA-Z]$/gi;

  if (!email || !login || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (!emailRe.test(email)) {
    errors.push({ msg: "Email is not valid" });
  }

  if (!loginRe.test(login)) {
    errors.push({ msg: "Login is not valid" });
  }

  if (password !== password2) {
    errors.push({ msg: "Passwords dont match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password atleast 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors: errors,
      email: email,
      login: login,
      password: password,
      password2: password2,
    });
  } else {
    User.find({ $or: [{ email: email }, { login: login }] }).exec(
      (err, user) => {
        if (err) throw err;

        if (user.length != 0) {
          if (user[0].email === email) {
            errors.push({ msg: "email already registered" });
          }
          if (user[0].login === login) {
            errors.push({ msg: "login already registered" });
          }
          res.render("register", {
            errors: errors,
            email: email,
            login: login,
            password: password,
            password2: password2,
          });
        } else {
          const newUser = new User({
            email: email,
            login: login,
            password: password,
            // cards: [],
            // category: [],
          });

          bcrypt.hash(newUser.password, 10, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;

            //save user
            newUser
              .save()
              .then((value) => {
                req.flash("success_msg", "You've registered now");
                res.redirect("/login");
              })
              .catch((value) => console.log(value));
          });
        }
      }
    );
  }
});

module.exports = router;
