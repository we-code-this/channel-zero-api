import validator from 'validator';
import Model from './Model';
import knex from '../lib/connection';
import { sanitize } from '../lib/strings';
import { hash } from '../lib/passwords';
import {
  INVALID_LENGTH,
  DUPLICATE_EMAIL,
  PASSWORD_CONFIRMATION_MISMATCH,
  PASSWORD_WRONG_LENGTH,
  PASSWORD_REQUIRED,
} from '../messages/errors';

class User extends Model {
  constructor(data, create) {
    super(data, create);

    this.username = sanitize(this.username);
    this.email = sanitize(this.email);
    this.first_name = undefined;
    this.last_name = undefined;
  }

  setPassword() {
    return hash(this.password);
  }

  async valid() {
    let valid = false;

    if (this.create) {
      valid = await this.validEmail();
      valid = (await this.validUsername()) && valid;
      valid = this.validPassword() && valid;
    } else {
      valid = await this.validEmail();
    }

    return valid;
  }

  async validReset() {
    return this.validPassword();
  }

  async validEmail() {
    let valid = validator.isEmail(this.email);
    valid =
      validator.isLength(this.email, {
        min: 6,
      }) && valid;

    if (valid) {
      const res = await knex('users')
        .count({ count: '*' })
        .where('email', this.email);
      const emailExists = parseInt(res[0].count) > 0;

      if (emailExists) {
        this.errors.push({
          field: 'email',
          message: DUPLICATE_EMAIL,
        });

        valid = !emailExists;
      }
    } else {
      this.errors.push({ field: 'email', message: INVALID_LENGTH });
    }

    return valid;
  }

  async validUsername() {
    let valid = validator.isLength(this.username, {
      min: 6,
      max: 255,
    });

    if (valid) {
      const res = await knex('users')
        .count({ count: '*' })
        .where('username', this.username);
      const usernameExists = parseInt(res[0].count) > 0;

      if (usernameExists) {
        this.errors.push({
          field: 'username',
          message: 'A user with that username already exists',
        });

        valid = !usernameExists;
      }
    } else {
      this.errors.push({
        field: 'username',
        message: 'Invalid length',
      });
    }

    return valid;
  }

  validPassword() {
    let valid = false;

    if (this.password) {
      if (validator.isLength(this.password, { min: 8, max: 255 })) {
        if (this.password === this.password_confirm) {
          this.password = this.setPassword();
          valid = true;
        } else {
          this.errors.push({
            field: 'password',
            message: PASSWORD_CONFIRMATION_MISMATCH,
          });
        }
      } else {
        this.errors.push({
          field: 'password',
          message: PASSWORD_WRONG_LENGTH,
        });
      }
    } else {
      this.errors.push({
        field: 'password',
        message: PASSWORD_REQUIRED,
      });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default User;
