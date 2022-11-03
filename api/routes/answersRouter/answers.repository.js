const db = require("../../db");

module.exports = {
  getAnwers: async () => {
    try {
      const getAnswers = await db.query(
        `SELECT questions.id, questions.description, answers.questionid,   answers.description, answers.createdon
        FROM questions 
        LEFT JOIN answers 
        ON questions.id = answers.questionid ORDER BY answers.createdon DESC`
      );
      return getAnswers.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
