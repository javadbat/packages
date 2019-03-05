/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react-is.production.min');
  } else {
    module.exports = require('./cjs/react-is.development');
  }
})(require('process'));
