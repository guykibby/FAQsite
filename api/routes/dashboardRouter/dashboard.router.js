const express = require("express");
const dashboardRouter = express();
const getAllFaqs_crud = require("./dashboard.repository");

let crud = {};
(async () => (crud = await getAllFaqs_crud()))();

dashboardRouter.get("/", async (req, res) => {
  try {
    const result = await crud.getAllFaqs();
    console.log(result);
    res.json(result);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = dashboardRouter;
// router.use("/", (req, res, next) => {
//   try {
//     throw new Error("Route is under maintenance");
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;
