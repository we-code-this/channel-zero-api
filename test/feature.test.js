import chai from 'chai';
import { default as buildApp } from '../app';
import { login } from './login';

const expect = chai.expect;

describe('features', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /features', function() {
    it('should return 10 features', async function() {
      const response = await app.inject({ method: 'GET', url: '/features' });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /features/:limit', function() {
      it('should return 11 features if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/features/11'
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 features if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/features/9'
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /features/:limit/:order', function() {
      it("should return feature with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/features/1/desc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return feature with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/features/1/asc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /features/range/:offset/:limit/:order', function() {
      it("should return feature with id of 11 with :offset 1, :limit 10 and :order 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/features/range/1/10/asc'
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });
  });

  describe('GET /features/count', function() {
    it('should return count of 11', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/features/count'
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });

  describe('GET /feature', function() {
    it('should return most recent feature', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature'
      });

      expect(JSON.parse(response.payload).id).to.equal(11);
    });

    it('should return feature with an article property', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature'
      });
      expect(JSON.parse(response.payload)).to.have.property('article');
    });

    it("should return feature with an article property that's an object", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature'
      });
      expect(JSON.parse(response.payload).article).to.be.an.instanceof(Object);
    });

    it('should return feature with a video property', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature'
      });
      expect(JSON.parse(response.payload)).to.have.property('video');
    });

    it("should return feature with a video property that's an object", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature'
      });
      expect(JSON.parse(response.payload).video).to.be.an.instanceof(Object);
    });
  });

  describe('GET /feature/:id', function() {
    it('should return the feature that has the :id supplied', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/feature/1'
      });

      expect(JSON.parse(response.payload).article.title).to.equal('Article 1');
      expect(JSON.parse(response.payload).video.src).to.equal(
        'http://video-1.com'
      );
    });
  });

  describe('POST /feature', function() {
    it('should add feature record to database', async function() {
      const token = await login(app);

      const feature = await app.inject({
        method: 'POST',
        url: '/feature',
        payload: {
          article_id: 1,
          video_id: 3
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(feature.payload).article.title).to.equal('Article 1');
      expect(JSON.parse(feature.payload).video.src).to.equal(
        'http://video-3.com'
      );
    });
  });

  describe('PATCH /feature', function() {
    it('should update feature database record', async function() {
      const token = await login(app);
      const articleId = 1;
      const feature = await app.inject({
        method: 'POST',
        url: '/feature',
        payload: {
          article_id: articleId,
          video_id: 1
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const featureId = JSON.parse(feature.payload).id;
      const newVideoId = 5;

      const updatedFeature = await app.inject({
        method: 'PATCH',
        url: '/feature',
        payload: {
          id: featureId,
          article_id: articleId,
          video_id: newVideoId
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(updatedFeature.payload).video.src).to.equal(
        'http://video-5.com'
      );
    });
  });

  describe('DELETE /feature', function() {
    it('should delete feature database record', async function() {
      const token = await login(app);
      const id = 1;

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/feature/${id}`
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(id);

      await app.inject({
        method: 'DELETE',
        url: '/feature',
        payload: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/feature/${id}`
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
