import moment from 'moment';
import knex from '../lib/connection';
import Release from './Release';
import { normalizeID, normalizeCount } from '../lib/utilities';

class ReleaseQuery {
  constructor() {
    this.tablename = 'releases';
    this.items = undefined;
  }

  select() {
    return knex
      .select(
        `${this.tablename}.*`,
        'artists.name as artist_name',
        'artists.slug as artist_slug',
        'artists.description as artist_description',
        'artists.created_at as artist_created_at',
        'artists.updated_at as artist_updated_at',
        'labels.name as label_name',
        'labels.slug as label_slug',
        'labels.created_at as label_created_at',
        'labels.updated_at as label_updated_at',
      )
      .from(this.tablename)
      .leftJoin(
        'artists',
        `${this.tablename}.artist_id`,
        'artists.id',
      )
      .leftJoin('labels', `${this.tablename}.label_id`, 'labels.id');
  }

  async create(data) {
    const releaseData = { ...data };
    const release = new Release(releaseData, true);
    const isValid = release.valid();

    await release.generateSlug();

    if (isValid && (await release.saveFile())) {
      const id = await knex(this.tablename).insert(
        {
          user_id: release.user_id,
          artist_id: release.artist_id,
          label_id: release.label_id,
          title: release.title,
          slug: release.slug,
          description: release.description,
          filename: release.filename,
          published: release.published,
        },
        ['id'],
      );

      const res = (
        await this.select()
          .where(`${this.tablename}.id`, normalizeID(id))
      )[0];

      return new Release(res).withRelated();
    } else {
      return { errors: release.validationErrors() };
    }
  }

  async count() {
    const count = await knex.count('* as count').from(this.tablename);
    return normalizeCount(count);
  }

  async delete(id) {
    const release = await this.find(id);

    if (release && release.deleteFile()) {
      return await knex(this.tablename)
        .where('id', id)
        .del();
    } else {
      return false;
    }
  }

  async get(params = {}, unpublished = false) {
    const offset = params.offset ? parseInt(params.offset) : 0;
    const limit = params.limit ? parseInt(params.limit) : 10;
    const order = params.order ? params.order.toUpperCase() : 'DESC';

    let res;

    if (unpublished) {
      res = await this.select()
        .limit(limit)
        .offset(offset)
        .orderBy('created_at', order);
    } else {
      res = await this.select()
        .where(`${this.tablename}.published`, true)
        .limit(limit)
        .offset(offset)
        .orderBy('created_at', order);
    }

    return Promise.all(
      res.map(async function(record) {
        return new Release(record).withRelated();
      }),
    );
  }

  async findByArtist(id) {
    return (await knex(this.tablename).where('artist_id', id)).map(
      release => {
        return new Release(release);
      },
    );
  }

  async findBySlug(slug) {
    const res = await this.select().where(
      `${this.tablename}.slug`,
      slug,
    );

    if (res.length > 0) {
      return new Release(res[0]).withRelated();
    } else {
      return undefined;
    }
  }

  async find(id) {
    const res = await this.select().where(`${this.tablename}.id`, id);

    if (res.length > 0) {
      return new Release(res[0]).withRelated();
    } else {
      return undefined;
    }
  }

  async update(updatedFields) {
    const { id, ...remainingUpdatedFields } = updatedFields;
    const oldRelease = await this.find(id);

    const data = {
      ...oldRelease,
      ...remainingUpdatedFields,
      updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    const release = new Release(data);
    const isValid = release.valid();

    if (isValid && (await release.saveFile())) {
      await knex(this.tablename)
        .where('id', id)
        .update({
          artist_id: release.artist_id,
          label_id: release.label_id,
          title: release.title,
          description: release.description,
          updated_at: release.updated_at,
        });

      return await this.find(id);
    } else {
      return { errors: release.validationErrors() };
    }
  }

  async publish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 1 });

    return response === 1 ? await this.find(id) : undefined;
  }

  async unpublish(id) {
    const response = await knex(this.tablename)
      .where('id', id)
      .update({ published: 0 });

    return response === 1 ? await this.find(id) : undefined;
  }
}

export default ReleaseQuery;
