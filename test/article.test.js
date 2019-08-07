import chai from 'chai';
import Article from '../models/Article';
import buildApp from '../app';

const expect = chai.expect;

describe('articles', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /articles', function() {
    it('should return 10 articles', async function() {
      const response = await app.inject({ method: 'GET', url: '/articles' });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /articles/:limit', function() {
      it('should return 11 articles if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/11'
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 articles if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/9'
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /articles/:limit/:order', function() {
      it("should return article with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/1/desc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return article with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/1/asc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });

      it('should return Object', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/1'
        });
        expect(JSON.parse(response.payload)[0]).to.be.an.instanceOf(Object);
      });
    });
  });

  describe('POST /article', function() {});
});
