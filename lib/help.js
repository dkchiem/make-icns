#!/usr/bin/env node
const path = require('path');
const helpText = path.join(__dirname, '../config/help.txt');
const pkg = require('../package.json');
const fs = require('fs');

function help() {
  console.log(__dirname);
  fs.readFile(helpText, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(`\n${pkg.name}@${pkg.version} ${path.join(__dirname, '..')}`);
  });
}

module.exports = { help };
