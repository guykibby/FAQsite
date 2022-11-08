const express = require("express");
const dashboardRouter = express();
const { getNewQuestions, getNewAnswers } = require("./dashboard.repository");

dashboardRouter.get("/", async (req, res) => {
  try {
    const newQuestions = await getNewQuestions();
    const newAnswers = await getNewAnswers();
    const newPosts = [newQuestions, newAnswers];
    res.json(newPosts);
  } catch (err) {
    console.log("AAA");
    return res.status(500).json(err.message);
  }
});

module.exports = dashboardRouter;
