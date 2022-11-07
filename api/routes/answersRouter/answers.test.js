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

  // test("GET /:questionId full list of answers with 200", async () => {
  //   await request(app)
  //     .get("/answers/1")
  //     .expect((response) => {
  //       const expectedBody = [
  //         {
  //           answerid: 1,
  //           createdon: "2022-11-04T13:42:17.615Z",
  //           questiondescription: "What is HTML?",
  //           questioncreated: "2022-11-04T13:42:17.615Z",
  //           questionid: 1,
  //           answerdescription:
  //             "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
  //         },
  //         {
  //           answerid: 2,
  //           createdon: "2022-11-04T13:42:17.615Z",
  //           questiondescription: "What is HTML?",
  //           questioncreated: "2022-11-04T13:42:17.615Z",
  //           questionid: 1,
  //           answerdescription:
  //             "Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.",
  //         },
  //       ];
  //       expect(response.body).toEqual(expectedBody);
  //       expect(response.status).toBe(200);
  //     });
  // });
});
