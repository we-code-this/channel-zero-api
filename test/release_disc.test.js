import chai from 'chai';
import dateString from 'chai-date-string';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

chai.use(dateString);

describe('release_discs', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /discs', function() {
    it('should return 10 release discs', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/discs',
      });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /discs/:limit', function() {
      it('should return 11 release_discs if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/discs/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 release_discs if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/discs/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /discs/:limit/:order', function() {
      it("should return release_disc with id of 13 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/discs/1/desc',
        });

        expect(JSON.parse(response.payload)[0].id).to.equal(13);
      });

      it("should return release_disc with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/discs/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /discs/count', function() {
      it('should return count of 13', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/discs/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(13);
      });
    });

    describe('GET /release/:release_id/discs/count', function() {
      it('should return count of 1 with release_id of 1', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/1/discs/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(3);
      });
    });

    describe('GET /disc/:id', function() {
      it('should return the release_disc with an id of 2', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/disc/2',
        });
        expect(JSON.parse(response.payload).id).to.equal(2);
      });

      it("should return 404 if release_disc record doesn't exist in database", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/disc/4000',
        });

        expect(response.statusCode).to.equal(404);
      });
    });
  });

  describe('POST /disc', function() {
    it('should add release_disc record to database', async function() {
      const token = await login(app);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/disc/14`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const disc = await app.inject({
        method: 'POST',
        url: '/disc',
        payload: {
          release_id: 2,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(disc.payload).id).to.equal(14);
    });

    it('release_disc sort should equal release disc count', async function() {
      const token = await login(app);

      const releaseCountResponse = await app.inject({
        method: 'GET',
        url: `/release/2/discs/count`,
      });

      const releaseCount = JSON.parse(releaseCountResponse.payload)[0]
        .count;

      const disc = await app.inject({
        method: 'POST',
        url: '/disc',
        payload: {
          release_id: 2,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(disc.payload).sort).to.equal(releaseCount);
    });

    it('disc name should contain integer equalling release disc count + 1', async function() {
      const token = await login(app);

      const releaseCountResponse = await app.inject({
        method: 'GET',
        url: `/release/2/discs/count`,
      });

      const releaseCount = JSON.parse(releaseCountResponse.payload)[0]
        .count;

      const expectedName = `Disc ${parseInt(releaseCount) + 1}`;

      const disc = await app.inject({
        method: 'POST',
        url: '/disc',
        payload: {
          release_id: 2,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(disc.payload).name).to.equal(expectedName);
    });

    it('should allow overriding of default naming', async function() {
      const token = await login(app);
      const name = 'The Dope Disc';

      const disc = await app.inject({
        method: 'POST',
        url: '/disc',
        payload: {
          release_id: 2,
          name: name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(disc.payload).name).to.equal(name);
    });

    it('should sanitize name', async function() {
      const token = await login(app);

      const response = await app.inject({
        method: 'POST',
        url: '/disc',
        payload: {
          release_id: 2,
          name: "<script>console.log('yo')</script> Disc Name",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).name).to.equal('Disc Name');
    });
  });

  describe('PATCH /disc/:id', function() {
    it('should update release_disc database record', async function() {
      const token = await login(app);

      const getResponse = await app.inject({
        method: 'GET',
        url: '/disc/1',
      });

      const disc = JSON.parse(getResponse.payload);

      expect(disc.name).to.equal('Disc 1');

      const newName = 'Updated Disc Name';

      const response = await app.inject({
        method: 'PATCH',
        url: '/disc/1',
        payload: {
          name: newName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).name).to.equal(newName);
    });

    it("should return name field error of 'Invalid length'", async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'PATCH',
        url: '/disc/1',
        payload: {
          name: '',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'name',
      );
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        'Invalid length',
      );
    });
  });

  describe('DELETE /disc', function() {
    it('should delete disc database record', async function() {
      const token = await login(app);
      const id = 2;

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/disc/${id}`,
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(id);

      await app.inject({
        method: 'DELETE',
        url: '/disc',
        payload: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/disc/${id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });

    it('should update sort value of remaining release discs when one is deleted', async function() {
      const token = await login(app);
      const id = 12;
      const releaseId = 1;

      await app.inject({
        method: 'DELETE',
        url: '/disc',
        payload: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/release/${releaseId}/discs`,
      });

      const releaseDiscs = JSON.parse(afterResponse.payload);

      expect(releaseDiscs.length).to.equal(2);
      expect(releaseDiscs[0].sort).to.equal(0);
      expect(releaseDiscs[1].sort).to.equal(1);
    });
  });
});
