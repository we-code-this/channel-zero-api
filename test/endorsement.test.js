import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('endorsements', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /endorsements', function() {
    it('should return 10 endorsements', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements'
      });

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /endorsements/count', function() {
    it('should return count of 11', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/count'
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });

  describe('GET /endorsements/:limit', function() {
    it('should return 11 endorsements if :limit is 11', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/11'
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it('should return 9 endorsements if :limit is 9', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/9'
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe('GET /endorsements/:limit/:order', function() {
    it("should return endorsement with id of 11 when :limit 1 and :order 'desc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/1/desc'
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return endorsement with id of 1 when :limit 1 and :order 'asc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/1/asc'
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe('GET /endorsements/range/:offset/:limit/:order', function() {
    it("should return endorsements with IDs in range of 2-11 with :offset 1, :limit 10 and :order 'asc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/range/1/10/asc'
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(11);
    });
  });

  describe('GET /endorsements/type/:type', function() {
    it('should return 10 endorsements of :type release', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release'
      });
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /endorsements/type/:type/:offset/:limit/:order', function() {
    it("should return 5 endorsements of :type release with IDs in range of 2-6 with :offset 1, :limit 5 and :order 'asc'", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release/1/5/asc'
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(6);
    });
  });

  describe('GET /endorsements/type/:type/:related_id', function() {
    it('should return 2 endorsements of :type release with :related_id 1', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release/1'
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(2);
    });
  });
});
