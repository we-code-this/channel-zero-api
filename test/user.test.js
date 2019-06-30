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
  USER_NOT_FOUND
} from '../messages/errors';

const expect = chai.expect;

describe('users', function() {
  let app;

  before(function() {
    app = buildApp();
  });

  after(function() {
    app.close();
  });

  describe('POST /register', function() {
    it('should add a user to the database', async function() {
      const email = 'test@example.com';
      await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email,
          username: 'testuser',
          password: 'password',
          password_confirm: 'password'
        }
      });

      const user = await knex
        .select('email')
        .from('users')
        .where('email', email)
        .first();

      expect(user.email).to.equal(email);
    });

    it(`should return '${INVALID_LENGTH}' error when supplied username is less than 6 characters`, async function() {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'test2@example.com',
          username: 'short',
          password: 'password',
          password_confirm: 'password'
        }
      });

      const payload = JSON.parse(response.payload);

      expect(payload).to.have.property('errors');
      expect(payload.errors[0]).to.have.property('field');
      expect(payload.errors[0]).to.have.property('message');
      expect(payload.errors[0].field).to.equal('username');
      expect(payload.errors[0].message).to.equal(INVALID_LENGTH);
    });

    it(`should return '${DUPLICATE_EMAIL}' error when supplied email already exists in DB`, async function() {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'test@example.com',
          username: 'anotheruser',
          password: 'password',
          password_confirm: 'password'
        }
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('email');
      expect(payload.errors[0].message).to.equal(DUPLICATE_EMAIL);
    });

    it(`should return '${PASSWORD_CONFIRMATION_MISMATCH}' error when password confirmation doesn't match password`, async function() {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'test3@example.com',
          username: 'anotheruser',
          password: 'password',
          password_confirm: 'nomatch'
        }
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(
        PASSWORD_CONFIRMATION_MISMATCH
      );
    });

    it(`should return '${PASSWORD_WRONG_LENGTH}' error when password length is less than 8`, async function() {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'test3@example.com',
          username: 'anotheruser',
          password: 'abcdefg',
          password_confirm: 'abcdefg'
        }
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(PASSWORD_WRONG_LENGTH);
    });

    it(`should return '${PASSWORD_REQUIRED}' error when password length is less than 8`, async function() {
      const response = await app.inject({
        url: '/register',
        method: 'POST',
        body: {
          email: 'test3@example.com',
          username: 'anotheruser'
        }
      });

      const payload = JSON.parse(response.payload);

      expect(payload.errors[0].field).to.equal('password');
      expect(payload.errors[0].message).to.equal(PASSWORD_REQUIRED);
    });
  });

  describe('POST /login', function() {
    it('should return token on successful login', async function() {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com',
          password: 'password'
        }
      });

      expect(JSON.parse(response.payload)).to.have.property('token');
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when password not supplied`, async function() {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com'
        }
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE
      );
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when email not supplied`, async function() {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          password: 'password'
        }
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE
      );
    });

    it(`should return status code 401 and ${AUTHENTICATION_ERROR_MESSAGE} error when incorrect password`, async function() {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'user@example.com',
          password: 'wrongpassword'
        }
      });

      expect(response.statusCode).to.equal(401);
      expect(JSON.parse(response.payload)).to.have.property('error');
      expect(JSON.parse(response.payload).error).to.equal(
        AUTHENTICATION_ERROR_MESSAGE
      );
    });

    it(`should return status code 404 and ${USER_NOT_FOUND} error when user for supplied email not found`, async function() {
      const response = await app.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'nonexistant@example.com',
          password: 'password'
        }
      });

      expect(response.statusCode).to.equal(404);
      expect(JSON.parse(response.payload).error).to.equal(USER_NOT_FOUND);
    });
  });
});
