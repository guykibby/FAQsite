const request = require("supertest");
// const path = require("path");
// const jestOpenAPI = require("jest-openapi").default;
const app = require("../../app");
const db = require("../../db");
const questionsRepository = require("./questions.repository");

// describe("GIVEN that the GET /questions/:topicId route exist", () => {
//   afterAll(() => {
//     db.end();
//   });

// describe("GIVEN that the GET /questions/:topicId route exist", () => {
//   async () => {
//     const db = await get_db();
//     afterAll(() => {
//       db.end();
//     });

//     test("GET /questions/:topicId returns a list of questions and a status 200", async () => {
//       const showQuestions = await repository.getQuestions();
//       const response = await request(app)
//         .get("api/questions/1")
//         .set("Accept", "application/json");

//       expect(response.status).toBe(200);
//       expect(response.body).toEqual(showQuestions);
//     });
//   };
// });

describe("GIVEN that the GET /questions/:topicId route exist", () => {
  afterAll(() => {
    db.end();
  });

  test("GET /questions/:topicId returns a list of questions and a status 200", async () => {
    const questions = await repository.getQuestions();
    const response = await request(app)
      .get("api/questions/1")
      .set("Accept", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(questions);
  });
});
