const express = require("express");
const router = express.Router();
const repository = require("./answers.repository");

router.get("/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;

    const allAnswers = await repository.getAnswers(questionId);

    return res.json(allAnswers).status(200);
    // throw new Error("Route is under maintenance");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
