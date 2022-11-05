const express = require("express");
const dashboardRouter = express();
const dashboardRepository = require("./dashboard.repository");

dashboardRouter.get("/", async (req, res, next) => {
  try {
    const result = await dashboardRepository.getAllFaqs();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = dashboardRouter;
