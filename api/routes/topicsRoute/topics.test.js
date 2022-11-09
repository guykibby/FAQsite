const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const repository = require("./topics.repository");

describe("GET /topics route", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("return status 200 and an array of topics from the DB", async () => {
    const expectedResponseData = await repository.getTopics();
    const response = await request(app)
      .get("/topics")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponseData);
  });
});