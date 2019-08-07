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
      form.append('user_id', 1);
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
      firstForm.append('user_id', 1);
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
      secondForm.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
      form.append('user_id', 1);
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
});
