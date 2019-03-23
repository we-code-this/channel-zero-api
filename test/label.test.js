import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("GET /labels", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 10 labels", async function() {
    const response = await app.inject({ method: "GET", url: "/labels" });
    expect(JSON.parse(response.payload).length).to.equal(10);
  });

  describe("GET /labels/:limit", function() {
    it("should return 11 labels if :limit is 11", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/11"
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it("should return 9 labels if :limit is 9", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/9"
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe("GET /labels/:limit/:order", function() {
    it("should return label with id of 11 when :order is 'desc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/1/desc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return label with id of 1 when :order is 'asc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/1/asc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe("GET /labels/range/:offset/:limit/:order", function() {
    it("should return label with id of 10 with offset 1, limit 10 and order 'asc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/range/1/10/asc"
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(11);
    });
  });

  describe.only("GET /labels/count", function() {
    it("should return count of 11", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/count"
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });
});
