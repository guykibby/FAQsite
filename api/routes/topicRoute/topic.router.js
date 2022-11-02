const express = require("express");
const router = express.Router();

router.get("/", () => {
  try {
    throw new Error("oh no");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
