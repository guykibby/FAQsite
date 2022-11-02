const express = require("express");
const app = express();
const cors = require("cors");
const get_db = require("./db");
app.use(cors());
app.use(express.json());

//change capital D to small
app.get("/getData", async (req, res) => {
  try {
    const db = await get_db();
    const result = await db.query(`SELECT * FROM questions`);
    console.log(result.rows);
    res.json(result.rows);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ error: e.message });
  }
});

module.exports = app;
