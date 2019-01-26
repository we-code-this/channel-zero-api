import chai from "chai";
import { default as buildApp } from "../app";

const expect = chai.expect;

describe("/releases", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  it("should return 10 releases", async function() {
    const response = await app.inject({ method: "GET", url: "/releases" });
    expect(response.headers["content-type"]).to.equal(
      "application/json; charset=utf-8"
    );
    expect(JSON.parse(response.payload).length).to.equal(10);
  });

  describe("/releases/:limit", function() {
    it("should return 11 releases if :limit is 11", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/releases/11"
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it("should return 9 releases if :limit is 9", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/releases/9"
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe("/releases/:limit/:order", function() {
    it("should return release with id of 11 when :order is 'desc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/releases/1/desc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return release with id of 1 when :order is 'asc'", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/releases/1/asc"
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe("/release/:slug", function() {
    it("should return the release that has the :slug supplied", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload).slug).to.equal("artist-9-album-9");
    });

    it("should return the release with an artist property", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload)).to.have.property("artist");
    });

    it("should return the release with an artist property that's an object", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload).artist).to.be.an.instanceof(Object);
    });

    it("should return the release with a vendors property", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload)).to.have.property("vendors");
    });

    it("should return the release with a vendors property that's an array", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload).vendors).to.be.an.instanceOf(Array);
    });

    it("should return the release with 3 vendors", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/release/artist-9-album-9"
      });
      expect(JSON.parse(response.payload).vendors.length).to.equal(3);
    });
  });
});
