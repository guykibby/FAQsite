const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const repository = require("./answers.repository");

describe("GIVEN that the GET /answers route exist", () => {
  afterAll(async () => {
    const db = await get_db();

    db.end();
  });

  test("GET /:questionId for answers with 200", async () => {
    const showAllAnswers = await repository.getAnswers();

    const response = await request(app)
      .get("/answers/1")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(showAllAnswers);
  });
});
