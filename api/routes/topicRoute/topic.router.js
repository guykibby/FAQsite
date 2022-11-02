const express = require("express");
const router = express.Router();

router.get("/", () => {
  try {
    throw new Error("oops");
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
