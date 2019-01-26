import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("/features", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 10 features", async function() {
    const response = await app.inject({ method: "GET", url: "/features" });
    expect(response.headers["content-type"]).to.equal(
      "application/json; charset=utf-8"
    );
    expect(JSON.parse(response.payload).length).to.equal(10);
  });

  describe("/features/:limit", function() {
    it("should return 11 features if :limit is 11", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/features/11"
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it("should return 9 features if :limit is 9", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/features/9"
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe("/features/:limit/:order", function() {
    it("should return feature with id of 11 when :order is 'desc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/features/1/desc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return feature with id of 1 when :order is 'asc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/features/1/asc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe("/feature", function() {
    it("should return most recent feature", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/feature"
      });

      expect(JSON.parse(response.payload).id).to.equal(11);
    });

    it("should return feature with an article property", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/feature"
      });
      expect(JSON.parse(response.payload)).to.have.property("article");
    });

    it("should return feature with an article property that's an object", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/feature"
      });
      expect(JSON.parse(response.payload).article).to.be.an.instanceof(Object);
    });

    it("should return feature with a video property", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/feature"
      });
      expect(JSON.parse(response.payload)).to.have.property("video");
    });

    it("should return feature with a video property that's an object", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/feature"
      });
      expect(JSON.parse(response.payload).video).to.be.an.instanceof(Object);
    });
  });
});
