const get_db = require("../../db");

async function getAllFaqs_crud() {
  const db = await get_db();

  return {
    async getAllFaqs() {
      console.log("ALLL");
      const faqs = await db.query(`
      SELECT q.id,q.description,q.createdon ::Date,json_agg(a.description) AS answers
      FROM questions q
      INNER JOIN answers a ON q.id = a.questionid  
      WHERE a.isReviewed = FALSE
      GROUP BY q.id,q.description,q.createdon
      ORDER BY q.createdon DESC`);
      return faqs.rows;
    },
  };
}

module.exports = getAllFaqs_crud;
