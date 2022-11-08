const express = require("express");

const router = express.Router();
const repository = require("./postQuestions.repository");

router.post(`/:topicId`, async (req, res, next) => {
  try {
    const { description } = req.body;
    const { topicId } = req.params;

    const postedQuestion = await repository.postQuestion(description, topicId);

    return res
      .status(201)
      .send({ message: "Question has been Posted" })
      .send(postedQuestion);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
