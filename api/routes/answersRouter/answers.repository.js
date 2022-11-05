const get_db = require("../../db");

module.exports = {
  getAnswers: async (questionId) => {
    const db = await get_db();
    const getAnswers = await db.query(
      `SELECT  answers.id AS answerid, questions.createdon, questions.description AS questionDescription, questions.createdon AS questioncreated, answers.questionId, answers.description AS answerDescription, answers.createdon
      FROM questions 
      LEFT JOIN answers 
      ON questions.id = answers.questionid 
      WHERE questions.id = ${questionId}
      ORDER BY answers.createdon DESC`
    );
    return getAnswers.rows;
  },
};
