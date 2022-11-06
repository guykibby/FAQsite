const express = require("express");
const router = express.Router();
const questionsRepository = require("./questions.repository");

router.get("/:topicId", async (req, res, next) => {
  try {
    const { topicId } = req.params;
    const response = await questionsRepository.getQuestions(topicId);
    return res.json(response).status(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
