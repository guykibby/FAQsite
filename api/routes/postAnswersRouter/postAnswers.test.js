const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const repository = require("./postAnswers.repository");

describe("GIVEN that the POST /postanswer/:questionId route exists", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("POST /postanswer/:questionId creates a newly posted answer for a question", async () => {
    const db = await get_db();

    // body to be compared with the newly posted answer
    const body = {
      questionId: 3,
      description: "test",
    };

    const expectedStatus = 201;

    const postedAnswer = await repository.postAnswer(
      body.questionId,
      body.description
    );

    // comparing the body's question id with the answer's questionid of the first item in the array
    // the test below is failing (supposed to give status 201 but getting a 400)

    await request(app)
      .post(`/postanswer/${body.questionId}`)
      .send(postedAnswer)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toStrictEqual({
          message: "Post has been submitted successfully",
        });
      });

    // selects all the answers with the newly posted answer to be showing in the first array at [0]
    const updatedAnswersList = await db.query(
      `SELECT 
            answers.id AS answer_id, 
            answers.description, 
            answers.isstarred, 
            answers.isreviewed, 
            answers.createdon, 
            questionid 
        FROM answers
        ORDER BY answers.createdon DESC`
    );

    expect(updatedAnswersList.rows[0].description).toBe("test");
  });

  test("WHEN the path parameter for /:questionId is a undefined, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    const body = {
      questionId: undefined,
      description: "test",
    };

    await request(app)
      .post(`/postanswer/${body.questionId}`)
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toStrictEqual({
          message: ['"questionId" must be a number'],
        });
      });
  });

  test("WHEN the path parameter for /:questionId is more than 32, which means it does not exist within the database, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    const body = {
      questionId: 35,
      description: "test",
    };

    await request(app)
      .post(`/postanswer/${body.questionId}`)
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toStrictEqual({
          message: ['"questionId" must be less than or equal to 32'],
        });
      });

    await request(app).post("/postanswer/incorrectId").expect(expectedStatus);
  });

  test("WHEN the path parameter for /:questionId is a string, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postanswer/incorrectId").expect(expectedStatus);
  });

  test("WHEN the path parameter for questionId is 0, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postanswer/0").expect(expectedStatus);
  });

  test("WHEN the path parameter for questionId is a negative value, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postanswer/-5").expect(expectedStatus);
  });

  test("WHEN the path parameter for questionId is 9999, respond with status code 400 and an appropriate error message", async () => {
    const expectedStatus = 400;

    await request(app).post("/postanswer/9999").expect(expectedStatus);
  });

  test("WHEN the path parameter for questionId is not provided, respond with status code 404 and an appropriate error message", async () => {
    const expectedStatus = 404;

    await request(app).post("/postanswer/").expect(expectedStatus);
  });
});
