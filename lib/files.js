const fs = require('fs');
const path = require('path');

function hasExtension(filePath, ext) {
  return path.extname(filePath) === ext ? true : false;
}

module.exports = {
  getCurrentDirectoryBase() {
    return path.basename(process.cwd());
  },
  pathExists(filePath) {
    return fs.existsSync(filePath);
  },
  isDirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
  },
  hasExtension,
};
