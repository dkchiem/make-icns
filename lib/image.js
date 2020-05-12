#!/usr/bin/env node
const files = require('./files');
const imageList = require('../config/imageList.json');
const sharp = require('sharp');
const cliProgress = require('cli-progress');
var sizeOf = require('image-size');
const path = require('path');
const fs = require('fs');
const { Icns, IcnsImage } = require('@fiahfy/icns');
const { getMessage } = require('./helpers');
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
    const fileName = specifiedName ? specifiedName : files.getName(pngPath);
    console.log(`Generating ${fileName}.icns...`.green);
    fs.writeFileSync(`${files.normalizePath(destPath)}/${fileName}.icns`, icns.data);
    callback(`${fileName}.icns`);
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

module.exports = {
  generate,
  isSquare,
};
