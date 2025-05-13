#!/usr/bin/env node

// make-icns
import { getMessage } from './helpers.js';
import { getFileName, normalizePath } from './files.js';
import imageList from '../config/imageList.json' with { type: "json" };

// npm
import { Icns, IcnsImage } from '@fiahfy/icns';
import cliProgress from 'cli-progress';
import fs from 'fs';
import sharp from 'sharp';
import sizeOf from 'image-size';

import 'colors'

export function generate(pngPath, destPath, specifiedName, callback) {
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
    const fileName = specifiedName ? specifiedName : getFileName(pngPath);
    console.log(`Generating ${fileName}.icns...`.green);
    fs.writeFileSync(`${normalizePath(destPath)}/${fileName}.icns`, icns.data);
    callback(`${fileName}.icns`);
  });
}

export function isSquare(imagePath) {
  const dimensions = sizeOf(imagePath);
  return dimensions.width === dimensions.height ? true : false;
}

