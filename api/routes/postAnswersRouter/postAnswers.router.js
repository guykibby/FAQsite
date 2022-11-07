const express = require("express");
const router = express.Router();
const repository = require("./postAnswers.repository");

router.post("/:questionId", async (req, res, next) => {
  try {
    const { questionid } = req.params;
    const { description } = req.body;

    console.log(description);
    console.log(req.body);

    const postedAnswer = await repository.postAnswer(questionid, description);

    return res.send(postedAnswer).status(201);
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
