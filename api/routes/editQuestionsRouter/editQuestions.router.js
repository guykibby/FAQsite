const express = require("express");
const router = express.Router();
const Joi = require("joi");
const get_db = require("../../db");
const questionsRepo = require("./editQuestions.respository");

// path parameter validation middleware
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
  questionId: Joi.number().integer().min(1).max(999999998),
});

router.put(
  "/:questionId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (request, response, next) => {
    try {
      const { questionId } = request.params;
      const { starFlag, isStarred, isReviewed } = request.body;
      const db = await get_db();
      const question = await db.query(`SELECT * FROM questions WHERE id = $1`, [
        questionId,
      ]);
      if (question.rows[0]) {
        await questionsRepo.editQuestion(
          questionId,
          starFlag,
          isStarred,
          isReviewed
        );
        return response.status(200).json({ message: "Edit Successful" });
      }
      if (!question.rows.length) {
        return response
          .status(404)
          .json({ message: "Invalid request. Question does not exists" });
      }
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:questionId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (request, response, next) => {
    try {
      const { questionId } = request.params;
      const db = await get_db();
      const question = await db.query(`SELECT * FROM questions WHERE id = $1`, [
        questionId,
      ]);
      if (question.rows[0]) {
        await questionsRepo.deleteQuestion(questionId);
        return response.status(200).json({ message: "Question Deleted" });
      }
      if (!question.rows.length) {
        return response
          .status(404)
          .json({ message: "Invalid request. Question does not exists" });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
