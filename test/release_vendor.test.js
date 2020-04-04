import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('release_vendors', function () {
  let app;

  before(function () {
    app = buildApp();
  });

  after(function () {
    app.close();
  });

  describe('GET /releasevendor/:id', function () {
    it('should return the release_vendor with an id of 2', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/releasevendor/2',
      });
      expect(JSON.parse(response.payload).id).to.equal(2);
    });

    it("should return 404 if release_vendor record doesn't exist in database", async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/releasevendor/4000',
      });

      expect(response.statusCode).to.equal(404);
    });
  });

  describe('POST /releasevendor', function () {
    it('should add release_vendor record to database', async function () {
      const token = await login(app);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/releasevendor/4`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const vendor = await app.inject({
        method: 'POST',
        url: '/releasevendor',
        payload: {
          release_id: 3,
          vendor_id: 10,
          url: 'http://example.com',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(vendor.payload).id).to.equal(4);
    });

    it('should sanitize url', async function () {
      const token = await login(app);

      const response = await app.inject({
        method: 'POST',
        url: '/releasevendor',
        payload: {
          release_id: 3,
          vendor_id: 10,
          url:
            "<script>console.log('yo')</script> http://example.com",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).url).to.equal(
        'http://example.com',
      );
    });
  });

  describe('PATCH /releasevendor', function () {
    it('should update release_vendor database record', async function () {
      const token = await login(app);

      const getResponse = await app.inject({
        method: 'GET',
        url: '/releasevendor/1',
      });

      const vendor = JSON.parse(getResponse.payload);

      expect(vendor.url).to.equal('#');

      const newUrl = 'http://example.com';

      const response = await app.inject({
        method: 'PATCH',
        url: '/releasevendor',
        payload: {
          id: 1,
          url: newUrl,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).url).to.equal(newUrl);
    });
  });

  describe('DELETE /releasevendor', function () {
    it('should delete release_vendor database record', async function () {
      const token = await login(app);

      const vendorResponse = await app.inject({
        method: 'POST',
        url: '/releasevendor',
        payload: {
          release_id: 5,
          vendor_id: 3,
          url: 'http://example.com',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const vendor = JSON.parse(vendorResponse.payload);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/vendor/${vendor.id}`,
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(
        vendor.id,
      );

      await app.inject({
        method: 'DELETE',
        url: '/releasevendor',
        payload: {
          id: vendor.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/releasevendor/${vendor.id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
