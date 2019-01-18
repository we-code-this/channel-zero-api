const expect = require("chai").expect;
const buildApp = require("../app");

describe("/articles path", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 10 articles", async function() {
    try {
      const response = await app.inject({ method: "GET", url: "/articles" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    } catch (err) {
      console.error(err);
    }
  });

  describe("/articles/:count path", function() {
    it("should return 11 articles if :count is 11", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/articles/11"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(11);
      } catch (err) {
        console.error(err);
      }
    });

    it("should return 9 articles if :count is 9", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/articles/9"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(9);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
