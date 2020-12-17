const express = require("express");
const router = express.Router();
const Card = require("../models/Card");

router.get("/", async (req, res) => {
  try {
    const card = await Card.find();
    res.json(card);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const card = new Card({
    question: req.body.question,
    answer: req.body.answer,
    category: req.body.category,
  });
  try {
    const savedCard = await card.save();
    res.json(savedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const removedCard = await Card.remove({ _id: req.params.postId });
    res.json(removedCard);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
