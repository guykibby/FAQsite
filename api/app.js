const express = require("express");
const app = express();
const cors = require("cors");
const get_db = require("./db");
const getTopicsRouter = require("./routes/topicsRoute/topics.router");
const getQuestionsRouter = require("./routes/questionsRouter/questions.router");
const postQuestionsRouter = require("./routes/postQuestionsRouter/postQuestions.router");
const getAnswersRouter = require("./routes/answersRouter/answers.router");
const postAnswersRouter = require("./routes/postAnswersRouter/postAnswers.router");
const editQuestionsRouter = require("./routes/editQuestionsRouter/editQuestions.router");
const editAnswersRouter = require("./routes/editAnswersRouter/editAnswers.router");
const dashboardRouter = require("./routes/dashboardRouter/dashboard.router");
const usersRouter = require("./routes/usersRouter/users.router");

app.use(cors());
app.use(express.json());

//routes
app.use("/topics", getTopicsRouter);
app.use("/questions/:topicId", getQuestionsRouter);
app.use("/postquestion/:topicId", postQuestionsRouter);
app.use("/answers/:questionId", getAnswersRouter);
app.use("/postanswer/:questionId", postAnswersRouter);
app.use("/editquestion/:questionId", editQuestionsRouter);
app.use("/editanswer/:answerId", editAnswersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/users", usersRouter);

app.get("/getData", async (req, res) => {
  try {
    const db = await get_db();
    const result = await db.query(`SELECT * FROM questions`);
    console.log(result.rows);
    res.json(result.rows);
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = app;
