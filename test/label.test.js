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

  describe("GET /labels/count", function() {
    it("should return count of 11", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/labels/count"
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });

  describe("GET /label/:slug", function() {
    it("should return the label with a 'label-1' slug", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/label/label-1"
      });
      expect(JSON.parse(response.payload).slug).to.equal("label-1");
    });

    it("should return 404 if label record doesn't exist in database", async function() {
      const response = await app.inject({
        method: "GET",
        url: "/label/nonexistent-label"
      });

      expect(response.statusCode).to.equal(404);
    });
  });

  describe("POST /label", function() {
    it("should add label record to database", async function() {
      const slug = "label-1000";

      const beforeResponse = await app.inject({
        method: "GET",
        url: `/label/${slug}`
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const artist = await app.inject({
        method: "POST",
        url: "/label",
        payload: {
          name: "Label 1000"
        }
      });

      expect(JSON.parse(artist.payload).slug).to.equal(slug);
    });

    it("should increment label slug when name is same as another label", async function() {
      const name = "Label 1001";
      const slug = "label-1001";

      const firstLabel = await app.inject({
        method: "POST",
        url: "/label",
        payload: {
          name: name
        }
      });

      expect(JSON.parse(firstLabel.payload).slug).to.equal(slug);

      const secondLabel = await app.inject({
        method: "POST",
        url: "/label",
        payload: {
          name: name
        }
      });

      expect(JSON.parse(secondLabel.payload).slug).to.equal(`${slug}-1`);
    });

    it("should sanitize name", async function() {
      const response = await app.inject({
        method: "POST",
        url: "/label",
        payload: {
          name: "<script>console.log('yo')</script> Label 1002"
        }
      });

      expect(JSON.parse(response.payload).name).to.equal("Label 1002");
    });
  });

  describe.only("PATCH /label/:slug", function() {
    it("should update label database record", async function() {
      const getResponse = await app.inject({
        method: "GET",
        url: "/label/label-11"
      });

      const label = JSON.parse(getResponse.payload);

      expect(label.name).to.equal("Label 11");

      const newName = "Updated Label Name";

      const response = await app.inject({
        method: "PATCH",
        url: "/label/label-11",
        payload: {
          name: newName
        }
      });

      expect(JSON.parse(response.payload).name).to.equal(newName);
    });

    it("should sanitize name", async function() {
      const response = await app.inject({
        method: "PATCH",
        url: "/label/label-11",
        payload: {
          name: "<script>console.log('yo')</script> label name"
        }
      });

      expect(JSON.parse(response.payload).name).to.equal("label name");
    });

    it("should return name field error of 'Invalid length'", async function() {
      const response = await app.inject({
        method: "PATCH",
        url: "/label/label-11",
        payload: {
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
});
