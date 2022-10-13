const fs = require("fs");

const readData = (path) => {
  const content = fs.readFileSync(path);
  return JSON.parse(content);
};

module.exports = { readData };
