import chai from 'chai';
import path from 'path';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import FormData from 'form-data';
import { default as buildApp } from '../app';
import { fileRoot, assetDirectories } from '../lib/files';
import { login } from './login';

const filePath = path.join(__dirname, 'test.png');
const altFilePath = path.join(__dirname, 'test-alt.png');

const expect = chai.expect;

describe('artist_image', function() {
  let artistsDir = path.join(fileRoot(), assetDirectories.artists);
  let app;

  before(function() {
    rimraf(artistsDir, () => {});
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('POST /artist/image', function() {
    it('should upload image and save record to db', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);
      form.append('image', rs);
      form.append('artist_id', 1);

      let opts = {
        url: '/artist/image',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const image = await app.inject(opts);
      const filename = JSON.parse(image.payload).filename;
      const destPath = path.join(artistsDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;
    });

    it('should return error without an image', async function() {
      const token = await login(app);
      let form = new FormData();
      form.append('artist_id', 1);

      let opts = {
        url: '/artist/image',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal('image');
    });
  });

  describe('PATCH /artist/image', function() {
    it('should upload new image, delete old one and update db record', async function() {
      const token = await login(app);
      let original_form = new FormData();
      let rs = fs.createReadStream(filePath);
      original_form.append('image', rs);
      original_form.append('artist_id', 2);

      let original_opts = {
        url: '/artist/image',
        method: 'POST',
        payload: original_form,
        headers: original_form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const original_result = await app.inject(original_opts);
      const original_image = JSON.parse(original_result.payload);
      const filename = original_image.filename;
      const destPath = path.join(artistsDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      const original_file = fs.readFileSync(destPath);

      let new_form = new FormData();
      let new_rs = fs.createReadStream(altFilePath);
      new_form.append('image', new_rs);
      new_form.append('id', original_image.id);

      let new_opts = {
        method: 'PATCH',
        url: '/artist/image',
        payload: new_form,
        headers: new_form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      await app.inject(new_opts);

      try {
        const new_source = fs.readFileSync(altFilePath);
        const new_file = fs.readFileSync(destPath);

        expect(new_file).to.deep.equal(new_source);
        expect(new_file).to.not.deep.equal(original_file);
      } catch (err) {
        throw new Error(err);
      }
    });
  });

  describe('DELETE /artist/image', function() {
    it('should delete an artist image', async function() {
      const token = await login(app);
      let rs = fs.createReadStream(filePath);
      let original_form = new FormData();
      original_form.append('image', rs);
      original_form.append('artist_id', 3);

      let original_opts = {
        url: '/artist/image',
        method: 'POST',
        payload: original_form,
        headers: original_form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const original_result = await app.inject(original_opts);
      const original_image = JSON.parse(original_result.payload);
      const filename = original_image.filename;
      const destPath = path.join(artistsDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      await app.inject({
        method: 'DELETE',
        url: '/artist/image',
        payload: {
          id: original_image.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(fs.existsSync(destPath)).to.not.be.true;

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/artist/image/${original_image.id}`
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });

  describe('GET /artist/image/:id', function() {
    it('should retrieve image from db', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);
      form.append('image', rs);
      form.append('artist_id', 1);

      let opts = {
        url: '/artist/image',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const image_result = await app.inject(opts);
      const image = JSON.parse(image_result.payload);
      const response = await app.inject({
        method: 'GET',
        url: `/artist/image/${image.id}`
      });

      const result = JSON.parse(response.payload);

      expect(result).to.have.property('id');
      expect(result).to.have.property('filename');
    });
  });
});
