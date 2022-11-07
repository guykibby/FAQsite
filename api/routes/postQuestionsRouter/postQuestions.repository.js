const get_db = require("../../db");

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
