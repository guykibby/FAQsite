const express = require("express");
const dashboardRouter = express();

/**  router localhost:5000/dashboard - to fetch questions from questions table
 * and fetch answers from answers table,
 * it returns newPosts as { questions: newQuestions, answers: newAnswers };
 * */
dashboardRouter.get("/", async (req, res) => {
  try {
    res.json("Testing Dashboard Router");
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = dashboardRouter;
