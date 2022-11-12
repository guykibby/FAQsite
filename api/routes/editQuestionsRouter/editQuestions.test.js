const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const questionRepo = require("./editQuestions.respository");

describe("Given that the PUT, DELETE and GET /editquestion/:questionId route exists", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("WHEN the starFlag is set and isStarred value of the question for a valid answerId = 1 is edited THEN return status 200. The value of isStarred has been complemented", async () => {
    const db = await get_db();
    //setting the starFlag to true and isStarred to true manually so that the test can prove that it gets changed after the put request
    await questionRepo.editQuestion(1, true, true, true);

    // fetching the isStarred value before the put request
    const isStarredBeforeEdit = await db.query(
      `SELECT isStarred FROM questions WHERE id = 1`
    );

    // fetching the isReviewed value before the put request
    const isReviewedBeforeEdit = await db.query(
      `SELECT isStarred FROM questions WHERE id = 1`
    );

    // body that needs to be sent with the put request
    const body = {
      isStarred: false,
      isReviewed: false,
      starFlag: true,
    };

    // put request made to edit the isStarred value
    await request(app)
      .put("/editquestion/1")
      .send(body)
      .set("Accept", "application/json")
      .expect(200);

    // fetching the isStarred value after the put request has been completed
    const isStarredAfterEdit = await db.query(
      `SELECT isStarred FROM questions WHERE id = 1`
    );

    // fetching the isReviewed value after the put request
    const isReviewedAfterEdit = await db.query(
      `SELECT isStarred FROM questions WHERE id = 1`
    );

    // test to show that the edit actually changed the isStarred field form true to false
    expect(isStarredAfterEdit.rows[0].isstarred).toBe(
      !isStarredBeforeEdit.rows[0].isstarred
    );

    // isReviewed value never changes after the put request
    expect(isReviewedAfterEdit.rows[0].isreviewed).toBe(
      isReviewedBeforeEdit.rows[0].isreviewed
    );
  });

  test("WHEN the starFlag is set to false THEN the isStarred value should not change isReviewed value should change.", async () => {
    const db = await get_db();
    //setting the isReviewed to true, starFlag to false, manually so that the test can prove that it is changed after the put request
    await questionRepo.editQuestion(1, false, true, true);

    // fetching the isReviewed value before the put request
    const isReviewedBeforeEdit = await db.query(
      `SELECT isReviewed FROM questions WHERE id = 1`
    );
    // fetching the isStarred value before the put request
    const isStarredBeforeEdit = await db.query(
      `SELECT isStarred FROM questions WHERE id = 1`
    );

    // body for the put request
    const body = {
      isStarred: false,
      isReviewed: false,
      starFlag: false,
    };

    // making a put request by sending the body
    await request(app)
      .put("/editquestion/1")
      .send(body)
      .set("Accept", "application/json")
      .expect(200);

    // fetching the isReviewed value after the put request
    const isReviewedAfterEdit = await db.query(
      `SELECT isReviewed FROM answers WHERE id = 1`
    );

    // fetching the isReviewed value after the put request
    const isStarredAfterEdit = await db.query(
      `SELECT isStarred FROM answers WHERE id = 1`
    );

    // test to show that the edit actually complemented the isReviewed field form true to false
    expect(isReviewedAfterEdit.rows[0].isreviewed).toBe(
      !isReviewedBeforeEdit.rows[0].isreviewed
    );

    //test to show that put req did not effect the isStarred value of true
    expect(isStarredAfterEdit.rows[0].isstarred).toBe(
      isStarredBeforeEdit.rows[0].isstarred
    );
  });

  test("WHEN the path parameter for questionId is not a number THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .put("/editquestion/notAnumber")
      .set("Accept", "application/json")
      .send({
        isStarred: true,
        isReviewed: true,
        starFlad: false,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be a number`
        );
      });
  });

  test("WHEN the path parameter for questionId is less than 1 THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .put("/editquestion/0")
      .set("Accept", "application/json")
      .send({
        isStarred: true,
        isReviewed: true,
        starFlad: false,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be greater than or equal to 1`
        );
      });
  });

  test("WHEN the path parameter for questionId is greater than 999999998 as it is not a normal integer anymore THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .put("/editquestion/999999999")
      .set("Accept", "application/json")
      .send({
        isStarred: true,
        isReviewed: true,
        starFlad: false,
      })
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be less than or equal to 999999998`
        );
      });
  });

  test("WHEN the path parameter for questionId is not mention THEN It should give a 404 error status code", async () => {
    await request(app)
      .put("/editquestion/")
      .set("Accept", "application/json")
      .send({
        isStarred: true,
        isReviewed: true,
        starFlad: false,
      })
      .expect(404);
  });

  test("WHEN the path parameter for questionId is valid but not correct as it does not exist in the database THEN It should give a 400 error status code with message", async () => {
    await request(app)
      .put("/editquestion/999999")
      .set("Accept", "application/json")
      .send({
        isStarred: true,
        isReviewed: true,
        starFlad: false,
      })
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toEqual(
          "Invalid request. Question does not exists"
        );
      });
  });

  // tests for the delete requests
  test("WHEN the path parameter for questionId is 1 THEN respond with 200 error code and an Delete Successful", async () => {
    await request(app)
      .delete("/editquestion/10")
      .expect(200)
      .expect((response) => {
        expect(response.body.message).toBe(
          `Question Deleted`
        );
      });
  });

  test("WHEN the path parameter for questionId is not a number THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .delete("/editquestion/notAnumber")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be a number`
        );
      });
  });

  test("WHEN the path parameter for questionId is less than 1 THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .delete("/editquestion/0")
      .set("Accept", "application/json")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be greater than or equal to 1`
        );
      });
  });

  test("WHEN the path parameter for questionId is greater than 999999998 as it is not a normal integer anymore THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .delete("/editquestion/999999999")
      .set("Accept", "application/json")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be less than or equal to 999999998`
        );
      });
  });

  test("WHEN the path parameter for questionId is not mention THEN it should give a 404 error status code", async () => {
    await request(app)
      .delete("/editquestion/")
      .set("Accept", "application/json")
      .expect(404);
  });

  test("WHEN the path parameter for questionId is valid but not correct as it does not exist in the database THEN it should give a 400 error status code with message", async () => {
    await request(app)
      .delete("/editquestion/999999")
      .set("Accept", "application/json")
      .expect(404)
      .expect((response) => {
        expect(response.body.message).toEqual(
          "Invalid request. Question does not exists"
        );
      });
  });

  // test for GET requests
  test("WHEN a GET req is made with questionId = 1 THEN retrun a question object", async () => {
    const expectedOutput = await questionRepo.getQuestion(1);
    const response = await request(app).get("/editquestion/1").set("Accept", "application/json").expect(200);
    expect(response.body).toEqual(expectedOutput);
  });

  test("WHEN the path parameter for questionId is not mention THEN It should give a 404 error status code", async () => {
    await request(app)
      .get("/editquestion/")
      .set("Accept", "application/json")
      .expect(404);
  });

  test("WHEN the path parameter for questionId is valid but not correct as it does not exist in the database THEN give a 400 error status code with message", async () => {
    await request(app)
      .get("/editquestion/999999")
      .set("Accept", "application/json")
      .expect(400)
  });

  test("WHEN the path parameter for questionId is greater than 999999998 as it is not a normal integer anymore THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .get("/editquestion/999999999")
      .set("Accept", "application/json")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be less than or equal to 999999998`
        );
      });
  });

  test("WHEN the path parameter for questionId is not a number THEN respond with 400 error code and an appropriate error message", async () => {
    await request(app)
      .get("/editquestion/notAnumber")
      .set("Accept", "application/json")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(`\"questionId\" must be a number`);
      });
  });

  test("WHEN the path parameter for questionId is less than 1 THEN respond with 400 error code and an appropriate error message", async () => {
    const db = await get_db();
    await request(app)
      .get("/editquestion/0")
      .set("Accept", "application/json")
      .expect(400)
      .expect((response) => {
        expect(response.body.message[0]).toBe(
          `\"questionId\" must be greater than or equal to 1`
        );
      });
  });
});
