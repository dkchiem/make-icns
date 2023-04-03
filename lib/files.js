#!/usr/bin/env node

// make-icns
import { sendErrorMsg } from './helpers.js';

// npm
import fs from 'fs';
import path from 'path';
import isValidPath from 'is-valid-path';

export function getFileName(filePath) {
  const extension = path.extname(filePath);
  const fileName = path.basename(filePath, extension);
  return fileName;
}

function pathExists(filePath) {
  return fs.existsSync(filePath);
}

export function checkPath(path) {
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

export function isDirectory(filePath) {
  return fs.lstatSync(filePath).isDirectory();
}

export function hasExtension(filePath, ext) {
  return path.extname(filePath) === ext ? true : false;
}

export function normalizePath(path) {
  return path.replace(/\/$/, '');
}
