const get_db = require("../../db");

module.exports = {
  getNewQuestions: async () => {
    try {
      const db = await get_db();
      const newQuestions =
        await db.query(`SELECT q.id AS questionId,  q.description AS questionDesc, q.isStarred, q.isReviewed, q.topicId
        FROM questions q
        WHERE q.isReviewed = FALSE`);
      console.log("AAAA : " + JSON.stringify(newQuestions.rows));
      return newQuestions.rows;
    } catch (err) {
      return err.message;
    }
  },
  getNewAnswers: async () => {
    try {
      const db = await get_db();
      const newAnswers =
        await db.query(`SELECT q.id AS questionId, a.id as answerId,  q.description AS questionDesc, a.description AS answerDesc, a.isStarred, a.isReviewed
        FROM answers a
        INNER JOIN questions q ON a.questionid = q.id
        WHERE a.isReviewed = FALSE`);
      return newAnswers.rows;
    } catch (err) {
      return err.message;
    }
  },
};
