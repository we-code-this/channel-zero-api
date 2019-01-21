import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("/a", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 1 ad", async function() {
    const response = await app.inject({ method: "GET", url: "/a" });
    expect(response.headers["content-type"]).to.equal(
      "application/json; charset=utf-8"
    );
    expect(JSON.parse(response.payload).length).to.equal(1);
  });

  it("should have alt text 'Ad 1'", async function() {
    const response = await app.inject({ method: "GET", url: "/a" });
    expect(JSON.parse(response.payload)[0].alt).to.equal("Ad 1");
  });
});
