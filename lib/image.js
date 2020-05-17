#!/usr/bin/env node

// make-icns
const { getMessage } = require('./helpers');
const files = require('./files');
const imageList = require('../config/imageList.json');
// npm
const { Icns, IcnsImage } = require('@fiahfy/icns');
const cliProgress = require('cli-progress');
const fs = require('fs');
const sharp = require('sharp');
var sizeOf = require('image-size');

require('colors');

function generate(pngPath, destPath, specifiedName, callback) {
  const icns = new Icns();
  let image;
  console.log(getMessage('generatingImg').green);
  const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  progressBar.start(100, 0);
  var makeImages = new Promise((resolve, reject) => {
    Object.keys(imageList).forEach((key, index) => {
      sharp(pngPath)
        .resize(imageList[key].size)
        .toBuffer()
        .then((data) => {
          progressBar.increment(10);
          image = IcnsImage.fromPNG(data, imageList[key].ostype);
          icns.append(image);
          if (index === Object.keys(imageList).length - 1) resolve();
        });
    });
  });
  makeImages.then(() => {
    progressBar.stop();
    const fileName = specifiedName ? specifiedName : files.getFileName(pngPath);
    console.log(`Generating ${fileName}.icns...`.green);
    fs.writeFileSync(`${files.normalizePath(destPath)}/${fileName}.icns`, icns.data);
    callback(`${fileName}.icns`);
  });
}

function isSquare(imagePath) {
  const dimensions = sizeOf(imagePath);
  return dimensions.width === dimensions.height ? true : false;
}

module.exports = {
  generate,
  isSquare,
};
