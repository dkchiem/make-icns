#!/usr/bin/env node

// make-icns
import messages from '../config/messages.json' with { type: "json" };
// npm
import 'colors';

export function getMessage(key) {
  return messages[key];
}

export function sendErrorMsg(syntax, messageKey, text) {
  if (text) {
    console.log(text.red.underline + getMessage(messageKey).red.bold);
  } else {
    console.log(getMessage(messageKey).red.bold);
  }
  syntax && console.log('Syntax: '.bold + getMessage('syntax').yellow);
  console.log();
}
