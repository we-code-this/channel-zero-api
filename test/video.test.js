import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('videos', function () {
  let app;

  before(function () {
    app = buildApp();
  });

  after(function () {
    app.close();
  });

  describe('GET /videos', function () {
    it('should return 10 videos', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/videos',
      });

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /videos/count', function () {
      it('should return count of 11', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });

    describe('GET /videos/:limit', function () {
      it('should return 11 videos if :limit is 11', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 videos if :limit is 9', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /videos/:limit/:order', function () {
      it("should return video with id of 11 when :order is 'desc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/1/desc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return video with id of 1 when :order is 'asc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /videos/range/:offset/:limit/:order', function () {
      it("should return video with id of 11 with :offset 1, :limit 10 and :order 'asc'", async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/range/1/10/asc',
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });

    describe('GET /videos/by/title', function () {
      it('should return all videos sorted by title', async function () {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/by/title',
        });

        const results = JSON.parse(response.payload);

        expect(results[0].title).to.equal('Video 1');
        expect(results[1].title).to.equal('Video 10');
        expect(results[2].title).to.equal('Video 11');
      });
    });
  });

  describe('GET /video/:id', function () {
    it('should return the video that has the :id supplied', async function () {
      const response = await app.inject({
        method: 'GET',
        url: '/video/1',
      });
      expect(JSON.parse(response.payload).src).to.equal(
        'http://video-1.com',
      );
    });
  });

  describe('POST /video', function () {
    it('should add video record to database', async function () {
      const token = await login(app);
      const newVideo = {
        src: 'http://video-2000.com',
        title: 'Test Video',
      };

      const video = await app.inject({
        method: 'POST',
        url: '/video',
        payload: newVideo,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(video.payload).src).to.equal(newVideo.src);
      expect(JSON.parse(video.payload).title).to.equal(
        newVideo.title,
      );
    });

    it('should sanitize src', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src:
            "<script>console.log('yo')</script> http://video-2001.com",
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'http://video-2001.com',
      );
    });

    it('should sanitize title', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-2001.com',
          title: "<script>console.log('yo')</script> Test Video",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).title).to.equal(
        'Test Video',
      );
    });

    it('should parse youtube page url and convert to embed url', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'https://www.youtube.com/watch?v=rDZwPhwDGtY',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'https://www.youtube.com/embed/rDZwPhwDGtY',
      );
    });

    it('should not parse youtube embed url', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'https://www.youtube.com/embed/rDZwPhwDGtY',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'https://www.youtube.com/embed/rDZwPhwDGtY',
      );
    });

    it('should parse vimeo page url and convert to embed url', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'https://vimeo.com/407694202',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'https://player.vimeo.com/video/407694202',
      );
    });

    it('should not parse vimeo embed url', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'https://player.vimeo.com/video/407694202',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'https://player.vimeo.com/video/407694202',
      );
    });
  });

  describe('PATCH /video', function () {
    it('should update video database record', async function () {
      const token = await login(app);
      const video = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-2003.com',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const returnedVideo = JSON.parse(video.payload);
      const newSrc = 'http://video-2003-updated.com';

      const updatedVideo = await app.inject({
        method: 'PATCH',
        url: '/video',
        payload: {
          id: returnedVideo.id,
          title: returnedVideo.title,
          src: newSrc,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(updatedVideo.payload).src).to.equal(newSrc);
    });
  });

  describe('DELETE /video', function () {
    it('should delete video database record', async function () {
      const token = await login(app);

      const newVideoResponse = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-3000.com',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const video = JSON.parse(newVideoResponse.payload);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/video/${video.id}`,
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(
        video.id,
      );

      await app.inject({
        method: 'DELETE',
        url: '/video',
        payload: {
          id: video.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/video/${video.id}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
    });

    it('should delete associated feature', async function () {
      const token = await login(app);

      const newVideoResponse = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-3000.com',
          title: 'Test Video',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const video = JSON.parse(newVideoResponse.payload);

      const newFeatureResponse = await app.inject({
        method: 'POST',
        url: '/feature',
        payload: {
          article_id: 1,
          video_id: video.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const feature = JSON.parse(newFeatureResponse.payload);

      await app.inject({
        method: 'DELETE',
        url: '/video',
        payload: {
          id: video.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterFeatureResponse = await app.inject({
        method: 'GET',
        url: `/feature/${feature.id}`,
      });

      expect(afterFeatureResponse.statusCode).to.equal(404);
    });
  });
});
