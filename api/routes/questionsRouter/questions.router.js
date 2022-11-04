const express = require("express");
const router = express.Router();
const questionsRepository = require("./questions.repository");

router.get("/", async (req, res, next) => {
  try {
    const { topicId } = request.params;
    const response = await questionsRepository.getQuestions(topicId);
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
