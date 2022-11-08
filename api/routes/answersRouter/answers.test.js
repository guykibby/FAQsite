const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const answersRepository = require("./answers.repository");

describe("GIVEN that the GET /answers route exist", () => {
  afterAll(async () => {
    const db = await get_db();

    db.end();
  });

  test("GET /answers/:questionId should return all answers with status code of 200", async () => {
    const expectedData = await answersRepository.getAnswers(1);
    const response = await request(app).get("/answers/1");
    expect(response.body.rows).toEqual(expectedData.rows);
    expect(response.status).toBe(200);
  });
  test("GET /answers/:questionId should return all answers with status code of 200", async () => {
    const expectedData = await answersRepository.getAnswers(2);
    const response = await request(app).get("/answers/2");
    expect(response.body.rows).toEqual(expectedData.rows);
    expect(response.status).toBe(200);
  });

  it("if GET /answers/:wrongId should return 400", async () => {
    const response = await request(app).get("/answers/abd");
    expect((response) => {
      expect(response.body[0]).toBe('"questionId" must be a number');
    });
    expect(response.status).toBe(400);
  });

  it("if GET /answers/:wrongId should return 400", async () => {
    const response = await request(app).get("/answers/0");
    expect((response) => {
      expect(response.body[0]).toBe(
        '"questionId" must be greater than or equal to 1'
      );
    });
    expect(response.status).toBe(400);
  });

  it("if GET /answers/:wrongId should return 404", async () => {
    const response = await request(app).get("/answers/600");
    expect((response) => {
      expect(response.body.error).toBe("ID not found");
    });
    expect(response.status).toEqual(404);
  });
});
