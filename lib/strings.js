import stripJs from 'strip-js';
import striptags from 'striptags';
import slug from 'slug';
import knex from './connection';

export const sanitize = (input, keepDoubleSpace = false) => {
  if (keepDoubleSpace) {
    return striptags(stripJs(input)).trim();
  } else {
    return striptags(stripJs(input))
      .replace(/\s{2,}(?!$)/, ' ')
      .trim();
  }
};

export const stripCharCodes = (input) => {
  const codes = [
    '&quot;',
    '&#x00022;',
    '&#34;',
    '&apos;',
    '&#x00027;',
    '&#39;',
    '&ldquo;',
    '&#x0201C;',
    '&#8220;',
    '&rdquo;',
    '&rdquor;',
    '&#x0201D;',
    '&#8221;',
    '&amp;',
    '&#x00026;',
    '&#38;',
    '&hellip;',
    '&#x02026;',
    '&#8230;',
    '&lsquo;',
    '&#x02018;',
    '&#8216;',
    '&rsquo;',
    '&rsquor;',
    '&#x02019;',
    '&#8217;',
  ];

  codes.map((code) => {
    input = input.replace(code, '');
  });

  return input;
};

export const slugify = async (
  input,
  table,
  field,
  context = undefined,
) => {
  let generatedSlug;
  let result;

  const inputForSlug = stripCharCodes(input);

  if (field === 'slug') {
    generatedSlug = slug(inputForSlug, { lower: true });

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
      generatedSlug = slug(`${inputForSlug} ${count}`, {
        lower: true,
      });
    } else {
      generatedSlug = slug(inputForSlug, { lower: true });
    }
  }

  return generatedSlug;
};
