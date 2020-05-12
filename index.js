#!/usr/bin/env node

// lib
const { checkUpdate } = require('./lib/update');
const { getMessage, sendErrorMsg } = require('./lib/helpers');
const { help } = require('./lib/help');
const files = require('./lib/files');
const image = require('./lib/image');
// npm
const args = require('minimist')(process.argv.slice(2));
const path = require('path');
require('colors');

const initialPath = args._[0];
let destPath = args._[1];
const fileName = args.n;

if (args.h || args.help || args._[0] === 'help') {
  help();
} else {
  main();
}

function main() {
  !args._[1] && (destPath = path.dirname(initialPath));
  // Welcome message
  console.log('\n' + getMessage('welcomeLog').blue.bold);

  if (files.checkPaths(initialPath) && files.checkPaths(destPath)) {
    if (checkFileAndDirectory()) {
      // Generate .icns file
      image.generate(initialPath, destPath, fileName, () => {
        console.log('Done.'.green);
        console.log('\nThanks for using make-icns!\n'.blue.bold);
        checkUpdate();
      });
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
