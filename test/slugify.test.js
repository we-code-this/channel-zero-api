import chai from 'chai';
import { slugify, sanitize } from '../lib/strings';

const expect = chai.expect;

describe('slugify', function () {
  it('should strip quotes from string before making slug', async function () {
    const title = sanitize(`This is a "title" with quotes`);
    const slug = await slugify(title, 'articles', 'slug');

    expect(slug).to.equal('this-title-quotes');
  });
});
