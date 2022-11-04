const express = require("express");
const router = express.Router();
const repository = require("./postAnswers.repository");

router.post("/postanswer/:questionId", async (req, res, next) => {
  try {
    const { questionid, description } = req.params;

    const postedAnswer = await repository.postAnswer(questionid, description);

    return res.send(postedAnswer).status(201);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
