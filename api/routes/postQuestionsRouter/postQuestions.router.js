const express = require("express");
const router = express.Router();
const postQuestion = require("./postQuestions.repository");

router.post("/postquestion/:topicId", async (req, res, next) => {
  try {
    const question = await postQuestion();

    throw new Error("Route is under maintenance");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
