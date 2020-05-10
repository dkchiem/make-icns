const args = require('minimist')(process.argv.slice(2));
const files = require('./lib/files');
const { getMessage } = require('./lib/helpers');
const image = require('./lib/image');
const isValidPath = require('is-valid-path');
require('colors');

const initialPath = args._[0];
const destPath = args._[1];

main();

function main() {
  console.log('*** MAKE-ICNS ***\n'.blue.bold);
  if (checkPaths(initialPath) && checkPaths(destPath)) {
    if (checkFileAndDirectory()) {
      image.resize(initialPath);
    }
  }
}

function checkFileAndDirectory() {
  if (files.hasExtension(initialPath, '.png') || files.hasExtension(initialPath, '.PNG')) {
    if (files.isDirectory(destPath)) {
      if (image.isSquare(initialPath)) {
        return true;
      } else {
        sendErrorMsg(false, 'useSquareImg');
      }
    } else {
      sendErrorMsg(true, 'isNotADirectory', destPath);
      return false;
    }
  } else {
    sendErrorMsg(true, 'isNotAPng', initialPath);
    return false;
  }
}

function checkPaths(path) {
  if (!isValidPath(path)) {
    sendErrorMsg(true, 'invalidPath', path);
    return false;
  } else {
    if (!files.pathExists(path)) {
      sendErrorMsg(true, 'doesNotExist', path);
      return false;
    } else {
      return true;
    }
  }
}

function sendErrorMsg(syntax, messageKey, text) {
  if (text) {
    console.log(text.red.underline + getMessage(messageKey, text).red.bold);
  } else {
    console.log(getMessage(messageKey, text).red.bold);
  }
  syntax && console.log('Syntax: '.bold + getMessage('syntax').yellow);
  console.log();
}

// /usr/local/bin/
// iconutil -c icns AppIcon.iconset
