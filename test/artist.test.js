import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("artist", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe("/artist/:slug", function() {
    it("should return the artist with a 'artist-1' slug", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/artist/artist-1"
      });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(1);
    });
  });

  describe("/artists", function() {
    it("should return 10 artists", async function() {
      const response = await app.inject({ method: "GET", url: "/artists" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe("/artists/:limit", function() {
      it("should return 11 artists if :limit is 11", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/11"
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it("should return 9 artists if :limit is 9", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/9"
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe("/artists/:limit/:order", function() {
      it("should return artist with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/1/desc"
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return artist with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/1/asc"
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe("/artists/range/:offset/:limit/:order", function() {
      it("should return artist with id of 11 with offset 1, limit 10 and order 'asc'", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/range/1/10/asc"
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });

    describe("/artists/count", function() {
      it("should return count of 11", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/count"
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });
  });
});
