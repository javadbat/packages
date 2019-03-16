/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV !== "production") {
    (function() {
      'use strict';
      function scheduleWork(callback) {
        callback();
      }
      function flushBuffered(destination) {}
      function writeChunk(destination, buffer) {
        destination.enqueue(buffer);
      }
      function close(destination) {
        destination.close();
      }
      var textEncoder = new TextEncoder();
      function convertStringToBuffer(content) {
        return textEncoder.encode(content);
      }
      function formatChunk(type, props) {
        var str = '<' + type + '>';
        if (typeof props.children === 'string') {
          str += props.children;
        }
        str += '</' + type + '>';
        return convertStringToBuffer(str);
      }
      var hasSymbol = typeof Symbol === 'function' && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
      function createRequest(children, destination) {
        return {
          destination: destination,
          children: children,
          completedChunks: [],
          flowing: false
        };
      }
      function performWork(request) {
        var element = request.children;
        request.children = null;
        if (element && element.$$typeof !== REACT_ELEMENT_TYPE) {
          return;
        }
        var type = element.type;
        var props = element.props;
        if (typeof type !== 'string') {
          return;
        }
        request.completedChunks.push(formatChunk(type, props));
        if (request.flowing) {
          flushCompletedChunks(request);
        }
        flushBuffered(request.destination);
      }
      function flushCompletedChunks(request) {
        var destination = request.destination;
        var chunks = request.completedChunks;
        request.completedChunks = [];
        try {
          for (var i = 0; i < chunks.length; i++) {
            var chunk = chunks[i];
            writeChunk(destination, chunk);
          }
        } finally {}
        close(destination);
      }
      function startWork(request) {
        request.flowing = true;
        scheduleWork(function() {
          return performWork(request);
        });
      }
      function startFlowing(request, desiredBytes) {
        request.flowing = false;
        flushCompletedChunks(request);
      }
      function renderToReadableStream(children) {
        var request = void 0;
        return new ReadableStream({
          start: function(controller) {
            request = createRequest(children, controller);
            startWork(request);
          },
          pull: function(controller) {
            startFlowing(request, controller.desiredSize);
          },
          cancel: function(reason) {}
        });
      }
      var ReactDOMFizzServerBrowser = {renderToReadableStream: renderToReadableStream};
      var ReactDOMFizzServerBrowser$1 = Object.freeze({default: ReactDOMFizzServerBrowser});
      var ReactDOMFizzServerBrowser$2 = (ReactDOMFizzServerBrowser$1 && ReactDOMFizzServerBrowser) || ReactDOMFizzServerBrowser$1;
      var unstableFizz_browser = ReactDOMFizzServerBrowser$2.default || ReactDOMFizzServerBrowser$2;
      module.exports = unstableFizz_browser;
    })();
  }
})(require('process'));
