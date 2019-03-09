import stripJs from "strip-js";
import striptags from "striptags";
import slug from "slug";
import knex from "./connection";

export const sanitize = input => {
  return striptags(stripJs(input))
    .replace(/\b\s\s+\b/g, " ")
    .trim();
};

export const slugify = async (input, table, field) => {
  const result = await knex
    .count(`${field} as count`)
    .from(table)
    .where(field, input)
    .limit(1);

  const count = result[0].count;

  let generatedSlug;

  if (count > 0) {
    generatedSlug = slug(`${input} ${count}`, { lower: true });
  } else {
    generatedSlug = slug(input, { lower: true });
  }

  return generatedSlug;
};
