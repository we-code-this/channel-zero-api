import chai from 'chai';
import path from 'path';
import fs from 'fs-extra';
import dateString from 'chai-date-string';
import rimraf from 'rimraf';
import FormData from 'form-data';
import buildApp from '../app';
import { fileRoot, assetDirectories } from '../lib/files';
import { login } from './login';

const filePath = path.join(__dirname, 'test.png');
const altFilePath = path.join(__dirname, 'test-alt.png');

const expect = chai.expect;

chai.use(dateString);

describe('releases', function() {
  let releasesDir = path.join(fileRoot(), assetDirectories.releases);
  let app;

  before(function() {
    rimraf(releasesDir, () => {});
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /releases', function() {
    it('should return 10 releases', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/releases',
      });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8',
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /releases/:limit', function() {
      it('should return 11 releases if :limit is 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/11',
        });
        expect(JSON.parse(response.payload).length).to.equal(11);
      });

      it('should return 9 releases if :limit is 9', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/9',
        });
        expect(JSON.parse(response.payload).length).to.equal(9);
      });
    });

    describe('GET /releases/:limit/:order', function() {
      it("should return release with id of 11 when :order is 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/1/desc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(11);
      });

      it("should return release with id of 1 when :order is 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/1/asc',
        });
        expect(JSON.parse(response.payload)[0].id).to.equal(1);
      });
    });

    describe('GET /releases/unpublished/:offset/:limit/:order', function() {
      it("should return releases with IDs in range of 12 to 3 with offset 0, limit 10 and order 'desc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/unpublished/0/10/desc',
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(12);
        expect(results[results.length - 1].id).to.equal(3);
      });
    });

    describe('GET /releases/range/:offset/:limit/:order', function() {
      it("should return release with id of 11 with offset 1, limit 10 and order 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/range/1/10/asc',
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });

    describe('GET /releases/count', function() {
      it('should return count of 12', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/releases/count',
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(12);
      });
    });
  });

  describe('GET /release/:slug', function() {
    it('should return the release that has the :slug supplied', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/release/artist-9-album-9',
      });

      expect(JSON.parse(response.payload).slug).to.equal(
        'artist-9-album-9',
      );
    });

    describe('release artist relationship', function() {
      it('should return the release with an artist property', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(JSON.parse(response.payload)).to.have.property(
          'artist',
        );
      });

      it("should return the release with an artist property that's an object", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(
          JSON.parse(response.payload).artist,
        ).to.be.an.instanceof(Object);
      });
    });

    describe('release vendors relationship', function() {
      it('should return the release with a vendors property', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(JSON.parse(response.payload)).to.have.property(
          'vendors',
        );
      });

      it("should return the release with a vendors property that's an array", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(
          JSON.parse(response.payload).vendors,
        ).to.be.an.instanceOf(Array);
      });

      it('should return the release with 3 vendors', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(JSON.parse(response.payload).vendors.length).to.equal(
          3,
        );
      });
    });

    describe('release credits relationship', function() {
      it('should return the release with a credits property', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(JSON.parse(response.payload)).to.have.property(
          'credits',
        );
      });

      it("should return the release with a credits property that's an array", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(
          JSON.parse(response.payload).credits,
        ).to.be.an.instanceOf(Array);
      });

      it('should return the release with 10 credits', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(JSON.parse(response.payload).credits.length).to.equal(
          10,
        );
      });
    });

    describe('release endorsements relationship', function() {
      it('should return the release with a endorsements property', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(JSON.parse(response.payload)).to.have.property(
          'endorsements',
        );
      });

      it("should return the release with a endorsements property that's an array", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(
          JSON.parse(response.payload).endorsements,
        ).to.be.an.instanceOf(Array);
      });

      it('should return the release with 2 endorsements', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(
          JSON.parse(response.payload).endorsements.length,
        ).to.equal(2);
      });
    });

    describe('release label relationship', function() {
      it('should return the release with a label property', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-1-album-1',
        });
        expect(JSON.parse(response.payload)).to.have.property(
          'label',
        );
      });

      it("should return the release with a label property that's an object", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/release/artist-9-album-9',
        });
        expect(
          JSON.parse(response.payload).label,
        ).to.be.an.instanceof(Object);
      });

      describe('release label id', function() {
        it('should have a label property with an id', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            'id',
          );
        });

        it('should have a label property with an integer id', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label.id).to.be.a(
            'number',
          );
        });
      });

      describe('release label name', function() {
        it('should have a label property with a name', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            'name',
          );
        });

        it('should have a label property with a name string', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label.name).to.be.a(
            'string',
          );
        });
      });

      describe('release label slug', function() {
        it('should have a label property with a slug', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            'slug',
          );
        });

        it('should have a label property with a slug string', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label.slug).to.be.a(
            'string',
          );
        });
      });

      describe('release label created_at', function() {
        it('should have a label property with a created_at property', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            'created_at',
          );
        });

        it('should have a label property with a created_at datetime string', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(
            JSON.parse(response.payload).label.created_at,
          ).to.be.a.dateString();
        });
      });

      describe('release label updated_at', function() {
        it('should have a label property with an updated_at property', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(JSON.parse(response.payload).label).to.have.property(
            'updated_at',
          );
        });

        it('should have a label property with an updated_at datetime string', async function() {
          const response = await app.inject({
            method: 'GET',
            url: '/release/artist-9-album-9',
          });
          expect(
            JSON.parse(response.payload).label.updated_at,
          ).to.be.a.dateString();
        });
      });
    });
  });

  describe('POST /release', function() {
    it('should add release record to database', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);
      const slug = 'artist-2-album-1000';

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/release/${slug}`,
      });

      expect(beforeResponse.statusCode).to.equal(404);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1000');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1000');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const release = await app.inject(opts);
      const filename = JSON.parse(release.payload).filename;
      const destPath = path.join(releasesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;
      expect(JSON.parse(release.payload).slug).to.equal(slug);
    });

    it('should increment release slug when same slug already exists', async function() {
      const token = await login(app);
      let firstRs = fs.createReadStream(filePath);
      const title = 'Release 1002';
      const slug = 'artist-2-release-1002';

      let firstForm = new FormData();

      firstForm.append('image', firstRs);
      firstForm.append('artist_id', 2);
      firstForm.append('label_id', 1);
      firstForm.append('title', title);
      firstForm.append('description', 'Test description');
      firstForm.append('catalog_number', 'cat1002');
      firstForm.append('release_date', '2019-02-01');
      firstForm.append('release_type', 'Album');

      let firstOpts = {
        url: '/release',
        method: 'POST',
        payload: firstForm,
        headers: firstForm.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const firstRelease = await app.inject(firstOpts);

      expect(JSON.parse(firstRelease.payload).slug).to.equal(slug);

      let secondRs = fs.createReadStream(filePath);
      let secondForm = new FormData();
      secondForm.append('image', secondRs);
      secondForm.append('artist_id', 2);
      secondForm.append('label_id', 1);
      secondForm.append('title', title);
      secondForm.append('description', 'Test description');
      secondForm.append('catalog_number', 'cat0003');
      secondForm.append('release_date', '2019-02-01');
      secondForm.append('release_type', 'Album');

      let secondOpts = {
        url: '/release',
        method: 'POST',
        payload: secondForm,
        headers: secondForm.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const secondRelease = await app.inject(secondOpts);

      expect(JSON.parse(secondRelease.payload).slug).to.equal(
        `${slug}-1`,
      );
    });

    it('should return error without an image', async function() {
      const token = await login(app);
      let form = new FormData();
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1001');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-02-01');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'image',
      );
    });

    it('should return error with invalid title', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', '');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'title',
      );
    });

    it('should return error with invalid catalog_number', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'release title');
      form.append('description', 'Test description');
      form.append('catalog_number', '');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'catalog_number',
      );
    });

    it('should return error with invalid release_type', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'release title');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-02-01');
      form.append('release_type', '');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'release_type',
      );
    });

    it('should return error with invalid release_date', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'release title');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-2-01');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'release_date',
      );
    });

    it('should sanitize description', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1001');
      form.append(
        'description',
        "<script>console.log('yo')</script> release description",
      );
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).description).to.equal(
        'release description',
      );
    });

    it('should sanitize title', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append(
        'title',
        "<script>console.log('yo')</script> release title",
      );
      form.append('description', 'Album description');
      form.append('catalog_number', 'cat1002');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).title).to.equal(
        'release title',
      );
    });

    it('should sanitize catalog_number', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'release title');
      form.append('description', 'Album description');
      form.append(
        'catalog_number',
        "<script>console.log('yo')</script> cat1003",
      );
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).catalog_number).to.equal(
        'cat1003',
      );
    });

    it('should sanitize release_type', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'release title');
      form.append('description', 'Album description');
      form.append('catalog_number', 'cat1003');
      form.append('release_date', '2019-02-01');
      form.append(
        'release_type',
        "<script>console.log('yo')</script> Album",
      );

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).release_type).to.equal(
        'Album',
      );
    });
  });

  describe('PATCH /release', function() {
    it('should update release record in database', async function() {
      const token = await login(app);
      const getResponse = await app.inject({
        method: 'GET',
        url: '/release/artist-1-album-1',
      });

      const release = JSON.parse(getResponse.payload);

      expect(release.id).to.equal(1);
      expect(release.description).to.equal('album description');

      const newDescription = 'new album description';

      let form = new FormData();
      form.append('id', 1);
      form.append('description', newDescription);

      const response = await app.inject({
        method: 'PATCH',
        url: '/release',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      });

      expect(JSON.parse(response.payload).description).to.equal(
        newDescription,
      );
    });

    it('should replace image with new one', async function() {
      const token = await login(app);
      let rs = fs.createReadStream(filePath);
      let original_form = new FormData();
      original_form.append('image', rs);
      original_form.append('artist_id', 2);
      original_form.append('label_id', 2);
      original_form.append('title', 'Test Album');
      original_form.append('description', 'Test album description');
      original_form.append('catalog_number', 'cat1003');
      original_form.append('release_date', '2019-02-01');
      original_form.append('release_type', 'Album');

      let original_opts = {
        url: '/release',
        method: 'POST',
        payload: original_form,
        headers: original_form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const original_result = await app.inject(original_opts);
      const original_release = JSON.parse(original_result.payload);
      const filename = original_release.filename;
      const destPath = path.join(releasesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      const original_file = fs.readFileSync(destPath);

      let new_rs = fs.createReadStream(altFilePath);
      let new_form = new FormData();
      new_form.append('image', new_rs);
      new_form.append('id', original_release.id);

      let new_opts = {
        method: 'PATCH',
        url: '/release',
        payload: new_form,
        headers: new_form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      await app.inject(new_opts);

      const new_source = await fs.readFileSync(altFilePath);
      const new_file = await fs.readFileSync(destPath);

      expect(new_file).to.deep.equal(new_source);
      expect(new_file).to.not.deep.equal(original_file);
    });

    it('should return error with invalid title', async function() {
      const token = await login(app);
      let form = new FormData();
      form.append('id', 1);
      form.append('title', '');

      let opts = {
        url: '/release',
        method: 'PATCH',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'title',
      );
    });
  });

  describe('PATCH /release/publish', function() {
    it('should publish an unpublished release', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1001');
      form.append('published', 'false');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1001');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const res = await app.inject(opts);
      const release = JSON.parse(res.payload);
      const published = Boolean(release.published);

      expect(published).to.be.false;

      const publishRes = await app.inject({
        url: '/release/publish',
        method: 'PATCH',
        body: {
          id: release.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const publishedRelease = JSON.parse(publishRes.payload);

      expect(publishedRelease.published).to.be.true;
    });
  });

  describe('PATCH /release/unpublish', function() {
    it('should unpublish an published release', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1002');
      form.append('published', 'true');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1002');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const res = await app.inject(opts);
      const release = JSON.parse(res.payload);
      const published = Boolean(release.published);

      expect(published).to.be.true;

      const unpublishRes = await app.inject({
        url: '/release/unpublish',
        method: 'PATCH',
        body: {
          id: release.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const unpublishedRelease = JSON.parse(unpublishRes.payload);

      expect(unpublishedRelease.published).to.be.false;
    });
  });

  describe('DELETE /release', function() {
    it('should delete release database record and image file', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('artist_id', 2);
      form.append('label_id', 1);
      form.append('title', 'Album 1003');
      form.append('published', 'true');
      form.append('description', 'Test description');
      form.append('catalog_number', 'cat1003');
      form.append('release_date', '2019-02-01');
      form.append('release_type', 'Album');

      let opts = {
        url: '/release',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`,
        }),
      };

      const res = await app.inject(opts);
      const release = JSON.parse(res.payload);
      const filename = release.filename;
      const destPath = path.join(releasesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      await app.inject({
        method: 'DELETE',
        url: '/release',
        payload: {
          id: release.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/release/${release.slug}`,
      });

      expect(afterResponse.statusCode).to.equal(404);
      expect(fs.existsSync(destPath)).to.be.false;
    });

    it('should return 404 when trying to delete release that doesn’t exist', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'DELETE',
        url: '/release',
        payload: {
          id: 2000,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
