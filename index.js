#!/usr/bin/env node

// make-icns
import { checkUpdate } from './lib/update.js';
import { getMessage, sendErrorMsg } from './lib/helpers.js';
import { help } from './lib/help.js';
import { checkPath, isDirectory, hasExtension } from './lib/files.js';
import { generate, isSquare } from './lib/image.js';

// npm
// const args = require('minimist')(process.argv.slice(2));
// const path = require('path');
// require('colors');

import args from 'minimist';
import path from 'path';
import 'colors';

const options = args(process.argv.slice(2));
const initialPath = options._[0];
let destPath = options._[1];
const fileName = options.n;

options.h || options.help || options._[0] === 'help' ? help() : main();

function main() {
  // Welcome message
  console.log('\n' + getMessage('welcomeLog').blue.bold);
  if (!initialPath) {
    sendErrorMsg(true, 'enterPngPath');
  } else {
    !options._[1] && (destPath = path.dirname(initialPath));
    if (checkPath(initialPath) && checkPath(destPath)) {
      if (checkFileAndDirectory()) {
        // Generate .icns file
        generate(initialPath, destPath, fileName, () => {
          console.log('Done.'.green);
          console.log('\nThanks for using make-icns!\n'.blue.bold);
          checkUpdate();
        });
      }
    }
  }
}

function checkFileAndDirectory() {
  if (hasExtension(initialPath, '.png') || hasExtension(initialPath, '.PNG')) {
    if (isDirectory(destPath)) {
      if (isSquare(initialPath)) return true;
      else sendErrorMsg(false, 'useSquareImg');
    } else {
      sendErrorMsg(true, 'isNotADirectory', destPath);
      return false;
    }
  } else {
    sendErrorMsg(true, 'isNotAPng', initialPath);
    return false;
  }
}
