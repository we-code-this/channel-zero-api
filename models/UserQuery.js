import knex from '../lib/connection';
import moment from 'moment';
import crypto from 'crypto';
import User from './User';
import { compare } from '../lib/passwords';
import transporter from '../lib/email';
import { normalizeID, normalizeCount } from '../lib/utilities';

import {
  USER_NOT_FOUND_ERROR,
  AUTHENTICATION_ERROR,
} from '../lib/constants';

class UserQuery {
  constructor() {
    this.tablename = 'users';
    this.items = null;
  }

  select() {
    return knex
      .select(
        'username',
        'email',
        'first_name',
        'last_name',
        'created_at',
      )
      .from(this.tablename);
  }

  selectWithId() {
    return knex
      .select(
        'id',
        'username',
        'email',
        'first_name',
        'last_name',
        'created_at',
      )
      .from(this.tablename);
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
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
          password: user.password,
        },
        ['id'],
      );

      return await this.findById(normalizeID(id));
    } else {
      return { errors: user.validationErrors() };
    }
  }

  async delete(id) {
    return await knex(this.tablename).where('id', id).del();
  }

  async findById(id) {
    const res = await this.selectWithId().where(
      `${this.tablename}.id`,
      id,
    );

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
        .select('id', 'email', 'password')
        .from(this.tablename)
        .where(`${this.tablename}.email`, email);
    } else {
      res = await this.select().where(
        `${this.tablename}.email`,
        email,
      );
    }

    if (res.length > 0) {
      return new User(res[0]);
    } else {
      return undefined;
    }
  }

  async findByEmailAndToken(email, token) {
    const res = await knex
      .select('*')
      .from(this.tablename)
      .where('email', email)
      .where('reset_token', token);

    if (res.length > 0) {
      return new User(res[0]);
    } else {
      return undefined;
    }
  }

  async forgot(email) {
    const user = await this.findByEmail(email);

    if (user) {
      const buffer = await crypto.randomBytes(32);
      const token = buffer.toString('hex');

      await knex(this.tablename)
        .where('email', user.email)
        .update({
          reset_token: token,
          updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        });

      return await transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: user.email,
        subject: 'ChannelZero Password Reset',
        text: `Reset your password at the following link: ${process.env.ADMIN_ORIGIN}/reset/${token}`,
      });
    }

    return true;
  }

  async get(params = {}) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    const res = await this.selectWithId()
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', order);

    return Promise.all(
      res.map(async function (record) {
        return new User(record);
      }),
    );
  }

  async getIdByEmail(email) {
    const res = await knex
      .select('id')
      .from(this.tablename)
      .where(`${this.tablename}.email`, email)
      .limit(1);

    if (res.length > 0) {
      return res[0].id;
    } else {
      return undefined;
    }
  }

  async isInGroup(groupSlug, email) {
    const user = await this.findByEmail(email, true);

    const group = await knex
      .select('id')
      .from('groups')
      .where('slug', groupSlug)
      .first();

    if (user && group) {
      const res = await knex
        .count('* as count')
        .from('group_users')
        .where({
          group_id: group.id,
          user_id: user.id,
        })
        .first();

      return parseInt(res.count) === 1;
    } else {
      return false;
    }
  }

  async groups(id) {
    const res = await knex
      .select('name', 'slug')
      .from('groups')
      .leftJoin('group_users', 'group_id', 'groups.id')
      .where('user_id', id);

    const groups = {};

    res.map((group) => {
      groups[group.slug] = group.name;
    });

    return groups;
  }

  async login(email, password) {
    try {
      const user = await this.findByEmail(email, true);

      if (user) {
        const groups = await this.groups(user.id);

        return compare(password, user.password)
          ? { id: user.id, user: user.email, groups }
          : { error: AUTHENTICATION_ERROR };
      } else {
        return { error: USER_NOT_FOUND_ERROR };
      }
    } catch (err) {
      return { error: AUTHENTICATION_ERROR };
    }
  }

  async update(fieldData) {
    const { id, ...remainingFields } = fieldData;
    const oldUser = await this.findById(id);
    const data = {
      ...oldUser,
      ...remainingFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const user = new User(data);
    const isValid = await user.valid();

    if (isValid) {
      await knex(this.tablename).where('id', oldUser.id).update({
        email: user.email,
        updated_at: user.updated_at,
      });

      return await this.findById(oldUser.id);
    } else {
      return { errors: user.validationErrors() };
    }
  }

  async reset(data) {
    const oldUser = await this.findByEmailAndToken(
      data.email,
      data.reset_token,
    );

    if (oldUser) {
      const newData = {
        ...oldUser,
        ...data,
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      };

      const user = new User(newData);
      const isValid = await user.validReset();

      if (isValid) {
        await knex(this.tablename).where('email', user.email).update({
          password: user.password,
          reset_token: null,
          updated_at: user.updated_at,
        });

        return true;
      } else {
        return { errors: user.validationErrors() };
      }
    }

    return {
      errors: [{ field: 'other', message: 'Something went wrong.' }],
    };
  }
}

export default UserQuery;
