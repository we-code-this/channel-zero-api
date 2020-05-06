import chai from 'chai';
import path from 'path';
import fs from 'fs-extra';
import dateString from 'chai-date-string';
import rimraf from 'rimraf';
import FormData from 'form-data';
import buildApp from '../app';
import { fileRoot, assetDirectories } from '../lib/files';
import { login } from './login';

const desktopFilePath = path.join(__dirname, 'a-desktop.jpg');
const desktopAltFilePath = path.join(__dirname, 'a-desktop-alt.jpg');
const mobileFilePath = path.join(__dirname, 'a-mobile.jpg');
const mobileAltFilePath = path.join(__dirname, 'a-mobile-alt.jpg');
const incorrectFilePath = path.join(__dirname, 'test.png');

const expect = chai.expect;

chai.use(dateString);

describe('ads', function () {
  let adsDir = path.join(fileRoot(), assetDirectories.a);
  let app;

  before(function () {
    rimraf(adsDir, () => {});
    app = buildApp();
  });

  after(function () {
    app.close();
  });

  describe('GET', function () {
    describe('GET /banners', function () {
      it('should return 10 ads', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners',
        });

        expect(response.headers['content-type']).to.equal(
          'application/json; charset=utf-8',
        );
        expect(JSON.parse(response.payload).length).to.equal(10);
      });
    });

    describe('GET /banners/:limit', function () {
      it('should return 11 ads if :limit is 11', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 ads if :limit is 9', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /banners/:limit/:order', function () {
      it("should return ad with id of 11 when :order is 'desc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/1/desc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return ad with id of 1 when :order is 'asc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /banners/range/:offset/:limit/:order', function () {
      it("should return ad with id of 11 with offset 1, limit 10 and order 'asc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/range/1/10/asc',
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });

    describe('GET /banners/count', function () {
      it('should return count of 11', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banners/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });

    describe('GET /banner/:id', function () {
      it('should return the ad that has the :id supplied', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/banner/2',
        });

        expect(JSON.parse(response.payload).id).to.equal(2);
      });
    });

    describe('GET /a', function () {
      it('should return 1 ad', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/a',
        });
        expect(response.headers['content-type']).to.equal(
          'application/json; charset=utf-8',
        );

        const ad = JSON.parse(response.payload);

        expect(ad).to.be.an.instanceOf(Object);
        expect(ad).to.haveOwnProperty('url');
        expect(ad).to.haveOwnProperty('desktop_url');
        expect(ad).to.haveOwnProperty('mobile_url');
        expect(ad).to.haveOwnProperty('published');
      });
    });
  });

  describe('POST /banner', function () {
    it('should add ad record to database', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);
      const id = 12;

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/banner/${id}`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 1');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const ad = await app.inject(opts);

      const desktop_filename = JSON.parse(ad.payload)
        .desktop_filename;
      const desktopDestPath = path.join(adsDir, desktop_filename);
      const mobile_filename = JSON.parse(ad.payload).mobile_filename;
      const mobileDestPath = path.join(adsDir, mobile_filename);

      expect(fs.existsSync(desktopDestPath)).to.be.true;
      expect(fs.existsSync(mobileDestPath)).to.be.true;
      expect(JSON.parse(ad.payload).id).to.equal(id);
    });

    it('should return error without a desktop image', async function () {
      const token = await login(app);
      let form = new FormData();
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 2');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'desktop_image',
      );
    });

    it('should return error without a mobile image', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);

      form.append('desktop_image', desktopRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 2');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'mobile_image',
      );
    });

    it('should return error with invalid url', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', '');
      form.append('alt', 'Test Ad 3');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'url',
      );
    });

    it('should return error with invalid alt', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', '');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'alt',
      );
    });

    it('should return error when desktop image does not have correct dimensions', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(incorrectFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 5');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'desktop_image',
      );
    });

    it('should return error when mobile image does not have correct dimensions', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(incorrectFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 6');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'mobile_image',
      );
    });

    it('should sanitize url', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append(
        'url',
        "<script>console.log('yo')</script> http://example.com",
      );
      form.append('alt', 'Test Ad 7');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).url).to.equal(
        'http://example.com',
      );
    });

    it('should sanitize alt', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append(
        'alt',
        "<script>console.log('yo')</script> Test Ad 8",
      );

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).alt).to.equal('Test Ad 8');
    });
  });

  describe('PATCH', function () {
    describe('PATCH /banner', function () {
      it('should update ad record in database', async function () {
        const token = await login(app);
        const getResponse = await app.inject({
          method: 'GET',
          url: '/banner/1',
        });

        const ad = JSON.parse(getResponse.payload);

        expect(ad.id).to.equal(1);
        expect(ad.alt).to.equal('Ad 1');

        const newAlt = 'Updated Ad 1';

        let form = new FormData();
        form.append('id', 1);
        form.append('alt', newAlt);

        const response = await app.inject({
          method: 'PATCH',
          url: '/banner',
          payload: form,
          headers: form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        });

        expect(JSON.parse(response.payload).alt).to.equal(newAlt);
      });

      it('should replace desktop_image with new one', async function () {
        const token = await login(app);
        let desktopRs = fs.createReadStream(desktopFilePath);
        let mobileRs = fs.createReadStream(mobileFilePath);
        let original_form = new FormData();
        original_form.append('desktop_image', desktopRs);
        original_form.append('mobile_image', mobileRs);
        original_form.append('url', 'http://example.com');
        original_form.append('alt', 'Test Ad 7');
        original_form.append('catalog_number', 'cat1003');

        let original_opts = {
          url: '/banner',
          method: 'POST',
          payload: original_form,
          headers: original_form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        const original_result = await app.inject(original_opts);
        const original_ad = JSON.parse(original_result.payload);
        const desktop_filename = original_ad.desktop_filename;
        const destPath = path.join(adsDir, desktop_filename);

        expect(fs.existsSync(destPath)).to.be.true;

        const original_file = fs.readFileSync(destPath);

        let new_rs = fs.createReadStream(desktopAltFilePath);
        let new_form = new FormData();
        new_form.append('desktop_image', new_rs);
        new_form.append('id', original_ad.id);

        let new_opts = {
          method: 'PATCH',
          url: '/banner',
          payload: new_form,
          headers: new_form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        await app.inject(new_opts);

        const new_source = await fs.readFileSync(desktopAltFilePath);
        const new_file = await fs.readFileSync(destPath);

        expect(new_file).to.deep.equal(new_source);
        expect(new_file).to.not.deep.equal(original_file);
      });

      it('should replace mobile_image with new one', async function () {
        const token = await login(app);
        let desktopRs = fs.createReadStream(desktopFilePath);
        let mobileRs = fs.createReadStream(mobileFilePath);
        let original_form = new FormData();
        original_form.append('desktop_image', desktopRs);
        original_form.append('mobile_image', mobileRs);
        original_form.append('url', 'http://example.com');
        original_form.append('alt', 'Test Ad 7');
        original_form.append('catalog_number', 'cat1003');

        let original_opts = {
          url: '/banner',
          method: 'POST',
          payload: original_form,
          headers: original_form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        const original_result = await app.inject(original_opts);
        const original_ad = JSON.parse(original_result.payload);
        const mobile_filename = original_ad.mobile_filename;
        const destPath = path.join(adsDir, mobile_filename);

        expect(fs.existsSync(destPath)).to.be.true;

        const original_file = fs.readFileSync(destPath);

        let new_rs = fs.createReadStream(mobileAltFilePath);
        let new_form = new FormData();
        new_form.append('mobile_image', new_rs);
        new_form.append('id', original_ad.id);

        let new_opts = {
          method: 'PATCH',
          url: '/banner',
          payload: new_form,
          headers: new_form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        await app.inject(new_opts);

        const new_source = await fs.readFileSync(mobileAltFilePath);
        const new_file = await fs.readFileSync(destPath);

        expect(new_file).to.deep.equal(new_source);
        expect(new_file).to.not.deep.equal(original_file);
      });
    });

    describe('PATCH /banner/publish', function () {
      it('should publish an unpublished ad', async function () {
        const token = await login(app);
        let form = new FormData();
        let desktopRs = fs.createReadStream(desktopFilePath);
        let mobileRs = fs.createReadStream(mobileFilePath);

        form.append('desktop_image', desktopRs);
        form.append('mobile_image', mobileRs);
        form.append('url', 'http://example.com');
        form.append('alt', 'Test Ad 8');

        let opts = {
          url: '/banner',
          method: 'POST',
          payload: form,
          headers: form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        const res = await app.inject(opts);
        const ad = JSON.parse(res.payload);
        const published = Boolean(ad.published);

        expect(published).to.be.false;

        const publishRes = await app.inject({
          url: '/banner/publish',
          method: 'PATCH',
          body: {
            id: ad.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const publishedAd = JSON.parse(publishRes.payload);

        expect(publishedAd.published).to.be.true;
      });
    });

    describe('PATCH /banner/unpublish', function () {
      it('should unpublish a published ad', async function () {
        const token = await login(app);
        let form = new FormData();
        let desktopRs = fs.createReadStream(desktopFilePath);
        let mobileRs = fs.createReadStream(mobileFilePath);

        form.append('desktop_image', desktopRs);
        form.append('mobile_image', mobileRs);
        form.append('url', 'http://example.com');
        form.append('alt', 'Test Ad 9');
        form.append('published', 'true');

        let opts = {
          url: '/banner',
          method: 'POST',
          payload: form,
          headers: form.getHeaders({
            Authorization: `Bearer ${token}`,
          }),
        };

        const res = await app.inject(opts);
        const ad = JSON.parse(res.payload);
        const published = Boolean(ad.published);

        expect(published).to.be.true;

        const unpublishRes = await app.inject({
          url: '/banner/unpublish',
          method: 'PATCH',
          body: {
            id: ad.id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const unpublishedAd = JSON.parse(unpublishRes.payload);

        expect(unpublishedAd.published).to.be.false;
      });
    });
  });

  describe('DELETE /banner', function () {
    it('should delete ad database record and image files', async function () {
      const token = await login(app);
      let form = new FormData();
      let desktopRs = fs.createReadStream(desktopFilePath);
      let mobileRs = fs.createReadStream(mobileFilePath);

      form.append('desktop_image', desktopRs);
      form.append('mobile_image', mobileRs);
      form.append('url', 'http://example.com');
      form.append('alt', 'Test Ad 10');

      let opts = {
        url: '/banner',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const res = await app.inject(opts);
      const ad = JSON.parse(res.payload);
      const desktop_filename = ad.desktop_filename;
      const mobile_filename = ad.mobile_filename;
      const desktopDestPath = path.join(adsDir, desktop_filename);
      const mobileDestPath = path.join(adsDir, mobile_filename);

      expect(fs.existsSync(desktopDestPath)).to.be.true;
      expect(fs.existsSync(mobileDestPath)).to.be.true;

      await app.inject({
        method: 'DELETE',
        url: '/banner',
        payload: {
          id: ad.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/banner/${ad.id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
      expect(fs.existsSync(desktopDestPath)).to.be.false;
      expect(fs.existsSync(mobileDestPath)).to.be.false;
    });

    it('should return 404 when trying to delete ad that doesn’t exist', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'DELETE',
        url: '/banner',
        payload: {
          id: 2000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
