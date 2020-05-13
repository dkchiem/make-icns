#!/usr/bin/env node
// make-icns
const helpText = path.join(__dirname, '../config/help.txt');
// npm
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

module.exports = {
  help() {
    console.log(__dirname);
    fs.readFile(helpText, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
      console.log(`\n${pkg.name}@${pkg.version} ${path.join(__dirname, '..')}`);
    });
  },
};
