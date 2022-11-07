const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const questionsRepository = require("./questions.repository");

describe("GIVEN that the GET /questions route exists", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("GET /questions/1 returns questions by topic and a status 200", async () => {
    const getQuestions = await questionsRepository.getQuestions(1);

    const response = await request(app)
      .get("/questions/1")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(getQuestions);
  });
});
