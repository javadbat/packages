/* */ 
(function(process) {
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs = require('react-is');
    var throwOnDirectAccess = true;
    module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
  } else {
    module.exports = require('./factoryWithThrowingShims')();
  }
})(require('process'));
