const fs = require('fs');
const path = require('path');
const isValidPath = require('is-valid-path');
const { sendErrorMsg } = require('./helpers');

function pathExists(filePath) {
  return fs.existsSync(filePath);
}

function mvFile(initialPath, destPath, callback) {
  fs.rename(initialPath, destPath, function (err) {
    if (err) throw err;
    callback();
  });
}

function checkPaths(path) {
  if (!isValidPath(path)) {
    sendErrorMsg(true, 'invalidPath', path);
    return false;
  } else {
    if (!pathExists(path)) {
      sendErrorMsg(true, 'doesNotExist', path);
      return false;
    } else {
      return true;
    }
  }
}

module.exports = {
  getCurrentWorkingDirectory() {
    return process.cwd();
  },
  isDirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
  },
  hasExtension(filePath, ext) {
    return path.extname(filePath) === ext ? true : false;
  },
  mvFile,
  pathExists,
  checkPaths,
};
