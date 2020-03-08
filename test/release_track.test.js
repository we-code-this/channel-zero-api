import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('release_tracks', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /tracks', function() {
    it('should return 10 release tracks', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/tracks',
      });

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /tracks/:limit', function() {
      it('should return 11 release_tracks if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/tracks/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 release_tracks if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/tracks/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /tracks/:limit/:order', function() {
      it("should return release_track with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/tracks/1/desc',
        });

        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return release_disc with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/tracks/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /tracks/count', function() {
      it('should return count of 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/tracks/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });

    describe('GET /disc/:disc_id/tracks/count', function() {
      it('should return count of 9 with release_id of 1', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/disc/1/tracks/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(9);
      });
    });

    describe('GET /disc/:disc_id/track/:slug', function() {
      it('should return the release_track with a slug of disc_id of 2 and slug of track-1', async function() {
        const slug = 'track-1';
        const discId = 2;

        const response = await app.inject({
          method: 'GET',
          url: `/disc/${discId}/track/${slug}`,
        });
        expect(JSON.parse(response.payload).disc_id).to.equal(discId);
        expect(JSON.parse(response.payload).slug).to.equal(slug);
      });

      it("should return 404 if release_track record doesn't exist in database", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/disc/1/track/non-existant-track',
        });

        expect(response.statusCode).to.equal(404);
      });
    });
  });

  describe('POST /track', function() {
    it('should add release_track record to database', async function() {
      const token = await login(app);
      const trackId = 13;

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/track/${trackId}`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      const track = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          title: 'Track 1',
          disc_id: 3,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(track.payload).id).to.equal(trackId);
    });

    it("should return title field error of 'Invalid length' when empty title provided", async function() {
      const token = await login(app);

      const response = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 1,
          title: '',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'title',
      );
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        'Invalid length',
      );
    });

    it('track number should equal disc track count + 1 by default when not provided', async function() {
      const token = await login(app);

      const discTrackCountResponse = await app.inject({
        method: 'GET',
        url: `/disc/2/tracks/count`,
      });

      const trackCount = JSON.parse(discTrackCountResponse.payload)[0]
        .count;

      const track = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 2,
          title: 'Track Title',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(track.payload).number).to.equal(
        trackCount + 1,
      );
    });

    it('should increment slug when two tracks from the same disc share the same title', async function() {
      const token = await login(app);
      const discId = 3;
      const trackTitle = 'Track Title';

      const trackOne = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: discId,
          title: trackTitle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(trackOne.payload).slug).to.equal(
        'track-title',
      );

      const trackTwo = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: discId,
          title: trackTitle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(trackTwo.payload).slug).to.equal(
        'track-title-1',
      );
    });

    it('should not increment slug when two tracks from different discs share the same title', async function() {
      const token = await login(app);
      const trackTitle = 'Track Title';

      const trackOne = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 4,
          title: trackTitle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(trackOne.payload).slug).to.equal(
        'track-title',
      );

      const trackTwo = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 5,
          title: trackTitle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(trackTwo.payload).slug).to.equal(
        'track-title',
      );
    });

    it('should allow overriding of default numbering', async function() {
      const token = await login(app);
      const trackNumber = 33;

      const track = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 6,
          title: 'Track Title',
          number: trackNumber,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(track.payload).number).to.equal(trackNumber);
    });

    it('should sanitize number', async function() {
      const token = await login(app);

      const track = await app.inject({
        method: 'POST',
        url: '/track',
        payload: {
          disc_id: 7,
          title: 'Track Title',
          number: "<script>console.log('yo')</script> 34",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(track.payload).number).to.equal(34);
    });
  });

  describe('PATCH /track', function() {
    it('should update release_track database record', async function() {
      const token = await login(app);

      const getResponse = await app.inject({
        method: 'GET',
        url: '/disc/1/track/track-1',
      });

      const track = JSON.parse(getResponse.payload);

      expect(track.title).to.equal('Track 1');

      const newTitle = 'Updated Track Title';

      const response = await app.inject({
        method: 'PATCH',
        url: '/track',
        payload: {
          id: 1,
          title: newTitle,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).title).to.equal(newTitle);
    });
  });

  describe('DELETE /track', function() {
    it('should delete track database record', async function() {
      const token = await login(app);
      const slug = 'track-1';

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/disc/1/track/${slug}`,
      });

      const track = JSON.parse(beforeResponse.payload);

      expect(track.slug).to.equal(slug);

      await app.inject({
        method: 'DELETE',
        url: '/track',
        payload: {
          id: track.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/disc/1/track/${slug}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
