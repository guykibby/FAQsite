const express = require("express");
const router = express.Router();
const repository = require("./answers.repository");

router.use("/answers/:questionId", async (req, res, next) => {
  try {
    const allAnswers = await repository.getAnswers();
    res.json(allAnswers);
    // throw new Error("Route is under maintenance");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
