import chai from "chai";
import path from "path";
import fs from "fs-extra";
import FormData from "form-data";
import { default as buildApp } from "../app";

const expect = chai.expect;
const filePath = path.join(__dirname, "test.png");

describe("artist", function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe("GET /artist/:slug", function() {
    it("should return the artist with a 'artist-1' slug", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/artist/artist-1"
      });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).slug).to.equal("artist-1");
    });

    it("should return 404 if artist record doesn't exist in database", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/artist/nonexistent-artist"
      });

      expect(response.statusCode).to.equal(404);
    });

    describe("artist image relationship", function() {
      it("should return the artist with images property", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artist/artist-1"
        });

        expect(JSON.parse(response.payload)).to.have.property("images");
      });

      it("should return the artist with an images property that's an array", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artist/artist-1"
        });

        expect(JSON.parse(response.payload).images).to.be.an.instanceof(Array);
      });

      it("should return the artist with 1 image", async function() {
        let form = new FormData();
        let rs = fs.createReadStream(filePath);
        form.append("image", rs);
        form.append("artist_id", 1);

        let opts = {
          url: "/artist/image",
          method: "POST",
          payload: form,
          headers: form.getHeaders()
        };

        await app.inject(opts);

        const response = await app.inject({
          method: "GET",
          url: "/artist/artist-1"
        });

        expect(JSON.parse(response.payload).images.length).to.equal(1);
      });
    });
  });

  describe("PATCH /artist", function() {
    it("should update artist database record", async function() {
      const getResponse = await app.inject({
        method: "GET",
        url: "/artist/artist-1"
      });

      const artist = JSON.parse(getResponse.payload);

      expect(artist.description).to.equal("artist description");

      const newDescription = "new artist description";

      const response = await app.inject({
        method: "PATCH",
        url: "/artist",
        payload: {
          slug: "artist-1",
          description: newDescription
        }
      });

      expect(JSON.parse(response.payload).description).to.equal(newDescription);
    });

    it("should sanitize description", async function() {
      const response = await app.inject({
        method: "PATCH",
        url: "/artist",
        payload: {
          slug: "artist-1",
          description:
            "new <script>console.log('yo')</script> artist description"
        }
      });

      expect(JSON.parse(response.payload).description).to.equal(
        "new artist description"
      );
    });

    it("should return name field error of 'Invalid length'", async function() {
      const response = await app.inject({
        method: "PATCH",
        url: "/artist",
        payload: {
          slug: "artist-1",
          name: ""
        }
      });

      expect(JSON.parse(response.payload)).to.have.property("errors");
      expect(JSON.parse(response.payload).errors[0].field).to.equal("name");
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        "Invalid length"
      );
    });
  });

  describe("GET /artists", function() {
    it("should return 10 artists", async function() {
      const response = await app.inject({ method: "GET", url: "/artists" });
      expect(response.headers["content-type"]).to.equal(
        "application/json; charset=utf-8"
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe("GET /artists/:limit", function() {
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

    describe("GET /artists/:limit/:order", function() {
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

    describe("GET /artists/range/:offset/:limit/:order", function() {
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

    describe("GET /artists/by/name", function() {
      it("should return all artists sorted by name", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/by/name"
        });

        const results = JSON.parse(response.payload);

        expect(results[0].name).to.equal("Artist 1");
        expect(results[1].name).to.equal("Artist 10");
        expect(results[2].name).to.equal("Artist 11");
      });
    });

    describe("GET /artists/count", function() {
      it("should return count of 11", async function() {
        const response = await app.inject({
          method: "GET",
          url: "/artists/count"
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });
  });

  describe("DELETE /artist", function() {
    it("should delete artist database record", async function() {
      const slug = "artist-1";

      const beforeResponse = await app.inject({
        method: "GET",
        url: `/artist/${slug}`
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(1);

      await app.inject({
        method: "DELETE",
        url: "/artist",
        payload: {
          id: 1
        }
      });

      const afterResponse = await app.inject({
        method: "GET",
        url: `/artist/${slug}`
      });

      expect(afterResponse.statusCode).to.equal(404);
    });

    it("should return 404 when trying to delete artist that doesn’t exist", async function() {
      const response = await app.inject({
        method: "DELETE",
        url: "/artist",
        payload: {
          id: 12
        }
      });

      expect(response.statusCode).to.equal(404);
    });
  });

  describe("POST /artist", function() {
    it("should add artist record to database", async function() {
      const slug = "artist-1000";

      const beforeResponse = await app.inject({
        method: "GET",
        url: `/artist/${slug}`
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const artist = await app.inject({
        method: "POST",
        url: "/artist",
        payload: {
          name: "Artist 1000",
          description: "Test description"
        }
      });

      expect(JSON.parse(artist.payload).slug).to.equal(slug);
    });

    it("should increment artist slug when name is same as another artist", async function() {
      const name = "Artist 1001";
      const slug = "artist-1001";

      const firstArtist = await app.inject({
        method: "POST",
        url: "/artist",
        payload: {
          name: name,
          description: "Test description"
        }
      });

      expect(JSON.parse(firstArtist.payload).slug).to.equal(slug);

      const secondArtist = await app.inject({
        method: "POST",
        url: "/artist",
        payload: {
          name: name,
          description: "Test description"
        }
      });

      expect(JSON.parse(secondArtist.payload).slug).to.equal(`${slug}-1`);
    });

    it("should sanitize description", async function() {
      const response = await app.inject({
        method: "POST",
        url: "/artist",
        payload: {
          name: "Artist 1002",
          description: "<script>console.log('yo')</script> artist description"
        }
      });

      expect(JSON.parse(response.payload).description).to.equal(
        "artist description"
      );
    });

    it("should sanitize name", async function() {
      const response = await app.inject({
        method: "POST",
        url: "/artist",
        payload: {
          name: "<script>console.log('yo')</script> Artist 1002"
        }
      });

      expect(JSON.parse(response.payload).name).to.equal("Artist 1002");
    });
  });
});
