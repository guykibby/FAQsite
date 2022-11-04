const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const repository = require("./answers.repository");

describe("GIVEN that the GET /answers route exist", () => {
  afterAll(async () => {
    const db = await get_db();

    db.end();
  });

  test("GET /answers/:questionId for answers with 200", async () => {
    const showAnswers = await repository.getAnswers();

    const response = await request(app)
      .get("/api/answers")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(showAnswers);
  });
});
