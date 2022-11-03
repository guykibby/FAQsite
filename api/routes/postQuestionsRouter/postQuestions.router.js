const express = require("express");
const router = express.Router();

router.use("/", (req, res, next) => {
  try {
    throw new Error("Route is under maintenance");
  } catch (err) {
    next(err);
  }
});
//olivers route

module.exports = router;
