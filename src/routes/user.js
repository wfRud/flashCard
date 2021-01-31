const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { ensureAuthenticated } = require("../config/auth");

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("user", {
    session: req.session.passport.user,
    user: req.user,
    path: req.path,
  });
});

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  res.render("dashboard", {
    session: req.session.passport.user,
    categories: req.user.userCategories,
    user: req.user,
    path: req.path,
  });
});

router.post("/dashboard", (req, res) => {
  const { id_card, questionContent, answerContent, cardCategories } = req.body;

  const card = {
    id_card: id_card,
    questionContent: questionContent,
    answerContent: answerContent,
    cardCategories: cardCategories,
  };

  User.findOneAndUpdate(
    { _id: req.user.id },
    { $push: { cards: card }, $addToSet: { userCategories: cardCategories } },
    { new: true },
    (err, user) => {
      if (err) throw err;

      res.send({
        card: card,
        msg: `flashCard has been added`,
      });
    }
  );
});

router.delete("/dashboard/:cardId", (req, res) => {
  try {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { cards: { id_card: Number(req.params.cardId) } } },
      { new: true },
      (err) => {
        if (err) throw err;

        res.send({
          msg: `flashCard has been removed`,
        });
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/dashboard/:cardId", (req, res) => {
  const { id_card, questionContent, answerContent, cardCategories } = req.body;

  try {
    User.findOneAndUpdate(
      { _id: req.user.id, "cards.id_card": id_card },
      {
        $set: {
          "cards.$.questionContent": questionContent,
          "cards.$.answerContent": answerContent,
          "cards.$.cardCategories": cardCategories,
        },
      },
      { new: true },
      (err) => {
        if (err) throw err;

        res.send({
          msg: `flashCard has been edited`,
        });
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
