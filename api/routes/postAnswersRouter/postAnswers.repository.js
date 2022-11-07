const get_db = require("../../db");

// export postAnswer function that adds a new POST to the answers table with a given questionId and description

module.exports = {
  postAnswer: async (questionId, description) => {
    const db = await get_db();
    const result = await db.query(
      `INSERT INTO answers (questionId, description)
      VALUES($1, $2)`,
      [questionId, description]
    );

    return result.rows;
  },
};
