const express = require("express");
const router = express.Router();
const repository = require("./answers.repository");
const Joi = require("joi");
const get_db = require("../../db");

// path parameters validation middleware
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

router.get(
  "/:questionId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (req, res, next) => {
    try {
      const db = await get_db();
      const { questionId } = req.params;

      const checkQuestionId = await db.query(
        `SELECT id FROM questions WHERE id = $1`,
        [questionId]
      );

      if (!checkQuestionId[0]) {
        return res.json({ message: "ID not found" }).status(404);
      }

      const allAnswers = await repository.getAnswers(questionId);
      if (allAnswers) {
        return res.json(allAnswers).status(200);
      }
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
