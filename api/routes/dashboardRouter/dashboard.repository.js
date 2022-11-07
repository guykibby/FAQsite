const get_db = require("../../db");

module.exports = {
  getNewQuestions: async () => {
    try {
      const db = await get_db();
      // const faqs = await db.query(`
      // SELECT q.id,q.description,json_build_object(
      //   'answers', json_agg(a.description)
      //   )FROM questions q
      // INNER JOIN answers a ON q.id = a.questionid
      // WHERE a.isReviewed = FALSE
      // GROUP BY q.id,q.description,q.createdon
      // ORDER BY q.id`);
      const newQuestions =
        await db.query(`SELECT q.id AS questionId,  q.description AS questionDesc, q.isStarred, q.isReviewed
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
      // const faqs = await db.query(`
      // SELECT q.id,q.description,json_build_object(
      //   'answers', json_agg(a.description)
      //   )FROM questions q
      // INNER JOIN answers a ON q.id = a.questionid
      // WHERE a.isReviewed = FALSE
      // GROUP BY q.id,q.description,q.createdon
      // ORDER BY q.id`);
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
