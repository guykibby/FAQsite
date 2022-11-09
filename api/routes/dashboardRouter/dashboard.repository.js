const get_db = require("../../db");

module.exports = {
  /*  to fetch questions which are waiting for review by instructor  */
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
};
