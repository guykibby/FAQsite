const request = require("supertest");
const app = require("./app");

describe("Q&A API", () => {
  test("GET /getData should return list of questions and answers with status code of 200", async () => {
    const response = await request(app).get("/getData");
    expect(response.body).toEqual([
      {
        id: 1,
        question_description: "what is string interpolation?",
      },
      {
        id: 2,
        question_description: "what is HTML?",
      },
    ]);
    expect(response.status).toBe(200);
  });
});