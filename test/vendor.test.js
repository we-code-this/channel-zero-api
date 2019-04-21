import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("vendors", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe("GET /vendors", function() {
    it("should return 10 vendors", async function() {
      const response = await app.inject({ method: "GET", url: "/vendors" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe("GET /vendors/count", function() {
      it("should return the count of all vendors", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/vendors/count"
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(10);
      });
    });
  });
});
