import chai from 'chai';
import { default as buildApp } from '../app';
import { login } from './login';

const expect = chai.expect;

describe('vendors', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('GET /vendor/:id', function() {
    it('should return the vendor with a id 1', async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/vendor/1'
      });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).name).to.equal('Vendor 1');
    });

    it("should return 404 if vendor record doesn't exist in database", async function() {
      const response = await app.inject({
        method: 'GET',
        url: '/vendor/2000'
      });

      expect(response.statusCode).to.equal(404);
    });
  });

  describe('PATCH /vendor', function() {
    it('should update vendor database record', async function() {
      const token = await login(app);
      const getResponse = await app.inject({
        method: 'GET',
        url: '/vendor/10'
      });

      const vendor = JSON.parse(getResponse.payload);

      expect(vendor.name).to.equal('Vendor 10');

      const newName = 'Vendor 10 Updated';

      const response = await app.inject({
        method: 'PATCH',
        url: '/vendor',
        payload: {
          id: 10,
          name: newName
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload).name).to.equal(newName);
    });

    it('should sanitize name', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'PATCH',
        url: '/vendor',
        payload: {
          id: 10,
          name: "new <script>console.log('yo')</script> vendor name"
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload).name).to.equal('new vendor name');
    });

    it("should return name field error of 'Invalid length'", async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'PATCH',
        url: '/vendor',
        payload: {
          id: 10,
          name: ''
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload)).to.have.property('errors');
      expect(JSON.parse(response.payload).errors[0].field).to.equal('name');
      expect(JSON.parse(response.payload).errors[0].message).to.equal(
        'Invalid length'
      );
    });
  });

  describe('GET /vendors', function() {
    it('should return 10 vendors', async function() {
      const response = await app.inject({ method: 'GET', url: '/vendors' });
      expect(response.headers['content-type']).to.equal(
        'application/json; charset=utf-8'
      );
      expect(JSON.parse(response.payload).length).to.equal(10);
    });

    describe('GET /vendors/range/:offset/:limit/:order', function() {
      it("should return vendor with id of 6 with offset 1, limit 5 and order 'asc'", async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/vendors/range/1/5/asc'
        });

        const results = JSON.parse(response.payload);

        expect(results[0].id).to.equal(2);
        expect(results[results.length - 1].id).to.equal(6);
      });
    });

    describe('GET /vendors/count', function() {
      it('should return the count of all vendors', async function() {
        const response = await app.inject({
          method: 'GET',
          url: '/vendors/count'
        });

        expect(JSON.parse(response.payload)[0].count).to.equal(10);
      });
    });
  });

  describe('POST /vendor', function() {
    it('should add vendor record to database', async function() {
      const token = await login(app);
      const name = 'Vendor 10001';
      const response = await app.inject({
        url: '/vendor',
        method: 'POST',
        body: {
          name,
          icon_class: 'test-icon'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const vendor = JSON.parse(response.payload);

      expect(vendor.name).to.equal(name);
    });

    it('should sanitize name', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/vendor',
        body: {
          name: "<script>console.log('yo')</script> vendor name",
          icon_class: 'test-icon'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload).name).to.equal('vendor name');
    });

    it('should sanitize icon_class', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'POST',
        url: '/vendor',
        body: {
          name: 'Vendor 1002',
          icon_class: "<script>console.log('yo')</script> test-icon"
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(JSON.parse(response.payload).icon_class).to.equal('test-icon');
    });
  });

  describe('DELETE /vendor', function() {
    it('should delete vendor database record', async function() {
      const token = await login(app);
      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/vendor/1`
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(1);

      await app.inject({
        method: 'DELETE',
        url: '/vendor',
        payload: {
          id: 1
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/vendor/1`
      });

      expect(afterResponse.statusCode).to.equal(404);
    });

    it('should return 404 when trying to delete vendor that doesn’t exist', async function() {
      const token = await login(app);
      const response = await app.inject({
        method: 'DELETE',
        url: '/vendor',
        payload: {
          id: 1000
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      expect(response.statusCode).to.equal(404);
    });
  });
});
