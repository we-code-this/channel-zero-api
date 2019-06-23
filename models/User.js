import validator from 'validator';
import Model from './Model';
import knex from '../lib/connection';
import { sanitize } from '../lib/strings';
import { hash } from '../lib/passwords';

class User extends Model {
  constructor(data, create) {
    super(data, create);

    this.username = sanitize(this.username);
    this.email = sanitize(this.email);
    if (create) {
      this.password = this.setPassword();
    }
    this.first_name = undefined;
    this.last_name = undefined;
  }

  setPassword() {
    if (this.password && this.password.length > 0) {
      if (this.password === this.password_confirm) {
        return hash(this.password);
      } else {
        this.errors.push({
          field: 'password',
          message: 'Password and password confirmation do not match'
        });
      }
    }

    return undefined;
  }

  async valid() {
    let valid = false;

    if (this.create) {
      valid = await this.validEmail();
      valid = (await this.validUsername()) && valid;
      valid = this.validPassword() && valid;
    } else {
      valid = true;
    }

    return valid;
  }

  async validEmail() {
    let valid = validator.isEmail(this.email);

    if (valid) {
      const res = await knex('users')
        .count({ count: '*' })
        .where('email', this.email);
      const emailExists = res[0].count > 0;

      if (emailExists) {
        this.errors.push({
          field: 'email',
          message: 'A user with that email already exists'
        });

        valid = !emailExists;
      }
    } else {
      this.errors.push({ field: 'email', message: 'Invalid email' });
    }

    return valid;
  }

  async validUsername() {
    let valid = validator.isLength(this.username, { min: 6, max: 255 });

    if (valid) {
      const res = await knex('users')
        .count({ count: '*' })
        .where('username', this.username);
      const usernameExists = res[0].count > 0;

      if (usernameExists) {
        this.errors.push({
          field: 'username',
          message: 'A user with that username already exists'
        });

        valid = !usernameExists;
      }
    } else {
      this.errors.push({ field: 'username', message: 'Invalid length' });
    }

    return valid;
  }

  validPassword() {
    let valid =
      this.password && validator.isLength(this.password, { min: 1, max: 255 });

    if (!valid) {
      this.errors.push({
        field: 'password',
        message: 'A password is required'
      });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default User;
