const get_db = require("../../db");

module.exports = {
  getQuestions: async (topicId) => {
    const db = await get_db();
    const getQuestions = await db.query(
      `SELECT questions.id, description, topics.name 
      FROM questions
      JOIN topics
      ON questions.topicId = topics.id
      WHERE topicId = ${topicId}`
    );

    return getQuestions.rows;
  },
};
