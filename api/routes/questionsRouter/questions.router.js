// const express = require("express");
// const router = express.Router();

// router.use("/", (req, res, next) => {
//   try {
//     throw new Error("Route is under maintenance");
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const questionsRepository = require("./questions.repository");

router.get("/", async (req, res, next) => {
  try {
    const questions = await questionsRepository.getQuestions();
    const response = { questions };
    return res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
