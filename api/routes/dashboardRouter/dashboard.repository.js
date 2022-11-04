const get_db = require("../../db");

module.exports = {
  getAllFaqs: async () => {
    try {
      const db = await get_db();
      const faqs = await db.query(`
          SELECT q.id,q.description,q.createdon,json_agg(a.description) AS answers
          FROM questions q
          INNER JOIN answers a ON q.id = a.questionid  
          WHERE a.isReviewed = FALSE
          GROUP BY q.id,q.description,q.createdon
          ORDER BY q.createdon DESC`);
      return faqs.rows;
    } catch (err) {
      return err.message;
    }
  },
};
