const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const { postAnswer } = require("./postAnswers.repository");

describe("app", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("POST /postanswer/:questionId creates a newly posted answer for a question", async () => {
    const db = await get_db();

    // creating a new post that has a question id of 65 and a description of 'test'
    await postAnswer(3, "test");

    console.log(postAnswer);

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

    const expectedStatus = 201;

    // body to be compared with the newly posted answer
    const body = {
      questionId: 3,
      description: "test",
    };

    // comparing the body's question id with the answer's questionid of the first item in the array
    await request(app)
      .post(`/postanswer/${body.questionid}`)
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body[0].questionid).toBe(
          updatedAnswersList.rows[0].questionid
        );
      });
  });

  test("WHEN the path parameter for /:questionId is invalid, respond with status code 400", async () => {
    await postAnswer(3, "test");

    const expectedStatus = 400;

    const body = {
      questionId: 3,
      description: "test",
    };

    await request(app)
      .post("/postanswer/incorrectId")
      .set("Accept", "application/json")
      .send(body)
      .expect(expectedStatus);
  });
});
