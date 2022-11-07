const express = require("express");

const router = express.Router();
const repository = require("./postQuestions.repository");

router.post(`/:topicId`, async (req, res, next) => {
  try {
    const { description } = req.params;
    const { topicid } = req.params;

    const postedQuestion = await repository.postQuestion(description, topicid);

    return res.send(postedQuestion).status(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
