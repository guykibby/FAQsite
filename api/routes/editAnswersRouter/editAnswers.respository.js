const get_db = require("../../db");
module.exports = {
  editAnswer: async (answerId, starFlag, isStarred, isReviewed) => {
    try {
      const db = await get_db();
      const answer = await db.query(`SELECT * FROM answers WHERE id = $1`, [
        answerId,
      ]);
      if (!answer.rows[0]) {
        return false;
      }
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
      return true;
    } catch (error) {
      throw Error(error);
    }
  },
  deleteAnswer: async (answerId) => {
    try {
      const db = await get_db();
      const answer = await db.query(`SELECT * FROM answers WHERE id = $1`, [
        answerId,
      ]);
      if (answer.rows[0]) {
        await db.query(`DELETE FROM answers WHERE id = $1`, [answerId]);
        return true;
      } else return false;
    } catch (error) {
      throw Error(error);
    }
  },
  getAnswer: async (answerId) => {
    try {
      const db = await get_db();
      const result = await db.query(`SELECT id, description, isstarred, isreviewed, questionid, userid FROM answers WHERE id = $1`, [
        answerId,
      ]);
      return result.rows[0];
    } catch (error) {
      throw Error(error);
    }
  },
};
