const get_db = require("./db");

describe("API to DB connection", () => {
  afterAll(async () => {
    const db = await get_db();
    db.end();
  });

  test("should be active", async () => {
    const db = await get_db();
    let response = false;
    db.connect((err) => {
      if (err) {
        response = false;
      } else {
        response = true;
      }
      expect(response).toBe(true);
    });
  });
});
