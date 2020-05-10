const imageList = require('../config/imageList.json');
const sharp = require('sharp');
const mkdirp = require('mkdirp');
const cliProgress = require('cli-progress');
var sizeOf = require('image-size');
require('colors');

function resize(imagePath) {
  console.log('Generating images...'.green);
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(100, 0);
  mkdirp.sync('out/AppIcon.iconset');
  var makeImages = new Promise((resolve, reject) => {
    Object.keys(imageList).forEach((key, index) => {
      sharp(imagePath)
        .resize(imageList[key].size)
        .toFile(`out/AppIcon.iconset/${imageList[key].name}`, (err, info) => {
          //TODO Handle error
          if (err) throw err;
          progressBar.increment(10);
          if (index === Object.keys(imageList).length - 1) resolve();
        });
    });
  });
  makeImages.then(() => {
    progressBar.stop();
  });
}

function isSquare(imagePath) {
  const dimensions = sizeOf(imagePath);
  if (dimensions.width === dimensions.height) {
    return true;
  } else {
    return false;
  }
}

module.exports = { resize, isSquare };
