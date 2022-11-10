const express = require("express");
const dashboardRouter = express();
const { getNewQuestions, getNewAnswers } = require("./dashboard.repository");

/**  router localhost:5000/dashboard - to fetch questions from questions table
 * and fetch answers from answers table,
 * it returns newPosts as { questions: newQuestions, answers: newAnswers }
 * */
/** note : Answers tble alone not going to exists with out question table,
 * reference this error from DB: ""
 * "ERROR:  update or delete on table "questions" violates
 *   foreign key constraint "answers_questionid_fkey" on table "answers"
 *   DETAIL:  Key (id)=(1) is still referenced from table "answers"."
 */
dashboardRouter.get("/", async (req, res) => {
  try {
    const newQuestions = await getNewQuestions();
    const newAnswers = await getNewAnswers();
    const newPosts = { questions: newQuestions, answers: newAnswers };
    res.json(newPosts);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

module.exports = dashboardRouter;
