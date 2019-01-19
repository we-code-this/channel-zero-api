import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("/articles", function() {
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

  describe("/articles/:limit", function() {
    it("should return 11 articles if :limit is 11", async function() {
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

    it("should return 9 articles if :limit is 9", async function() {
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

  describe("/articles/:limit/:order", function() {
    it("should return article with id of 11 when :order is 'desc'", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/articles/1/desc"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      } catch (err) {
        console.error(err);
      }
    });

    it("should return article with id of 1 when :order is 'asc'", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/articles/1/asc"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
