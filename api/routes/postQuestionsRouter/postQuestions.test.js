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
      //title,
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

    const body = {
      //title,
      description: "test",
      topicId: 3,
    };

    await request(app).post("/postquestion/incorrectId").expect(expectedStatus);
  });
});
//404 test
/*
test("WHEN the path parameter for /:topicid is invalid, respond with status code 400", async () => {
  // await postAnswer(3, "test");

  const expectedStatus = 400;

  const body = {
    //title,
    description: "test",
    topicId: 3,
  };

  await request(app).post("/postquestion/incorrectId").expect(expectedStatus);
});
*/
