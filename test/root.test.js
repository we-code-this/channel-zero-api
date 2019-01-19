import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

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
