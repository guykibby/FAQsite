const get_db = require("../../db");

/*const postQuestionSql = `INSERT INTO questions (description,topicid) values 
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
*/
module.exports = {
  postQuestion: async (description, topicid) => {
    const db = await get_db();
    const result = await db.query(
      `INSERT INTO answers (description, topicid)
        VALUES($1, $2)`,
      [description, topicid]
    );

    return result.rows;
  },
};
