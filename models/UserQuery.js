import moment from 'moment';
import knex from '../lib/connection';
import User from './User';
import { compare } from '../lib/passwords';

import { USER_NOT_FOUND_ERROR, AUTHENTICATION_ERROR } from '../lib/constants';

class UserQuery {
  constructor() {
    this.tablename = 'users';
    this.items = null;
  }

  select() {
    return knex
      .select('username', 'email', 'first_name', 'last_name', 'created_at')
      .from(this.tablename);
  }

  async create(data) {
    const userData = { ...data };

    const user = new User(userData, true);
    const isValid = await user.valid();

    if (isValid) {
      const id = await knex(this.tablename).insert(
        {
          email: user.email,
          username: user.username,
          password: user.password
        },
        ['id']
      );

      return await this.findById(id[0]);
    } else {
      return { errors: user.validationErrors() };
    }
  }

  async findById(id) {
    const res = await this.select().where(`${this.tablename}.id`, id);

    if (res.length > 0) {
      return new User(res[0]);
    } else {
      return undefined;
    }
  }

  async findByEmail(email, login) {
    let res;
    if (login) {
      res = await knex
        .select('email', 'password')
        .from(this.tablename)
        .where(`${this.tablename}.email`, email);
    } else {
      res = await this.select().where(`${this.tablename}.email`, email);
    }

    if (res.length > 0) {
      return new User(res[0]);
    } else {
      return undefined;
    }
  }

  async login(email, password) {
    const user = await this.findByEmail(email, true);

    if (user) {
      return compare(password, user.password)
        ? { user: user.email }
        : { error: AUTHENTICATION_ERROR };
    } else {
      return { error: USER_NOT_FOUND_ERROR };
    }
  }
}

export default UserQuery;