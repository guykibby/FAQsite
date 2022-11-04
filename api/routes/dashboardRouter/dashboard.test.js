const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const dashboardRepository = require("./dashboard.repository");

describe("FAQ Dashboard API", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });
  test("GET /dashboard should return all Q&As with status code of 200", async () => {
    const expectedData = await dashboardRepository.getAllFaqs();
    const response = await request(app).get("/dashboard");
    expect(response.body).toEqual(expectedData);
    expect(response.status).toBe(200);
  });
});
