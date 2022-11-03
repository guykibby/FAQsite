const db = require("../../db");

const getQuestionsSQL = `
SELECT description
FROM questions`;

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
