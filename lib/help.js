#!/usr/bin/env node

// npm
import fs from 'fs';
import path from 'path';
import pkg from '../package.json' with { type: "json" };
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// make-icns
const helpText = path.join(__dirname, '../config/help.txt');

export function help() {
  console.log(__dirname);
  fs.readFile(helpText, 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
    console.log(`\n${pkg.name}@${pkg.version} ${path.join(__dirname, '..')}`);
  });
}