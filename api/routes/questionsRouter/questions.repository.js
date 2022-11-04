const db = require("../../db");

const getQuestionsSQL = `
SELECT id AS questionId, description, topicId
    FROM questions;`;

const getQuestions = {
  getQuestions: async () => {
    try {
      const result = await db.query(getQuestionsSQL);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};

module.exports = getQuestions;

// const get_db = require("../../db");
// module.exports = {
//   getQuestions: async (topicId) => {
//     const { topicId } = request.params;
//     const db = await get_db(topicId);
//     const getQuestions = await db.query(
//       `SELECT id AS questionId, description, topicId
//      FROM questions;`
//     );
//     return getQuestions.rows;
//   },
// };
