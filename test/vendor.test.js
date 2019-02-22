import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("GET /vendors", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 10 vendors", async function() {
    const response = await app.inject({ method: "GET", url: "/vendors" });
    expect(response.headers["content-type"]).to.equal(
      "application/json; charset=utf-8"
    );
    expect(JSON.parse(response.payload).length).to.equal(10);
  });
});
