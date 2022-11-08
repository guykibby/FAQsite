const express = require("express");
const router = express.Router();
const repository = require("./postAnswers.repository");

router.post("/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    const { description } = req.body;

    await repository.postAnswer(questionId, description);

    return res
      .status(201)
      .send({ message: "Post has been submitted successfully" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

module.exports = router;
