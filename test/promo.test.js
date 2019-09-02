import chai from 'chai';
import path from 'path';
import fs from 'fs-extra';
import rimraf from 'rimraf';
import FormData from 'form-data';
import { default as buildApp } from '../app';
import { fileRoot, assetDirectories } from '../lib/files';
import { login } from './login';

const unsupportedfilePath = path.join(__dirname, 'test.png');
const filePath = path.join(__dirname, 'test.svg');
const altFilePath = path.join(__dirname, 'test-alt.svg');

const expect = chai.expect;

describe('promos', function() {
  let promosDir = path.join(fileRoot(), assetDirectories.promos);
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /promos', function() {
    it('should return 10 promos', async function() {
      const response = await app.inject({ method: 'GET', url: '/promos' });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /promo/:id', function() {
    it('should return the promo that has the :id supplied', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promo/1'
      });
      expect(JSON.parse(response.payload).id).to.equal(1);
    });
  });

  describe('GET /promos/:limit', function() {
    it('should return 11 promos if :limit is 11', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/11'
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it('should return 9 promos if :limit is 9', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/9'
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe('GET /promos/:limit/:order', function() {
    it("should return promo with id of 11 when :limit is 1 and :order is 'desc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/1/desc'
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return promo with id of 1 when :limit is 1 and :order is 'asc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/1/asc'
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe('GET /promos/range/:offset/:limit/:order', function() {
    it("should return promos with range of IDs of 2-11 with :offset 1, :limit 10 and order 'asc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/range/1/10/asc'
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(11);
    });
  });

  describe('GET /promos/unpublished/:offset/:limit/:order', function() {
    it("should return promos with IDs in range of 12-3 with :offset 0, :limit 10 and order 'desc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/unpublished/0/10/desc'
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(12);
      expect(results[results.length - 1].id).to.equal(3);
    });
  });

  describe('GET /promos/count', function() {
    it('should return count of 12', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/count'
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(12);
    });
  });

  describe('GET /promos/placement/:location', function() {
    it("should return 6 promos when 'horizontal' is supplied to :location", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/placement/horizontal'
      });
      expect(JSON.parse(response.payload).length).to.equal(6);
    });

    it("should return 5 promos when 'vertical' is supplied to :location", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/placement/vertical'
      });
      expect(JSON.parse(response.payload).length).to.equal(5);
    });
  });

  describe('GET /promos/placement/:location/:limit', function() {
    it('should return 2 promos when :limit is 2', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/promos/placement/horizontal/2'
      });
      expect(JSON.parse(response.payload).length).to.equal(2);
    });
  });

  describe('POST /promo', function() {
    it('should add promo record to database', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);
      const name = 'Promo 2000';

      form.append('image', rs);
      form.append('name', name);
      form.append('url', 'http://promo-2000.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      const filename = JSON.parse(promo.payload).filename;

      const destPath = path.join(promosDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;
      expect(JSON.parse(promo.payload).name).to.equal(name);
    });

    it('should return error when no file submitted', async function() {
      const token = await login(app);
      let form = new FormData();
      const name = 'Promo 2001';

      form.append('name', name);
      form.append('url', 'http://promo-2001.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload)).to.haveOwnProperty('errors');
      expect(JSON.parse(promo.payload).errors[0].field).to.equal('image');
    });

    it('should return error when file is not svg', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(unsupportedfilePath);
      const name = 'Promo 2001';

      form.append('image', rs);
      form.append('name', name);
      form.append('url', 'http://promo-2001.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload)).to.haveOwnProperty('errors');
      expect(JSON.parse(promo.payload).errors[0].field).to.equal('image');
    });

    it('should return error with invalid name', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', '');
      form.append('url', 'http://promo-2000.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload)).to.haveOwnProperty('errors');
      expect(JSON.parse(promo.payload).errors[0].field).to.equal('name');
    });

    it('should return error with invalid url', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 2001');
      form.append('url', 'not a url');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload)).to.haveOwnProperty('errors');
      expect(JSON.parse(promo.payload).errors[0].field).to.equal('url');
    });

    it('should return error with invalid location', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 2001');
      form.append('url', 'http://promo-2001.com');
      form.append('location', 'not a location');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload)).to.haveOwnProperty('errors');
      expect(JSON.parse(promo.payload).errors[0].field).to.equal('location');
    });

    it('should sanitize name', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', "<script>console.log('yo')</script> Promo 2002");
      form.append('url', 'http://promo-2000.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const promo = await app.inject(opts);

      expect(JSON.parse(promo.payload).name).to.equal('Promo 2002');
    });
  });

  describe('PATCH /promo', function() {
    it('should update promo record in database', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 3000');
      form.append('url', 'http://promo-3000.com');
      form.append('location', 'horizontal');

      const createResponse = await app.inject({
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      const promo = JSON.parse(createResponse.payload);

      const newName = 'Promo 3000 Updated';

      let newForm = new FormData();
      newForm.append('id', promo.id);
      newForm.append('name', newName);

      const newResponse = await app.inject({
        method: 'PATCH',
        url: '/promo',
        payload: newForm,
        headers: newForm.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      expect(JSON.parse(newResponse.payload).name).to.equal(newName);
    });

    it('should replace image with new one', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 3001');
      form.append('url', 'http://promo-3001.com');
      form.append('location', 'horizontal');

      const createResponse = await app.inject({
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      const promo = JSON.parse(createResponse.payload);

      const filename = promo.filename;
      const destPath = path.join(promosDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      const original_file = fs.readFileSync(destPath);

      let newForm = new FormData();
      let newRs = fs.createReadStream(altFilePath);
      newForm.append('image', newRs);
      newForm.append('id', promo.id);

      await app.inject({
        method: 'PATCH',
        url: '/promo',
        payload: newForm,
        headers: newForm.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      const new_source = await fs.readFileSync(altFilePath);
      const new_file = await fs.readFileSync(destPath);

      expect(new_file).to.deep.equal(new_source);
      expect(new_file).to.not.deep.equal(original_file);
    });
  });

  describe('PATCH /promo/publish', function() {
    it('should publish an unpublished promo', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 4000');
      form.append('url', 'http://promo-4000.com');
      form.append('location', 'horizontal');
      form.append('published', 'false');

      const createResponse = await app.inject({
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      const promo = JSON.parse(createResponse.payload);
      const published = Boolean(promo.published);

      expect(published).to.be.false;

      const publishRes = await app.inject({
        url: '/promo/publish',
        method: 'PATCH',
        body: {
          id: promo.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const publishedPromo = JSON.parse(publishRes.payload);

      expect(publishedPromo.published).to.be.true;
    });
  });

  describe('PATCH /promo/unpublish', function() {
    it('should unpublish a published promo', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 4001');
      form.append('url', 'http://promo-4001.com');
      form.append('location', 'horizontal');
      form.append('published', 'true');

      const createResponse = await app.inject({
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      const promo = JSON.parse(createResponse.payload);
      const published = Boolean(promo.published);

      expect(published).to.be.true;

      const publishRes = await app.inject({
        url: '/promo/unpublish',
        method: 'PATCH',
        body: {
          id: promo.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const publishedPromo = JSON.parse(publishRes.payload);

      expect(publishedPromo.published).to.be.false;
    });
  });

  describe('DELETE /promo', function() {
    it('should delete promo database record and image file', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('name', 'Promo 5000');
      form.append('url', 'http://promo-5000.com');
      form.append('location', 'horizontal');

      let opts = {
        method: 'POST',
        url: '/promo',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const res = await app.inject(opts);
      const promo = JSON.parse(res.payload);
      const filename = promo.filename;
      const destPath = path.join(promosDir, filename);

      await app.inject({
        method: 'DELETE',
        url: '/promo',
        payload: {
          id: promo.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/promo/${promo.id}`
      });

      expect(afterResponse.statusCode).to.equal(404);
      expect(fs.existsSync(destPath)).to.be.false;
    });

    it('should return 404 when trying to delete promo that doesn’t exist', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'DELETE',
        url: '/promo',
        payload: {
          id: 2000
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
