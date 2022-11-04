const get_db = require("../../db");

// export postAnswer function that adds a new POST to the answers table with a given questionId and description

module.exports = {
  postAnswer: async (questionId, description) => {
    const db = await get_db();
    const result = await db.query(
      `INSERT INTO answers (questionid, description)
      VALUES($1, $2)`,
      [questionId, description]
    );

    return result.rows;
  },

  // gets an updated list of all the answers related to the given questionId
  // ordered based on the most recently posted answers
  getNewAnswers: async (questionId, description) => {
    const db = await get_db();
    const result = await db.query(
      `SELECT 
            answers.id AS answer_id, 
            answers.description, 
            answers.isstarred, 
            answers.isreviewed, 
            answers.createdon, 
            questionid 
        FROM answers
        ORDER BY answers.createdon DESC`,
      [questionId, description]
    );

    return result.rows;
  },
};
