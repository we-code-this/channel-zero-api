import chai from 'chai';
import knex from '../lib/connection';
import { default as buildApp } from '../app';
import {
  INVALID_LENGTH,
  DUPLICATE_EMAIL,
  PASSWORD_CONFIRMATION_MISMATCH,
  PASSWORD_WRONG_LENGTH,
  PASSWORD_REQUIRED,
  AUTHENTICATION_ERROR_MESSAGE,
  USER_NOT_FOUND,
} from '../messages/errors';
import { login } from './login';

const expect = chai.expect;

describe('users', function () {
  let app;

  before(function () {
    app = buildApp();
  });

  after(function () {
    app.close();
  });

  describe('GET /users', function () {
    it('should return 10 users', async function () {
      const token = await login(app);

      const response = await app.inject({
        method: 'GET',
        url: '/users',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(JSON.parse(response.payload).length).to.equal(10);
    });
  });

  describe('GET /users/count', function () {
    it('should return count of 11', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/count',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload)[0].count).to.equal(11);
    });
  });

  describe('GET /users/:limit', function () {
    it('should return 11 users if :limit is 11', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/11',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(JSON.parse(response.payload).length).to.equal(11);
    });

    it('should return 9 users if :limit is 9', async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/9',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(JSON.parse(response.payload).length).to.equal(9);
    });
  });

  describe('GET /users/:limit/:order', function () {
    it("should return user with id of 11 when :limit 1 and :order 'desc'", async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/1/desc',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(11);
    });

    it("should return user with id of 1 when :limit 1 and :order 'asc'", async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/1/asc',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      expect(JSON.parse(response.payload)[0].id).to.equal(1);
    });
  });

  describe('GET /users/range/:offset/:limit/:order', function () {
    it("should return users with IDs in range of 2-11 with :offset 1, :limit 10 and :order 'asc'", async function () {
      const token = await login(app);
      const response = await app.inject({
        method: 'GET',
        url: '/users/range/1/10/asc',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const results = JSON.parse(response.payload);

      expect(results[0].id).to.equal(2);
      expect(results[results.length - 1].id).to.equal(11);
    });
  });

  describe('GET /user/:id', function () {
    it('should return the user that has the :id supplied', async function () {
      const token = await login(app);
      const id = 1;
      const response = await app.inject({
        method: 'GET',
        url: `/user/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).id).to.equal(id);
    });
  });

  describe('POST /user', function () {
    it('should add user record to database', async function () {
      const token = await login(app);
      const newUser = {
        email: 'testuser@example.com',
        username: 'testuser',
        password: 'password',
        password_confirm: 'password',
      };

      const user = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(user.payload).email).to.equal(newUser.email);
    });

    it('should sanitize username', async function () {
      const token = await login(app);

      const newUser = {
        email: 'testuser2@example.com',
        username: "<script>console.log('yo')</script> testuser2",
        password: 'password',
        password_confirm: 'password',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).username).to.equal(
        'testuser2',
      );
    });

    it('should sanitize email', async function () {
      const token = await login(app);

      const newUser = {
        email:
          "<script>console.log('yo')</script> testuser3@example.com",
        username: 'testuser3',
        password: 'password',
        password_confirm: 'password',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(response.payload).email).to.equal(
        'testuser3@example.com',
      );
    });

    it('should return error when password_confirm does not match password', async function () {
      const token = await login(app);
      const newUser = {
        email: 'testuser4@example.com',
        username: 'testuser4',
        password: 'password',
        password_confirm: 'anotherpassword',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const parsedResponse = JSON.parse(response.payload);

      expect(parsedResponse).to.haveOwnProperty('errors');
      expect(parsedResponse.errors[0].field).to.equal('password');
      expect(parsedResponse.errors[0].message).to.equal(
        PASSWORD_CONFIRMATION_MISMATCH,
      );
    });

    it('should return error when supplied username is less than 6 characters', async function () {
      const token = await login(app);
      const newUser = {
        email: 'testuser5@example.com',
        username: '12345',
        password: 'password',
        password_confirm: 'password',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload).to.have.property('errors');
      expect(payload.errors[0]).to.have.property('field');
      expect(payload.errors[0]).to.have.property('message');
      expect(payload.errors[0].field).to.equal('username');
      expect(payload.errors[0].message).to.equal(INVALID_LENGTH);
    });

    it('should return error when supplied email already exists in DB', async function () {
      const token = await login(app);
      const newUser = {
        email: 'user@example.com',
        username: 'testuser6',
        password: 'password',
        password_confirm: 'password',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('email');
      expect(payload.errors[0].message).to.equal(DUPLICATE_EMAIL);
    });

    it('should return error when password length is less than 8', async function () {
      const token = await login(app);
      const newUser = {
        email: 'testuser7@example.com',
        username: 'testuser7',
        password: '1234567',
        password_confirm: '1234567',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(
        PASSWORD_WRONG_LENGTH,
      );
    });

    it('should return error when no password is supplied', async function () {
      const token = await login(app);
      const newUser = {
        email: 'testuser8@example.com',
        username: 'testuser8',
      };

      const response = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(PASSWORD_REQUIRED);
    });
  });

  describe('POST /register', function () {
    it('should add a user to the database', async function () {
      const email = 'testuser9@example.com';
      await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email,
          username: 'testuser9',
          password: 'password',
          password_confirm: 'password',
        },
      });

      const user = await knex
        .select('email')
        .from('users')
        .where('email', email)
        .first();

      expect(user.email).to.equal(email);
    });

    it(`should return '${INVALID_LENGTH}' error when supplied username is less than 6 characters`, async function () {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'testuser10@example.com',
          username: 'short',
          password: 'password',
          password_confirm: 'password',
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload).to.have.property('errors');
      expect(payload.errors[0]).to.have.property('field');
      expect(payload.errors[0]).to.have.property('message');
      expect(payload.errors[0].field).to.equal('username');
      expect(payload.errors[0].message).to.equal(INVALID_LENGTH);
    });

    it(`should return '${DUPLICATE_EMAIL}' error when supplied email already exists in DB`, async function () {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'user@example.com',
          username: 'anotheruser',
          password: 'password',
          password_confirm: 'password',
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('email');
      expect(payload.errors[0].message).to.equal(DUPLICATE_EMAIL);
    });

    it(`should return '${PASSWORD_CONFIRMATION_MISMATCH}' error when password confirmation doesn't match password`, async function () {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'testuser11@example.com',
          username: 'anotheruser',
          password: 'password',
          password_confirm: 'nomatch',
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(
        PASSWORD_CONFIRMATION_MISMATCH,
      );
    });

    it(`should return '${PASSWORD_WRONG_LENGTH}' error when password length is less than 8`, async function () {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'testuser12@example.com',
          username: 'anotheruser',
          password: 'abcdefg',
          password_confirm: 'abcdefg',
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(
        PASSWORD_WRONG_LENGTH,
      );
    });

    it(`should return '${PASSWORD_REQUIRED}' error when password length is less than 8`, async function () {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'testuser13@example.com',
          username: 'anotheruser',
        },
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(PASSWORD_REQUIRED);
    });
  });

  describe('POST /login', function () {
    it('should return token on successful login', async function () {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com',
          password: 'password',
        },
      });

      expect(JSON.parse(response.payload)).to.have.property('token');
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when password not supplied`, async function () {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com',
        },
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE,
      );
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when email not supplied`, async function () {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          password: 'password',
        },
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE,
      );
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when incorrect password`, async function () {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com',
          password: 'wrongpassword',
        },
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE,
      );
    });

    it(`should return status code 404 and ${USER_NOT_FOUND} error when user for supplied email not found`, async function () {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'nonexistant@example.com',
          password: 'password',
        },
      });

      expect(response.statusCode).to.equal(404);
      expect(JSON.parse(response.payload).error).to.equal(
        USER_NOT_FOUND,
      );
    });
  });

  describe('PATCH /user', function () {
    it('should update user database record', async function () {
      const token = await login(app);

      const originalUser = {
        email: 'testuser14@example.com',
        username: 'testuser14',
        password: 'password',
        password_confirm: 'password',
      };

      const user = await app.inject({
        method: 'POST',
        url: '/user',
        payload: originalUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const returnedUser = JSON.parse(user.payload);
      const newEmail = 'testuser15@example.com';

      const updatedUser = await app.inject({
        method: 'PATCH',
        url: '/user',
        payload: {
          id: returnedUser.id,
          email: newEmail,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(updatedUser.payload).email).to.equal(
        newEmail,
      );
    });
  });

  describe('DELETE /user', function () {
    it('should delete user database record', async function () {
      const token = await login(app);

      const newUser = {
        email: 'testuser16@example.com',
        username: 'testuser16',
        password: 'password',
        password_confirm: 'password',
      };

      const newUserResponse = await app.inject({
        method: 'POST',
        url: '/user',
        payload: newUser,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = JSON.parse(newUserResponse.payload);

      const beforeResponse = await app.inject({
        method: 'GET',
        url: `/user/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(JSON.parse(beforeResponse.payload).id).to.equal(user.id);

      await app.inject({
        method: 'DELETE',
        url: '/user',
        payload: {
          id: user.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const afterResponse = await app.inject({
        method: 'GET',
        url: `/user/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(afterResponse.statusCode).to.equal(404);
    });
  });
});
