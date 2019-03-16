/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react-dom-unstable-fizz.browser.production.min');
  } else {
    module.exports = require('./cjs/react-dom-unstable-fizz.browser.development');
  }
})(require('process'));
