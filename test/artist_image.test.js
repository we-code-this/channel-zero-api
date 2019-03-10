import chai from "chai";
import path from "path";
import fs from "fs-extra";
import rimraf from "rimraf";
import FormData from "form-data";
import { default as buildApp } from "../app";
import { fileRoot, assetDirectories } from "../lib/files";

const filePath = path.join(__dirname, "test.png");

const expect = chai.expect;

describe("artist_image", function() {
  let artistsDir = path.join(fileRoot(), assetDirectories.artists);
  let app;

  before(function() {
    rimraf(artistsDir, () => {});
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe("POST /artist/image", function() {
    it("should upload image and save record to db", async function() {
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

      const image = await app.inject(opts);
      const filename = JSON.parse(image.payload).filename;
      const destPath = path.join(artistsDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;
    });

    it("should return error without an image", async function() {
      let form = new FormData();
      form.append("artist_id", 1);

      let opts = {
        url: "/artist/image",
        method: "POST",
        payload: form,
        headers: form.getHeaders()
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property("errors");
      expect(JSON.parse(response.payload).errors[0].field).to.equal("image");
    });
  });
});
