const messages = require('../config/messages.json');

module.exports = {
  getMessage(key) {
    return messages[key];
  },
};
