#!/usr/bin/env node

// make-icns
const pkg = require('../package.json');
// npm
const updateNotifier = require('update-notifier');

module.exports = {
  checkUpdate() {
    const notifier = updateNotifier({
      pkg,
      updateCheckInterval: 1000 * 60 * 60 * 24,
    }).notify();
  },
};
