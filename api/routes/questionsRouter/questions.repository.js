const get_db = require("../../db");

module.exports = {
  getQuestions: async (topicId) => {
    const db = await get_db();
    const getQuestions = await db.query(
      `SELECT id, description FROM questions WHERE topicId = ${topicId}`
    );
    return getQuestions.rows;
  },
};
