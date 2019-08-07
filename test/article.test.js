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

describe('articles', function() {
  let articlesDir = path.join(fileRoot(), assetDirectories.articles);
  let app;

  before(function() {
    rimraf(articlesDir, () => {});
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

    describe('GET /articles/count', function() {
      it('should return count of 11', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/count'
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(11);
      });
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

    describe('GET /articles/range/:offset/:limit/:order', function() {
      it("should return article with id of 11 with offset 1, limit 10 and order 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/articles/range/1/10/asc'
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(11);
      });
    });
  });

  describe('GET /article/:slug', function() {
    it('should return the article that has the :slug supplied', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/article/article-1'
      });
      expect(JSON.parse(response.payload).slug).to.equal('article-1');
    });
  });

  describe('POST /article', function() {
    it('should add article record to database', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);
      const slug = 'article-1000';

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/article/${slug}`
      });

      expect(beforeResponse.statusCode).to.equal(404);

      form.append('image', rs);
      form.append('title', 'Article 1000');
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const article = await app.inject(opts);
      const filename = JSON.parse(article.payload).filename;
      const destPath = path.join(articlesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;
      expect(JSON.parse(article.payload).slug).to.equal(slug);
    });

    it('should increment article slug when same slug already exists', async function() {
      const token = await login(app);
      let firstRs = fs.createReadStream(filePath);
      const title = 'Article 1001';
      const slug = 'article-1001';

      let firstForm = new FormData();

      firstForm.append('image', firstRs);
      firstForm.append('title', title);
      firstForm.append('summary', 'Test summary');
      firstForm.append('description', 'Test description');

      let firstOpts = {
        url: '/article',
        method: 'POST',
        payload: firstForm,
        headers: firstForm.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const firstRelease = await app.inject(firstOpts);

      expect(JSON.parse(firstRelease.payload).slug).to.equal(slug);

      let secondRs = fs.createReadStream(filePath);
      let secondForm = new FormData();
      secondForm.append('image', secondRs);
      secondForm.append('title', title);
      secondForm.append('summary', 'Test summary');
      secondForm.append('description', 'Test description');

      let secondOpts = {
        url: '/article',
        method: 'POST',
        payload: secondForm,
        headers: secondForm.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const secondRelease = await app.inject(secondOpts);

      expect(JSON.parse(secondRelease.payload).slug).to.equal(`${slug}-1`);
    });

    it('should not return error without an image', async function() {
      const token = await login(app);
      let form = new FormData();
      form.append('title', 'Article 1002');
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);
      expect(JSON.parse(response.payload).errors).to.have.length(0);
    });

    it('should return error with invalid title', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', '');
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal('title');
    });

    it('should return error with no description', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1003');
      form.append('summary', 'Test summary');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'description'
      );
    });

    it('should return error with invalid description', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1003');
      form.append('summary', 'Test summary');
      form.append('description', '');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal(
        'description'
      );
    });

    it('should sanitize description', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1003');
      form.append('summary', 'Test summary');
      form.append(
        'description',
        "<script>console.log('yo')</script> article description"
      );

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).description).to.equal(
        'article description'
      );
    });

    it('should sanitize summary', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1004');
      form.append(
        'summary',
        "<script>console.log('yo')</script> article summary"
      );
      form.append('description', 'Test description');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).summary).to.equal('article summary');
    });

    it('should sanitize title', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', "<script>console.log('yo')</script> Article 1005");
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const response = await app.inject(opts);

      expect(JSON.parse(response.payload).title).to.equal('Article 1005');
    });
  });

  describe('PATCH /article', function() {
    it('should update article record in database', async function() {
      const token = await login(app);
      const getResponse = await app.inject({
        method: 'GET',
        url: '/article/article-1'
      });

      const article = JSON.parse(getResponse.payload);

      expect(article.id).to.equal(1);
      expect(article.description).to.equal('Article 1 description');

      const newDescription = 'new article description';

      let form = new FormData();
      form.append('id', 1);
      form.append('description', newDescription);

      const response = await app.inject({
        method: 'PATCH',
        url: '/article',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      });

      expect(JSON.parse(response.payload).description).to.equal(newDescription);
    });

    it('should replace image with new one', async function() {
      const token = await login(app);
      let rs = fs.createReadStream(filePath);
      let original_form = new FormData();
      original_form.append('image', rs);
      original_form.append('user_id', 1);
      original_form.append('title', 'Test Article');
      original_form.append('summary', 'Test article summary');
      original_form.append('description', 'Test article description');

      let original_opts = {
        url: '/article',
        method: 'POST',
        payload: original_form,
        headers: original_form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const original_result = await app.inject(original_opts);
      const original_article = JSON.parse(original_result.payload);
      const filename = original_article.filename;
      const destPath = path.join(articlesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      const original_file = fs.readFileSync(destPath);

      let new_rs = fs.createReadStream(altFilePath);
      let new_form = new FormData();
      new_form.append('image', new_rs);
      new_form.append('id', original_article.id);

      let new_opts = {
        method: 'PATCH',
        url: '/article',
        payload: new_form,
        headers: new_form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      await app.inject(new_opts);

      const new_source = await fs.readFileSync(altFilePath);
      const new_file = await fs.readFileSync(destPath);

      expect(new_file).to.deep.equal(new_source);
      expect(new_file).to.not.deep.equal(original_file);
    });
  });

  describe('PATCH /article/publish', function() {
    it('should publish an unpublished article', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1006');
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');
      form.append('published', 'false');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const res = await app.inject(opts);
      const article = JSON.parse(res.payload);
      const published = Boolean(article.published);

      expect(published).to.be.false;

      const publishRes = await app.inject({
        url: '/article/publish',
        method: 'PATCH',
        body: {
          id: article.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const publishedArticle = JSON.parse(publishRes.payload);

      expect(publishedArticle.published).to.be.true;
    });
  });

  describe('PATCH /article/unpublish', function() {
    it('should unpublish an published article', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1007');
      form.append('summary', 'Test summary');
      form.append('description', 'Test description');
      form.append('published', 'true');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const res = await app.inject(opts);
      const article = JSON.parse(res.payload);
      const published = Boolean(article.published);

      expect(published).to.be.true;

      const unpublishRes = await app.inject({
        url: '/article/unpublish',
        method: 'PATCH',
        body: {
          id: article.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const unpublishedArticle = JSON.parse(unpublishRes.payload);

      expect(unpublishedArticle.published).to.be.false;
    });
  });

  describe('DELETE /article', function() {
    it('should delete article database record and image file', async function() {
      const token = await login(app);
      let form = new FormData();
      let rs = fs.createReadStream(filePath);

      form.append('image', rs);
      form.append('title', 'Article 1008');
      form.append('description', 'Test description');
      form.append('summary', 'Test summary');
      form.append('published', 'true');

      let opts = {
        url: '/article',
        method: 'POST',
        payload: form,
        headers: form.getHeaders({
          Authorization: `Bearer ${token}`
        })
      };

      const res = await app.inject(opts);
      const article = JSON.parse(res.payload);
      const filename = article.filename;
      const destPath = path.join(articlesDir, filename);

      expect(fs.existsSync(destPath)).to.be.true;

      await app.inject({
        method: 'DELETE',
        url: '/article',
        payload: {
          id: article.id
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/article/${article.slug}`
      });

      expect(afterResponse.statusCode).to.equal(404);
      expect(fs.existsSync(destPath)).to.be.false;
    });

    it('should return 404 when trying to delete article that doesn’t exist', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'DELETE',
        url: '/article',
        payload: {
          id: 2000
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
