#!/usr/bin/env node

// make-icns
import pkg from '../package.json' assert { type: "json" };
// npm
import updateNotifier from 'update-notifier';

export function checkUpdate() {
  const notifier = updateNotifier({
    pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24,
  }).notify();
}
