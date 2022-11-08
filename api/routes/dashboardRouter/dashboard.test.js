jest.mock("./dashboard.repository");
const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const { getNewQuestions, getNewAnswers } = require("./dashboard.repository");

describe("FAQ Dashboard API", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });
  test("GET /dashboard should return all questions & answers with status code of 200", async () => {
    // const expectedData = await dashboardRepository.getNewQuestions();
    const expectedData = [
      {
        questionid: 1,
        questiondesc: "What is HTML?",
        isstarred: false,
        isreviewed: false,
        topicid: 1,
      },
      {
        questionid: 2,
        questiondesc: "What is CSS?",
        isstarred: false,
        isreviewed: false,
        topicid: 2,
      },
      {
        questionid: 3,
        questiondesc: "How do i pull a branch?",
        isstarred: false,
        isreviewed: false,
        topicid: 3,
      },
    ];
    getNewQuestions.mockReturnValueOnce(expectedData);
    const response = await request(app).get("/dashboard");
    // console.log("SSS ques data: " + response.body[0] + "  kk " + expectedData);
    expect(response.body[0]).toEqual(expectedData);
    expect(response.status).toBe(200);
  });

  test("GET /dashboard should return all answers with status code of 200", async () => {
    const expectedData = [
      {
        questionid: 1,
        answerid: 1,
        questiondesc: "What is HTML?",
        answerdesc:
          "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 1,
        answerid: 2,
        questiondesc: "What is HTML?",
        answerdesc:
          "Aut quibusdam incidunt ea error aliquam 33 atque odio At corrupti Quis et recusandae impedit sit exercitationem distinctio.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 2,
        answerid: 4,
        questiondesc: "What is CSS?",
        answerdesc:
          "Ut harum facilis quo adipisci temporibus 33 numquam illum sed galisum eius quo veritatis nemo. Id illo fugit et laboriosam repudiandae ut omnis deleniti.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 2,
        answerid: 5,
        questiondesc: "What is CSS?",
        answerdesc:
          "Et eaque galisum ex nisi libero ad soluta repellat a internos culpa eum repellat officiis ad ullam consequatur.",
        isstarred: false,
        isreviewed: false,
      },
      {
        questionid: 3,
        answerid: 6,
        questiondesc: "How do i pull a branch?",
        answerdesc:
          "Lorem ipsum dolor sit amet. Et molestias voluptatem qui doloremque soluta sit culpa porro et tenetur repellat vel beatae quas id reprehenderit esse.",
        isstarred: false,
        isreviewed: false,
      },
    ];
    getNewAnswers.mockReturnValueOnce(expectedData);
    const response = await request(app).get("/dashboard");
    // console.log("SSS ans data: " + response.body[0] + "  kk " + expectedData);
    expect(response.body[1]).toEqual(expectedData);
    expect(response.status).toBe(200);
  });

  test("GET /dashboard should return null with status code of 200, if question table empty or non-exisits", async () => {
    const expectedData = [];
    getNewQuestions.mockReturnValueOnce(expectedData);
    const response = await request(app).get("/dashboard");
    expect(response.body[0]).toEqual(expectedData);
    expect(response.status).toBe(200);
  });

  test("GET /dashboard should return null with status code of 200,if answer table is empty or non-exists", async () => {
    const expectedData = [];
    getNewAnswers.mockReturnValueOnce(expectedData);
    const response = await request(app).get("/dashboard");
    expect(response.body[1]).toEqual(expectedData);
    expect(response.status).toBe(200);
  });
});
