const fs = require("fs-extra");
const path = require("path");

async function get(params = {}) {
  const filePath = path.join(
    __dirname,
    "/../",
    "/../",
    "test",
    "fixtures",
    "articles.json"
  );
  const data = await fs.readFile(filePath, "utf8");

  let articles = JSON.parse(data);

  // default limit is 10
  if (params.limit) {
    articles = articles.slice(0, params.limit);
  } else {
    articles = articles.slice(0, 10);
  }

  return articles;
}

module.exports = {
  get: get
};
