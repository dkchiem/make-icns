#!/usr/bin/env node
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

function checkUpdate() {
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24,
  }).notify();
}

module.exports = {
  checkUpdate,
};
