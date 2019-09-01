import chai from 'chai';
import buildApp from '../app';
import { login } from './login';

const expect = chai.expect;

describe('videos', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /videos', function() {
    it('should return 10 videos', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/videos'
      });

      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /videos/count', function() {
      it('should return count of 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/count'
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
    });

    describe('GET /videos/:limit', function() {
      it('should return 11 videos if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/11'
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 videos if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/9'
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /videos/:limit/:order', function() {
      it("should return video with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/1/desc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return video with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/1/asc'
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /videos/range/:offset/:limit/:order', function() {
      it("should return video with id of 11 with :offset 1, :limit 10 and :order 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/videos/range/1/10/asc'
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });
  });

  describe('GET /videos/:id', function() {
    it('should return the video that has the :id supplied', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/video/1'
      });
      expect(JSON.parse(response.payload).src).to.equal('http://video-1.com');
    });
  });

  describe('POST /video', function() {
    it('should add video record to database', async function() {
      const token = await login(app);
      const src = 'http://video-2000.com';

      const video = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(video.payload).src).to.equal(src);
    });

    it('should sanitize src', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: "<script>console.log('yo')</script> http://video-2001.com"
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload).src).to.equal(
        'http://video-2001.com'
      );
    });
  });

  describe('PATCH /video', function() {
    it('should update video database record', async function() {
      const token = await login(app);
      const video = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-2003.com'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const videoId = JSON.parse(video.payload).id;
      const newSrc = 'http://video-2003-updated.com';

      const updatedVideo = await app.inject({
        method: 'PATCH',
        url: '/video',
        payload: {
          id: videoId,
          src: newSrc
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(updatedVideo.payload).src).to.equal(newSrc);
    });

    it('should sanitize src', async function() {
      const token = await login(app);
      const video = await app.inject({
        method: 'POST',
        url: '/video',
        payload: {
          src: 'http://video-2004.com'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const videoId = JSON.parse(video.payload).id;

      const newSrc =
        "<script>console.log('yo')</script> http://video-2004-updated.com";

      const updatedVideo = await app.inject({
        method: 'PATCH',
        url: '/video',
        payload: {
          id: videoId,
          src:
            "<script>console.log('yo')</script> http://video-2004-updated.com"
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(updatedVideo.payload).src).to.equal(
        'http://video-2004-updated.com'
      );
    });
  });

  describe('DELETE /video', function() {
    it('should delete video database record', async function() {
      const token = await login(app);
      const id = 1;

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/video/${id}`
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(1);

      await app.inject({
        method: 'DELETE',
        url: '/video',
        payload: {
          id: id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/video/${id}`
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
