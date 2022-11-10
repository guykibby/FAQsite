const get_db = require("../../db");

module.exports = {
  getQuestions: async (topicId) => {
    const db = await get_db();
    const getQuestions = await db.query(
      `SELECT questions.id, description, topicId, isStarred, isReviewed, topics.name  
      FROM questions
      JOIN topics
      ON questions.topicId = topics.id
      WHERE topicId = ${topicId}
      ORDER BY questions.createdon DESC`
    );

    return getQuestions.rows;
  },

  checkTopicId: async (topicId) => {
    const db = await get_db();
    const checkTopicId = await db.query(`SELECT id FROM topics WHERE id = $1`, [
      topicId,
    ]);

    // if (checkTopicId.rows.length === 0) {
    //   return res.status(404).json({ error: "ID not found" });
    // }

    return checkTopicId;
  },
};
