const messages = require('../config/messages.json');
require('colors');

function getMessage(key) {
  return messages[key];
}

function sendErrorMsg(syntax, messageKey, text) {
  if (text) {
    console.log(text.red.underline + getMessage(messageKey).red.bold);
  } else {
    console.log(getMessage(messageKey).red.bold);
  }
  syntax && console.log('Syntax: '.bold + getMessage('syntax').yellow);
  console.log();
}

module.exports = {
  getBin() {
    return process.platform === 'darwin' ? '/usr/local/bin/' : '/usr/bin/';
  },
  getMessage,
  sendErrorMsg,
};
