const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");

describe("app", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("POST /postQuestion/:topicid inserts a new question into the questions table", async () => {
    const db = await get_db();

    const body = {
      description: "test",
      topicId: 3,
    };

    const expectedStatus = 201;

    await request(app)
      .post(`/postquestion/${body.topicId}`)
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toStrictEqual({
          message: "Question has been Posted",
        });
      });

    const updatedQuestionsList = await db.query(
      `SELECT 
      questions.id AS id, 
      questions.description, 
      questions.isstarred, 
      questions.isreviewed, 
      questions.createdon, 
      topicid
      userid
  FROM questions
  ORDER BY questions.createdon DESC`
    );

    expect(updatedQuestionsList.rows[0].description).toBe("test");
  });
  test("WHEN the path parameter for /:topicid is invalid, respond with status code 400", async () => {
    const expectedStatus = 400;

    await request(app).post("/postquestion/incorrectId").expect(expectedStatus);
  });
  test("WHEN the path parameter for topicId is 0, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postquestion/0").expect(expectedStatus);
  });
  test("WHEN the path parameter for topicId is a negative value, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postquestion/-6").expect(expectedStatus);
  });
  test("WHEN the path parameter for topicId is great than the max value defined in Joi scheme, respond with status code 404 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postquestion/7").expect(expectedStatus);
  });
  test("WHEN the path parameter for topicId is not provided, respond with status code 404 and an appropriate error message", async () => {
    const expectedStatus = 404;

    await request(app).post("/postquestion/").expect(expectedStatus);
  });
});
