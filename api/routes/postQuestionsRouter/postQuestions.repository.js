const db = require("../../db");

const postQuestionSql = `INSERT INTO questions (description,topicid) values 
($1, $2)`;

module.exports = {
  postQuestion: async () => {
    try {
      const result = await db.query(postQuestionSql);
      return result.rows;
    } catch (error) {
      throw Error(error);
    }
  },
};
