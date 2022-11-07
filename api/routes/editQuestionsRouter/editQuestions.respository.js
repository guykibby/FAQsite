const get_db = require("../../db");
module.exports = {
  editQuestion: async (questionId, starFlag, isStarred, isReviewed) => {
    try {
      const db = await get_db();
      if (starFlag) {
        await db.query(
          `UPDATE questions 
           SET isStarred = $1
           Where id = $2`,
          [isStarred, questionId]
        );
      } else {
        await db.query(
          `UPDATE questions 
           SET isReviewed = $1
           Where id = $2`,
          [isReviewed, questionId]
        );
      }
    } catch (error) {
      throw Error(error);
    }
  },
  deleteQuestion: async (questionId) => {
    try {
      const db = await get_db();
      await db.query(`
      DELETE FROM answers WHERE questionid = $1`, [questionId]);
      await db.query(`DELETE FROM questions WHERE id = $1`, [questionId]);
    } catch (error) {
      throw Error(error);
    }
  },
};
