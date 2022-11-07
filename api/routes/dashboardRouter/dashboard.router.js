const express = require("express");
const dashboardRouter = express();
const dashboardRepository = require("./dashboard.repository");

dashboardRouter.get("/", async (req, res, next) => {
  try {
    const newQuestions = await dashboardRepository.getNewQuestions();
    const newAnswers = await dashboardRepository.getNewAnswers();
    const newPosts = [newQuestions, newAnswers];
    console.log("AAAAA : " + JSON.stringify(newPosts));
    res.json(newPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = dashboardRouter;
