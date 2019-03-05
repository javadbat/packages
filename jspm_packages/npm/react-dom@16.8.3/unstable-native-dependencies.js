/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/react-dom-unstable-native-dependencies.production.min');
  } else {
    module.exports = require('./cjs/react-dom-unstable-native-dependencies.development');
  }
})(require('process'));
