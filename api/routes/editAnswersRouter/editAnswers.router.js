const express = require("express");
const router = express.Router();
const Joi = require("joi");
const get_db = require("../../db");
const answerRepo = require("./editAnswers.respository");

//path parameters validation middleware
const pathParamValidationMiddleware = (schema) => (request, response, next) => {
  const { error } = schema.validate(request.params);
  if (error) {
    const { details } = error;
    const message = details.map((detail) => detail.message);
    return response.status(400).json({ message: message });
  } else {
    next();
  }
};

// path parameter schema
const pathParamsSchema = Joi.object().keys({
  answerId: Joi.number().integer().min(1).max(999999998),
});

router.put(
  "/:answerId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (request, response, next) => {
    try {
      const { answerId } = request.params;
      const db = await get_db();
      const answer = await db.query(`SELECT * FROM answers WHERE id = $1`, [
        answerId,
      ]);
      if (answer.rows[0]) {
        const { starFlag, isStarred, isReviewed } = request.body;
        await answerRepo.editAnswer(answerId, starFlag, isStarred, isReviewed);
        return response.status(200).json({ message: "Edit Successful" });
      }
      if (!answer.rows.length) {
        return response
          .status(404)
          .json({ message: "Invalid request. Answer does not exists" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:answerId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (request, response, next) => {
    try {
      const { answerId } = request.params;
      const db = await get_db();
      const answer = await db.query(`SELECT * FROM answers WHERE id = $1`, [
        answerId,
      ]);
      if (answer.rows[0]) {
        await answerRepo.deleteAnswer(answerId);
        return response.status(200).json({ message: "Answer Deleted" });
      }
      if (!answer.rows.length) {
        return response
          .status(404)
          .json({ message: "Invalid request. Answer does not exists" });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
