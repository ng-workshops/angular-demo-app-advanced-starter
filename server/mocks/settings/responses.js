let settings = require('./settings');

module.exports = {
  get: () => settings,
  set: newSettings => {
    settings = newSettings;
    return settings;
  }
};
