import stripJs from 'strip-js';
import striptags from 'striptags';
import slug from 'slug';
import knex from './connection';

export const sanitize = input => {
  return striptags(stripJs(input)).trim();
};

export const slugify = async (
  input,
  table,
  field,
  context = undefined,
) => {
  let generatedSlug;
  let result;

  if (field === 'slug') {
    generatedSlug = slug(input, { lower: true });

    if (context) {
      result = await knex
        .count(`${field} as count`)
        .from(table)
        .where(field, generatedSlug)
        .where(context.field, context.value)
        .limit(1);
    } else {
      result = await knex
        .count(`${field} as count`)
        .from(table)
        .where(field, generatedSlug)
        .limit(1);
    }

    const count = parseInt(result[0].count);

    if (count > 0) {
      generatedSlug += `-${count}`;
    }
  } else {
    if (context) {
      result = await knex
        .count(`${field} as count`)
        .from(table)
        .where(field, input)
        .where(context.field, context.value)
        .limit(1);
    } else {
      result = await knex
        .count(`${field} as count`)
        .from(table)
        .where(field, input)
        .limit(1);
    }

    const count = parseInt(result[0].count);

    if (count > 0) {
      generatedSlug = slug(`${input} ${count}`, { lower: true });
    } else {
      generatedSlug = slug(input, { lower: true });
    }
  }

  return generatedSlug;
};
