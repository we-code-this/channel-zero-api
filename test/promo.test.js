import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("/promos", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 3 promos", async function() {
    try {
      const response = await app.inject({ method: "GET", url: "/promos" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(3);
    } catch (err) {
      console.error(err);
    }
  });

  describe("/promos/:location", function() {
    it("should return 1 promo when 'horizontal' is supplied to :location", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/promos/horizontal"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(1);
      } catch (err) {
        console.error(err);
      }
    });

    it("should return 2 promos when 'vertical' is supplied to :location", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/promos/vertical"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(2);
      } catch (err) {
        console.error(err);
      }
    });
  });
});
