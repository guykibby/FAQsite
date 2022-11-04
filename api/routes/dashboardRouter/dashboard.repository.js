const get_db = require("../../db");

module.exports = {
  getAllFaqs: async () => {
    try {
      const db = await get_db();
      const faqs = await db.query(`
          SELECT q.id,q.description,q.createdon ::Date,json_agg(a.description) AS answers
          FROM questions q
          INNER JOIN answers a ON q.id = a.questionid  
          WHERE a.isReviewed = FALSE
          GROUP BY q.id,q.description,q.createdon
          ORDER BY q.createdon DESC`);
      if (faqs.rows.length > 0) return faqs.rows;
      else return "No new Q&As. All Q&As already been reviewed.";
    } catch (err) {
      return err.message;
    }
  },
};
