const fs = require("fs");
const path = require("path");

module.exports = {
  getCurrentDirectoryBase: () => {
    return path.basename(process.cwd());
  },

  pathExists: filePath => {
    return fs.existsSync(filePath);
  },

  readJson: path => JSON.parse(fs.readFileSync(path, "utf8"))
};
