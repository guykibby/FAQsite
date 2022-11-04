const request = require("supertest");
const app = require("../../app");

describe("app", () => {
  test("POST /postanswer/:questionId creates a newly post answer for a question", async () => {
    const expectedStatus = 201;
    const body = {
      questionid: 3,
      description: "Lorem",
    };

    await request(app)
      .post(`/postanswer/${body.questionid}`)
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });
});
