const expect = require("chai").expect;
const buildApp = require("../app");

describe("Root '/' path", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return a 404", async function() {
    try {
      const response = await app.inject({ method: "GET", url: "/" });
      expect(response.statusCode).to.equal(404);
    } catch (err) {
      console.error(err);
    }
  });
});
