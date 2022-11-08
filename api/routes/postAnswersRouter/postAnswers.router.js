const express = require("express");
const router = express.Router();
const repository = require("./postAnswers.repository");

router.post("/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const { description } = req.body;

    console.log("description", description);
    console.log(questionId);
    console.log("req.body", req.body);

    const postedAnswer = await repository.postAnswer(questionId, description);

    console.log(postedAnswer);

    return res
      .status(201)
      .send({ message: "Post has been submitted successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
