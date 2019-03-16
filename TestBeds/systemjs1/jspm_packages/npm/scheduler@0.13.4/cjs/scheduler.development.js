/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV !== "production") {
    (function() {
      'use strict';
      Object.defineProperty(exports, '__esModule', {value: true});
      var enableSchedulerDebugging = false;
      var ImmediatePriority = 1;
      var UserBlockingPriority = 2;
      var NormalPriority = 3;
      var LowPriority = 4;
      var IdlePriority = 5;
      var maxSigned31BitInt = 1073741823;
      var IMMEDIATE_PRIORITY_TIMEOUT = -1;
      var USER_BLOCKING_PRIORITY = 250;
      var NORMAL_PRIORITY_TIMEOUT = 5000;
      var LOW_PRIORITY_TIMEOUT = 10000;
      var IDLE_PRIORITY = maxSigned31BitInt;
      var firstCallbackNode = null;
      var currentDidTimeout = false;
      var isSchedulerPaused = false;
      var currentPriorityLevel = NormalPriority;
      var currentEventStartTime = -1;
      var currentExpirationTime = -1;
      var isExecutingCallback = false;
      var isHostCallbackScheduled = false;
      var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
      function ensureHostCallbackIsScheduled() {
        if (isExecutingCallback) {
          return;
        }
        var expirationTime = firstCallbackNode.expirationTime;
        if (!isHostCallbackScheduled) {
          isHostCallbackScheduled = true;
        } else {
          cancelHostCallback();
        }
        requestHostCallback(flushWork, expirationTime);
      }
      function flushFirstCallback() {
        var flushedNode = firstCallbackNode;
        var next = firstCallbackNode.next;
        if (firstCallbackNode === next) {
          firstCallbackNode = null;
          next = null;
        } else {
          var lastCallbackNode = firstCallbackNode.previous;
          firstCallbackNode = lastCallbackNode.next = next;
          next.previous = lastCallbackNode;
        }
        flushedNode.next = flushedNode.previous = null;
        var callback = flushedNode.callback;
        var expirationTime = flushedNode.expirationTime;
        var priorityLevel = flushedNode.priorityLevel;
        var previousPriorityLevel = currentPriorityLevel;
        var previousExpirationTime = currentExpirationTime;
        currentPriorityLevel = priorityLevel;
        currentExpirationTime = expirationTime;
        var continuationCallback;
        try {
          continuationCallback = callback();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
          currentExpirationTime = previousExpirationTime;
        }
        if (typeof continuationCallback === 'function') {
          var continuationNode = {
            callback: continuationCallback,
            priorityLevel: priorityLevel,
            expirationTime: expirationTime,
            next: null,
            previous: null
          };
          if (firstCallbackNode === null) {
            firstCallbackNode = continuationNode.next = continuationNode.previous = continuationNode;
          } else {
            var nextAfterContinuation = null;
            var node = firstCallbackNode;
            do {
              if (node.expirationTime >= expirationTime) {
                nextAfterContinuation = node;
                break;
              }
              node = node.next;
            } while (node !== firstCallbackNode);
            if (nextAfterContinuation === null) {
              nextAfterContinuation = firstCallbackNode;
            } else if (nextAfterContinuation === firstCallbackNode) {
              firstCallbackNode = continuationNode;
              ensureHostCallbackIsScheduled();
            }
            var previous = nextAfterContinuation.previous;
            previous.next = nextAfterContinuation.previous = continuationNode;
            continuationNode.next = nextAfterContinuation;
            continuationNode.previous = previous;
          }
        }
      }
      function flushImmediateWork() {
        if (currentEventStartTime === -1 && firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority) {
          isExecutingCallback = true;
          try {
            do {
              flushFirstCallback();
            } while (firstCallbackNode !== null && firstCallbackNode.priorityLevel === ImmediatePriority);
          } finally {
            isExecutingCallback = false;
            if (firstCallbackNode !== null) {
              ensureHostCallbackIsScheduled();
            } else {
              isHostCallbackScheduled = false;
            }
          }
        }
      }
      function flushWork(didTimeout) {
        if (enableSchedulerDebugging && isSchedulerPaused) {
          return;
        }
        isExecutingCallback = true;
        var previousDidTimeout = currentDidTimeout;
        currentDidTimeout = didTimeout;
        try {
          if (didTimeout) {
            while (firstCallbackNode !== null && !(enableSchedulerDebugging && isSchedulerPaused)) {
              var currentTime = exports.unstable_now();
              if (firstCallbackNode.expirationTime <= currentTime) {
                do {
                  flushFirstCallback();
                } while (firstCallbackNode !== null && firstCallbackNode.expirationTime <= currentTime && !(enableSchedulerDebugging && isSchedulerPaused));
                continue;
              }
              break;
            }
          } else {
            if (firstCallbackNode !== null) {
              do {
                if (enableSchedulerDebugging && isSchedulerPaused) {
                  break;
                }
                flushFirstCallback();
              } while (firstCallbackNode !== null && !shouldYieldToHost());
            }
          }
        } finally {
          isExecutingCallback = false;
          currentDidTimeout = previousDidTimeout;
          if (firstCallbackNode !== null) {
            ensureHostCallbackIsScheduled();
          } else {
            isHostCallbackScheduled = false;
          }
          flushImmediateWork();
        }
      }
      function unstable_runWithPriority(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case ImmediatePriority:
          case UserBlockingPriority:
          case NormalPriority:
          case LowPriority:
          case IdlePriority:
            break;
          default:
            priorityLevel = NormalPriority;
        }
        var previousPriorityLevel = currentPriorityLevel;
        var previousEventStartTime = currentEventStartTime;
        currentPriorityLevel = priorityLevel;
        currentEventStartTime = exports.unstable_now();
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
          currentEventStartTime = previousEventStartTime;
          flushImmediateWork();
        }
      }
      function unstable_next(eventHandler) {
        var priorityLevel = void 0;
        switch (currentPriorityLevel) {
          case ImmediatePriority:
          case UserBlockingPriority:
          case NormalPriority:
            priorityLevel = NormalPriority;
            break;
          default:
            priorityLevel = currentPriorityLevel;
            break;
        }
        var previousPriorityLevel = currentPriorityLevel;
        var previousEventStartTime = currentEventStartTime;
        currentPriorityLevel = priorityLevel;
        currentEventStartTime = exports.unstable_now();
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
          currentEventStartTime = previousEventStartTime;
          flushImmediateWork();
        }
      }
      function unstable_wrapCallback(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          var previousEventStartTime = currentEventStartTime;
          currentPriorityLevel = parentPriorityLevel;
          currentEventStartTime = exports.unstable_now();
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
            currentEventStartTime = previousEventStartTime;
            flushImmediateWork();
          }
        };
      }
      function unstable_scheduleCallback(callback, deprecated_options) {
        var startTime = currentEventStartTime !== -1 ? currentEventStartTime : exports.unstable_now();
        var expirationTime;
        if (typeof deprecated_options === 'object' && deprecated_options !== null && typeof deprecated_options.timeout === 'number') {
          expirationTime = startTime + deprecated_options.timeout;
        } else {
          switch (currentPriorityLevel) {
            case ImmediatePriority:
              expirationTime = startTime + IMMEDIATE_PRIORITY_TIMEOUT;
              break;
            case UserBlockingPriority:
              expirationTime = startTime + USER_BLOCKING_PRIORITY;
              break;
            case IdlePriority:
              expirationTime = startTime + IDLE_PRIORITY;
              break;
            case LowPriority:
              expirationTime = startTime + LOW_PRIORITY_TIMEOUT;
              break;
            case NormalPriority:
            default:
              expirationTime = startTime + NORMAL_PRIORITY_TIMEOUT;
          }
        }
        var newNode = {
          callback: callback,
          priorityLevel: currentPriorityLevel,
          expirationTime: expirationTime,
          next: null,
          previous: null
        };
        if (firstCallbackNode === null) {
          firstCallbackNode = newNode.next = newNode.previous = newNode;
          ensureHostCallbackIsScheduled();
        } else {
          var next = null;
          var node = firstCallbackNode;
          do {
            if (node.expirationTime > expirationTime) {
              next = node;
              break;
            }
            node = node.next;
          } while (node !== firstCallbackNode);
          if (next === null) {
            next = firstCallbackNode;
          } else if (next === firstCallbackNode) {
            firstCallbackNode = newNode;
            ensureHostCallbackIsScheduled();
          }
          var previous = next.previous;
          previous.next = next.previous = newNode;
          newNode.next = next;
          newNode.previous = previous;
        }
        return newNode;
      }
      function unstable_pauseExecution() {
        isSchedulerPaused = true;
      }
      function unstable_continueExecution() {
        isSchedulerPaused = false;
        if (firstCallbackNode !== null) {
          ensureHostCallbackIsScheduled();
        }
      }
      function unstable_getFirstCallbackNode() {
        return firstCallbackNode;
      }
      function unstable_cancelCallback(callbackNode) {
        var next = callbackNode.next;
        if (next === null) {
          return;
        }
        if (next === callbackNode) {
          firstCallbackNode = null;
        } else {
          if (callbackNode === firstCallbackNode) {
            firstCallbackNode = next;
          }
          var previous = callbackNode.previous;
          previous.next = next;
          next.previous = previous;
        }
        callbackNode.next = callbackNode.previous = null;
      }
      function unstable_getCurrentPriorityLevel() {
        return currentPriorityLevel;
      }
      function unstable_shouldYield() {
        return !currentDidTimeout && (firstCallbackNode !== null && firstCallbackNode.expirationTime < currentExpirationTime || shouldYieldToHost());
      }
      var localDate = Date;
      var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : undefined;
      var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : undefined;
      var localRequestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : undefined;
      var localCancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : undefined;
      var ANIMATION_FRAME_TIMEOUT = 100;
      var rAFID;
      var rAFTimeoutID;
      var requestAnimationFrameWithTimeout = function(callback) {
        rAFID = localRequestAnimationFrame(function(timestamp) {
          localClearTimeout(rAFTimeoutID);
          callback(timestamp);
        });
        rAFTimeoutID = localSetTimeout(function() {
          localCancelAnimationFrame(rAFID);
          callback(exports.unstable_now());
        }, ANIMATION_FRAME_TIMEOUT);
      };
      if (hasNativePerformanceNow) {
        var Performance = performance;
        exports.unstable_now = function() {
          return Performance.now();
        };
      } else {
        exports.unstable_now = function() {
          return localDate.now();
        };
      }
      var requestHostCallback;
      var cancelHostCallback;
      var shouldYieldToHost;
      var globalValue = null;
      if (typeof window !== 'undefined') {
        globalValue = window;
      } else if (typeof global !== 'undefined') {
        globalValue = global;
      }
      if (globalValue && globalValue._schedMock) {
        var globalImpl = globalValue._schedMock;
        requestHostCallback = globalImpl[0];
        cancelHostCallback = globalImpl[1];
        shouldYieldToHost = globalImpl[2];
        exports.unstable_now = globalImpl[3];
      } else if (typeof window === 'undefined' || typeof MessageChannel !== 'function') {
        var _callback = null;
        var _flushCallback = function(didTimeout) {
          if (_callback !== null) {
            try {
              _callback(didTimeout);
            } finally {
              _callback = null;
            }
          }
        };
        requestHostCallback = function(cb, ms) {
          if (_callback !== null) {
            setTimeout(requestHostCallback, 0, cb);
          } else {
            _callback = cb;
            setTimeout(_flushCallback, 0, false);
          }
        };
        cancelHostCallback = function() {
          _callback = null;
        };
        shouldYieldToHost = function() {
          return false;
        };
      } else {
        if (typeof console !== 'undefined') {
          if (typeof localRequestAnimationFrame !== 'function') {
            console.error("This browser doesn't support requestAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
          }
          if (typeof localCancelAnimationFrame !== 'function') {
            console.error("This browser doesn't support cancelAnimationFrame. " + 'Make sure that you load a ' + 'polyfill in older browsers. https://fb.me/react-polyfills');
          }
        }
        var scheduledHostCallback = null;
        var isMessageEventScheduled = false;
        var timeoutTime = -1;
        var isAnimationFrameScheduled = false;
        var isFlushingHostCallback = false;
        var frameDeadline = 0;
        var previousFrameTime = 33;
        var activeFrameTime = 33;
        shouldYieldToHost = function() {
          return frameDeadline <= exports.unstable_now();
        };
        var channel = new MessageChannel();
        var port = channel.port2;
        channel.port1.onmessage = function(event) {
          isMessageEventScheduled = false;
          var prevScheduledCallback = scheduledHostCallback;
          var prevTimeoutTime = timeoutTime;
          scheduledHostCallback = null;
          timeoutTime = -1;
          var currentTime = exports.unstable_now();
          var didTimeout = false;
          if (frameDeadline - currentTime <= 0) {
            if (prevTimeoutTime !== -1 && prevTimeoutTime <= currentTime) {
              didTimeout = true;
            } else {
              if (!isAnimationFrameScheduled) {
                isAnimationFrameScheduled = true;
                requestAnimationFrameWithTimeout(animationTick);
              }
              scheduledHostCallback = prevScheduledCallback;
              timeoutTime = prevTimeoutTime;
              return;
            }
          }
          if (prevScheduledCallback !== null) {
            isFlushingHostCallback = true;
            try {
              prevScheduledCallback(didTimeout);
            } finally {
              isFlushingHostCallback = false;
            }
          }
        };
        var animationTick = function(rafTime) {
          if (scheduledHostCallback !== null) {
            requestAnimationFrameWithTimeout(animationTick);
          } else {
            isAnimationFrameScheduled = false;
            return;
          }
          var nextFrameTime = rafTime - frameDeadline + activeFrameTime;
          if (nextFrameTime < activeFrameTime && previousFrameTime < activeFrameTime) {
            if (nextFrameTime < 8) {
              nextFrameTime = 8;
            }
            activeFrameTime = nextFrameTime < previousFrameTime ? previousFrameTime : nextFrameTime;
          } else {
            previousFrameTime = nextFrameTime;
          }
          frameDeadline = rafTime + activeFrameTime;
          if (!isMessageEventScheduled) {
            isMessageEventScheduled = true;
            port.postMessage(undefined);
          }
        };
        requestHostCallback = function(callback, absoluteTimeout) {
          scheduledHostCallback = callback;
          timeoutTime = absoluteTimeout;
          if (isFlushingHostCallback || absoluteTimeout < 0) {
            port.postMessage(undefined);
          } else if (!isAnimationFrameScheduled) {
            isAnimationFrameScheduled = true;
            requestAnimationFrameWithTimeout(animationTick);
          }
        };
        cancelHostCallback = function() {
          scheduledHostCallback = null;
          isMessageEventScheduled = false;
          timeoutTime = -1;
        };
      }
      exports.unstable_ImmediatePriority = ImmediatePriority;
      exports.unstable_UserBlockingPriority = UserBlockingPriority;
      exports.unstable_NormalPriority = NormalPriority;
      exports.unstable_IdlePriority = IdlePriority;
      exports.unstable_LowPriority = LowPriority;
      exports.unstable_runWithPriority = unstable_runWithPriority;
      exports.unstable_next = unstable_next;
      exports.unstable_scheduleCallback = unstable_scheduleCallback;
      exports.unstable_cancelCallback = unstable_cancelCallback;
      exports.unstable_wrapCallback = unstable_wrapCallback;
      exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
      exports.unstable_shouldYield = unstable_shouldYield;
      exports.unstable_continueExecution = unstable_continueExecution;
      exports.unstable_pauseExecution = unstable_pauseExecution;
      exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
    })();
  }
})(require('process'));
