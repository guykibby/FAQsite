const get_db = require("../../db");
module.exports = {
  editAnswer: async (answerId, starFlag, isStarred, isReviewed) => {
    try {
      const db = await get_db();
      if (starFlag) {
        await db.query(
          `UPDATE answers 
           SET isStarred = $1
           WHERE id = $2`,
          [isStarred, answerId]
        );
      } else {
        await db.query(
          `UPDATE answers 
           SET isReviewed = $1
           WHERE id = $2`,
          [isReviewed, answerId]
        );
      }
    } catch (error) {
      throw Error(error);
    }
  },
  deleteAnswer: async (answerId) => {
    try {
      const db = await get_db();
      await db.query(`DELETE FROM answers WHERE id = $1`, [answerId]);
    } catch (error) {
      throw Error(error);
    }
  },
};
