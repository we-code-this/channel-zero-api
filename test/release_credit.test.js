import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('release_credits', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /credits', function() {
    it('should return 10 release credits', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/credits',
      });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /credits/:limit', function() {
      it('should return 11 release_credits if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credits/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 release_credits if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credits/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /credits/:limit/:order', function() {
      it("should return release_credit with id of 13 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credits/1/desc',
        });

        expect(JSON.parse(response.payload)[0].id).to.equal(13);
      });

      it("should return release_credit with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credits/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /release/:release_id/discs', function() {
      it('should return 3 release credits', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/2/credits',
        });

        expect(JSON.parse(response.payload).length).to.equal(3);
      });
    });

    describe('GET /credit/:id', function() {
      it('should return the release_credit with an id of 2', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credit/2',
        });
        expect(JSON.parse(response.payload).id).to.equal(2);
      });

      it("should return 404 if release_disc record doesn't exist in database", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/credit/4000',
        });

        expect(response.statusCode).to.equal(404);
      });
    });
  });

  describe('POST /credit', function() {
    it('should add release_credit record to database', async function() {
      const token = await login(app);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/credit/15`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const credit = await app.inject({
        method: 'POST',
        url: '/credit',
        payload: {
          release_id: 3,
          label: 'Credit label',
          value: 'Credit value',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(credit.payload).id).to.equal(15);
    });

    it('should sanitize label', async function() {
      const token = await login(app);

      const response = await app.inject({
        method: 'POST',
        url: '/credit',
        payload: {
          release_id: 2,
          label: "<script>console.log('yo')</script> Credit Label",
          value: 'credit value',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).label).to.equal(
        'Credit Label',
      );
    });

    it('should sanitize value', async function() {
      const token = await login(app);

      const response = await app.inject({
        method: 'POST',
        url: '/credit',
        payload: {
          release_id: 2,
          label: 'Credit Label',
          value: "<script>console.log('yo')</script> Credit Value",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).value).to.equal(
        'Credit Value',
      );
    });
  });

  describe('PATCH /credit', function() {
    it('should update release_credit database record', async function() {
      const token = await login(app);

      const getResponse = await app.inject({
        method: 'GET',
        url: '/credit/1',
      });

      const credit = JSON.parse(getResponse.payload);

      expect(credit.label).to.equal('Credit Label 1');

      const newLabel = 'Updated Credit Label';

      const response = await app.inject({
        method: 'PATCH',
        url: '/credit',
        payload: {
          id: 1,
          name: newLabel,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).label).to.equal(newLabel);
    });

    it("should return label field error of 'Invalid length'", async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'PATCH',
        url: '/credit',
        payload: {
          id: 1,
          label: '',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'label',
      );
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        'Invalid length',
      );
    });

    it("should return value field error of 'Invalid length'", async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'PATCH',
        url: '/credit',
        payload: {
          id: 1,
          value: '',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'value',
      );
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        'Invalid length',
      );
    });
  });

  describe('DELETE /credit', function() {
    it('should delete credit database record', async function() {
      const token = await login(app);

      const creditResponse = await app.inject({
        method: 'POST',
        url: '/credit',
        payload: {
          release_id: 5,
          label: 'Credit label',
          value: 'Credit value',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const credit = JSON.parse(creditResponse.payload);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/credit/${credit.id}`,
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(
        credit.id,
      );

      await app.inject({
        method: 'DELETE',
        url: '/credit',
        payload: {
          id: credit.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/credit/${credit.id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
