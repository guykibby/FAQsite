const db = require("../../db");

const postQuestionSql = `INSERT INTO questions (id,description,topicid) values 
(34, 'What is SQL?',1)`;

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
