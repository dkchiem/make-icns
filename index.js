const files = require('./lib/files');
const { getMessage, sendErrorMsg } = require('./lib/helpers');
const image = require('./lib/image');
const args = require('minimist')(process.argv.slice(2));
const mkdirp = require('mkdirp');
require('colors');

const initialPath = args._[0];
const destPath = args._[1];

main();

function main() {
  // Welcome message
  console.log(getMessage('welcomeLog').blue.bold);

  if (files.checkPaths(initialPath) && files.checkPaths(destPath)) {
    if (checkFileAndDirectory()) {
      // Generate "out" directory
      mkdirp.sync('out');

      // Generate .icns file
      image.generate(initialPath, (fileName) => {
        console.log(`Moving ${fileName} to ${destPath.replace(/\/$/, '')}`.green);
        const newDestPath = destPath.replace(/\/$/, '') + '/' + fileName;
        files.mvFile(`out/${fileName}`, newDestPath, () => {
          console.log('Done.'.green);
          console.log('\nThanks for using make-icns!\n'.blue.bold);
        });
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

// /usr/local/bin/
