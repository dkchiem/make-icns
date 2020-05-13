#!/usr/bin/env node
// make-icns
const { sendErrorMsg } = require('./helpers');
// npm
const fs = require('fs');
const path = require('path');
const isValidPath = require('is-valid-path');

function getFileName(filePath) {
  const extension = path.extname(filePath);
  const fileName = path.basename(filePath, extension);
  return fileName;
}

function pathExists(filePath) {
  return fs.existsSync(filePath);
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
  isDirectory(filePath) {
    return fs.lstatSync(filePath).isDirectory();
  },
  hasExtension(filePath, ext) {
    return path.extname(filePath) === ext ? true : false;
  },
  normalizePath(path) {
    return path.replace(/\/$/, '');
  },
  getFileName,
  checkPaths,
};
