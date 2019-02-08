/* global describe it before after */
import chai from "chai";
import dateString from "chai-date-string";
import buildApp from "../app";

const expect = chai.expect;

chai.use(dateString);

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

    describe("release artist relationship", function() {
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
    });

    describe("release vendors relationship", function() {
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

    describe("release credits relationship", function() {
      it("should return the release with a credits property", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload)).to.have.property("credits");
      });

      it("should return the release with a credits property that's an array", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload).credits).to.be.an.instanceOf(Array);
      });

      it("should return the release with 10 credits", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload).credits.length).to.equal(10);
      });
    });

    describe("release endorsements relationship", function() {
      it("should return the release with a endorsements property", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload)).to.have.property("endorsements");
      });

      it("should return the release with a endorsements property that's an array", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload).endorsements).to.be.an.instanceOf(
          Array
        );
      });

      it("should return the release with 2 endorsements", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload).endorsements.length).to.equal(2);
      });
    });

    describe("release label relationship", function() {
      it("should return the release with a label property", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-1-album-1"
        });
        expect(JSON.parse(response.payload)).to.have.property("label");
      });

      it("should return the release with a label property that's an object", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/release/artist-9-album-9"
        });
        expect(JSON.parse(response.payload).label).to.be.an.instanceof(Object);
      });

      describe("release label id", function() {
        it("should have a label property with an id", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label).to.have.property("id");
        });

        it("should have a label property with an integer id", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label.id).to.be.a("number");
        });
      });

      describe("release label name", function() {
        it("should have a label property with a name", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label).to.have.property("name");
        });

        it("should have a label property with a name string", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label.name).to.be.a("string");
        });
      });

      describe("release label slug", function() {
        it("should have a label property with a slug", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label).to.have.property("slug");
        });

        it("should have a label property with a slug string", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label.slug).to.be.a("string");
        });
      });

      describe("release label created_at", function() {
        it("should have a label property with a created_at property", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            "created_at"
          );
        });

        it("should have a label property with a created_at datetime string", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(
            JSON.parse(response.payload).label.created_at
          ).to.be.a.dateString();
        });
      });

      describe("release label updated_at", function() {
        it("should have a label property with an updated_at property", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            "updated_at"
          );
        });

        it("should have a label property with an updated_at datetime string", async function() {
          const response = await app.inject({
            method: "GET",
            url: "/release/artist-9-album-9"
          });
          expect(
            JSON.parse(response.payload).label.updated_at
          ).to.be.a.dateString();
        });
      });
    });
  });
});
