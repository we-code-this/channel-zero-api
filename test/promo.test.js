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

  it("should return 9 promos", async function() {
    try {
      const response = await app.inject({ method: "GET", url: "/promos" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(9);
    } catch (err) {
      console.error(err);
    }
  });

  describe("/promos/:location", function() {
    it("should return 5 promos when 'horizontal' is supplied to :location", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/promos/horizontal"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(5);
      } catch (err) {
        console.error(err);
      }
    });

    it("should return 4 promos when 'vertical' is supplied to :location", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/promos/vertical"
        });
        expect(response.headers["content-type"]).to.equal(
          "application/json; charset=utf-8"
        );
        expect(JSON.parse(response.payload).length).to.equal(4);
      } catch (err) {
        console.error(err);
      }
    });
  });

  describe("/promos/:location/:limit", function() {
    it("should return 2 promos when :limit is 2", async function() {
      try {
        const response = await app.inject({
          method: "GET",
          url: "/promos/horizontal/2"
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
