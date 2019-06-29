const prodKeys = require('./keys_prod');
const devKeys = require('./keys_dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = prodKeys;
} else {
  module.exports = devKeys;
}
