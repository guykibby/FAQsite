const express = require("express");
const router = express.Router();
const Joi = require("joi");
const repository = require("./postAnswers.repository");

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
  questionId: Joi.number().integer().min(1).max(32),
});

router.post(
  "/:questionId",
  pathParamValidationMiddleware(pathParamsSchema),
  async (req, res, next) => {
    try {
      const { questionId } = req.params;
      const { description } = req.body;

      // check if description is string, not empty string, no body (undefined)

      // checkId() if result.rows.length === 0, then id not found 404

      if (
        typeof description !== "string" ||
        description === "" ||
        description === undefined ||
        description === null
      ) {
        return res.status(400).json({ error: "Bad Request" });
      }

      await repository.postAnswer(questionId, description);

      const checkId = await repository.checkQuestionId(questionId);

      if (checkId.length === 0) {
        return res.status(404).json({ error: "Bad request" });
      }

      return res
        .status(201)
        .send({ message: "Post has been submitted successfully" });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

module.exports = router;
