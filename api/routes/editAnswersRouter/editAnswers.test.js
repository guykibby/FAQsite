const request = require("supertest");
const app = require("../../app");
const get_db = require("../../db");
const answerRepo = require("./editAnswers.respository");
describe("Given that the PUT /editAnswer/:answerId route exists", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("WHEN the isStarred value of the answer for a valid answerId = 1 is edited THEN return status 200 and an Edit successful message. Check the value of isStarred has been complemented", async () => {
    const db = await get_db();
    //setting the answer to true manually so that the test can prove that it is toggeled after the put request
    await answerRepo.editAnswer(1, true, true, true);

    // fetching the isStarred value before the put request
    const answerBeforeEdit = await db.query(
      `SELECT isStarred FROM answers WHERE id = 1`
    );
    const body = {
      isStarred: false,
      isReviewed: false,
      starFlag: true,
    };

    // put request made to edit the isStarred value
    await request(app)
      .put("/editanswer/1")
      .send(body)
      .set("Accept", "aaplication/json")
      .expect(200)
      .expect((response) => {
        response.body = "Edit Successful";
      });
    // fetching the isStarred value after the put request has been completed
    const answerAfterEdit = await db.query(
      `SELECT isStarred FROM answers WHERE id = 1`
    );
    // test to show that the edit actually toggled the field
    expect(answerAfterEdit.rows[0].isstarred).toBe(
      !answerBeforeEdit.rows[0].isstarred
    );
  });
});
