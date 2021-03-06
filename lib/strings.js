import stripJs from 'strip-js';
import striptags from 'striptags';
import slug from 'slug';
import knex from './connection';

const removeConjunctions = (input) => {
  const conjunctions = [
    'a',
    'and',
    'but',
    'for',
    'is',
    'but',
    'the',
    'with',
    'yet',
    'or',
    'because',
    'nor',
    'although',
    'since',
    'unless',
    'while',
    'where',
    'this',
  ];

  conjunctions.map((conjunction) => {
    const re = new RegExp(` ${conjunction} `, 'g');
    input = input.replace(re, ' ');
  });

  return input;
};

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
    '&amp;',
    '&quot;',
    '&#x00022;',
    '&#x0022;',
    '&#34;',
    '&apos;',
    '&#x00027;',
    '&#x0027;',
    '&#39;',
    '&ldquo;',
    '&#x0201C;',
    '&#x201C;',
    '&#8220;',
    '&rdquo;',
    '&rdquor;',
    '&#x0201D;',
    '&#x201D;',
    '&#8221;',
    '&amp;',
    '&#x00026;',
    '&#x0026;',
    '&#38;',
    '&hellip;',
    '&#x02026;',
    '&#x2026;',
    '&#8230;',
    '&lsquo;',
    '&#x02018;',
    '&#x2018;',
    '&#8216;',
    '&rsquo;',
    '&rsquor;',
    '&#x02019;',
    '&#x2019;',
    '&#8217;',
  ];

  codes.map((code) => {
    const re = new RegExp(code, 'g');
    input = input.replace(re, '');
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

  const inputForSlug = removeConjunctions(
    stripCharCodes(input),
  ).substring(0, 96);

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
