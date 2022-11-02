const express = require("express");
const app = express();
const cors = require("cors");
const get_db = require("./db");
const getTopicsRouter = require("./routes/topicRoute/topic.router");

app.use(cors());
app.use(express.json());

//routes
app.use("/topics", getTopicsRouter);
// app.use("/questions/:topicId", getQuestionRouter);
// app.use("/postquestion/:topicId", postQuestionRouter);
// app.use("/answers/:questionId", getAnswersRouter);
// app.use("/postanswer/:questionId", postAnswerRouter);
// app.use("/editquestion/:questionId", editQuestionRouter);
// app.use("/editanswer/:answerId", editAnswerRouter);
// app.use("/dashboard", dashboardRouter);
// //for authentication
// app.use("/users", userRouter);

app.get("/getData", async (req, res) => {
  try {
    const db = await get_db();
    const result = await db.query(`SELECT * FROM questions`);
    console.log(result.rows);
    res.json(result.rows);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = app;
