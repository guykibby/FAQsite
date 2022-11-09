const get_db = require("../../db");

module.exports = {
  getNewQuestions: async () => {
    try {
      const db = await get_db();
      const newQuestions =
        await db.query(`SELECT q.id, q.description, q.isStarred, q.isReviewed, q.topicId
        FROM questions q
        WHERE q.isReviewed = FALSE`);
      return newQuestions.rows;
    } catch (err) {
      return err.message;
    }
  },
  getNewAnswers: async () => {
    try {
      const db = await get_db();
      const newAnswers =
        await db.query(`SELECT a.id, q.id AS questionId, q.description AS questionDescription, a.description AS answerDescription, a.isStarred, a.isReviewed
        FROM answers a
        INNER JOIN questions q ON a.questionid = q.id
        WHERE a.isReviewed = FALSE`);
      return newAnswers.rows;
    } catch (err) {
      return err.message;
    }
  },
};
