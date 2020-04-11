import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('endorsements', function () {
  let app;

  before(function () {
    app = buildApp();
  });

  after(function () {
    app.close();
  });

  describe('GET /endorsements', function () {
    it('should return 10 endorsements', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements',
      });

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /endorsements/count', function () {
    it('should return count of 11', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/count',
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });

  describe('GET /endorsements/:limit', function () {
    it('should return 11 endorsements if :limit is 11', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/11',
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it('should return 9 endorsements if :limit is 9', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/9',
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe('GET /endorsements/:limit/:order', function () {
    it("should return endorsement with id of 11 when :limit 1 and :order 'desc'", async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/1/desc',
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return endorsement with id of 1 when :limit 1 and :order 'asc'", async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/1/asc',
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe('GET /endorsements/range/:offset/:limit/:order', function () {
    it("should return endorsements with IDs in range of 2-11 with :offset 1, :limit 10 and :order 'asc'", async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/range/1/10/asc',
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(11);
    });
  });

  describe('GET /endorsements/type/:type', function () {
    it('should return 10 endorsements of :type release', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release',
      });
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /endorsements/type/:type/:offset/:limit/:order', function () {
    it("should return 5 endorsements of :type release with IDs in range of 2-6 with :offset 1, :limit 5 and :order 'asc'", async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release/1/5/asc',
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(6);
    });
  });

  describe('GET /endorsements/type/:type/:related_id', function () {
    it('should return 2 endorsements of :type release with :related_id 1', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/endorsements/type/release/1',
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(2);
    });
  });

  describe('GET /endorsement/:id', function () {
    it('should return the endorsement that has the :id supplied', async function () {
      const id = 1;
      const response = await app.inject({
        method: 'GET',
        url: `/endorsement/${id}`,
      });

      expect(JSON.parse(response.payload).id).to.equal(id);
    });
  });

  describe('POST /endorsement', function () {
    it('should add endorsement record to database', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 2,
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'release',
      };

      const endorsement = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(endorsement.payload).related_id).to.equal(
        newEndorsement.related_id,
      );
      expect(JSON.parse(endorsement.payload).review).to.equal(
        newEndorsement.review,
      );
      expect(JSON.parse(endorsement.payload).reviewer).to.equal(
        newEndorsement.reviewer,
      );
      expect(JSON.parse(endorsement.payload).url).to.equal(
        newEndorsement.url,
      );
      expect(JSON.parse(endorsement.payload).url).to.equal(
        newEndorsement.url,
      );
      expect(JSON.parse(endorsement.payload).type).to.equal(
        newEndorsement.type,
      );
    });

    it('should sanitize review', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 3,
        review: "<script>console.log('yo')</script> Test review",
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).review).to.equal(
        'Test review',
      );
    });

    it('should sanitize reviewer', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 4,
        review: 'Test review',
        reviewer: "<script>console.log('yo')</script> Test reviewer",
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).reviewer).to.equal(
        'Test reviewer',
      );
    });

    it('should sanitize type', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 4,
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: "<script>console.log('yo')</script> release",
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).type).to.equal('release');
    });

    it('should return error when non-integer related_id provided', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 'bad',
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('related_id');
      expect(parsedResponse.errors[0].message).to.equal(
        'Invalid data',
      );
    });

    it('should return error when review is too short', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 1,
        review: '',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('review');
      expect(parsedResponse.errors[0].message).to.equal(
        'Review is required',
      );
    });

    it('should return error when reviewer is too short', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 1,
        review: 'Test review',
        reviewer: '',
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('reviewer');
      expect(parsedResponse.errors[0].message).to.equal(
        'Invalid length',
      );
    });

    it('should return error when reviewer is too long', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 1,
        review: 'Test review',
        reviewer:
          'Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        url: 'http://testreview.com',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('reviewer');
      expect(parsedResponse.errors[0].message).to.equal(
        'Invalid length',
      );
    });

    it('should return error when invalid url is provided', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 1,
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'invalid-url',
        type: 'release',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('url');
      expect(parsedResponse.errors[0].message).to.equal(
        'Invalid URL',
      );
    });

    it('should return error when invalid type is provided', async function () {
      const token = await login(app);
      const newEndorsement = {
        related_id: 1,
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'invalid-type',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: newEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('type');
      expect(parsedResponse.errors[0].message).to.equal(
        'Invalid type',
      );
    });
  });

  describe('PATCH /endorsement', function () {
    it('should update endorsement database record', async function () {
      const token = await login(app);
      const originalEndorsement = {
        related_id: 5,
        review: 'Test review',
        reviewer: 'Test reviewer',
        url: 'http://testreview.com',
        type: 'release',
      };

      const endorsement = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: originalEndorsement,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const returnedEndorsement = JSON.parse(endorsement.payload);
      const newUrl = 'http://testreview-updated.com';

      const updatedEndorsement = await app.inject({
        method: 'PATCH',
        url: '/endorsement',
        payload: {
          id: returnedEndorsement.id,
          review: returnedEndorsement.review,
          reviewer: returnedEndorsement.reviewer,
          url: newUrl,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(updatedEndorsement.payload).url).to.equal(
        newUrl,
      );
    });
  });

  describe('DELETE /endorsement', function () {
    it('should delete endorsement database record', async function () {
      const token = await login(app);
      const newEndorsementResponse = await app.inject({
        method: 'POST',
        url: '/endorsement',
        payload: {
          related_id: 6,
          review: 'Test review',
          reviewer: 'Test reviewer',
          url: 'http://testreview.com',
          type: 'release',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const endorsement = JSON.parse(newEndorsementResponse.payload);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/endorsement/${endorsement.id}`,
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(
        endorsement.id,
      );

      await app.inject({
        method: 'DELETE',
        url: '/endorsement',
        payload: {
          id: endorsement.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/endorsement/${endorsement.id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
