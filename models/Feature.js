import Article from './Article';
import Model from './Model';
import Video from './Video';
import validator from 'validator';
import { sanitize } from '../lib/strings';

class Feature extends Model {
  constructor(data) {
    super(data);

    this.article = new Article({
      id: data.article_id,
      title: data.article_title,
      slug: data.article_slug,
      summary: data.article_summary,
      published: data.article_published,
      created_at: data.created_at,
      updated_at: data.updated_at
    });

    this.video = new Video({
      id: data.video_id,
      src: data.video_src,
      created_at: data.created_at,
      updated_at: data.updated_at
    });
  }

  valid() {
    let valid = false;

    valid = validator.isInt(this.article_id.toString());
    if (!valid) {
      this.errors.push({ field: 'article_id', message: 'Invalid value' });
    }

    valid = valid && validator.isInt(this.video_id.toString());
    if (!valid) {
      this.errors.push({ field: 'video_id', message: 'Invalid value' });
    }

    return valid;
  }

  validationErrors() {
    return this.errors;
  }
}

export default Feature;
