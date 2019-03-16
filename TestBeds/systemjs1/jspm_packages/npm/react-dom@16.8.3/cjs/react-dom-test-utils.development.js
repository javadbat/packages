/* */ 
(function(process) {
  'use strict';
  if (process.env.NODE_ENV !== "production") {
    (function() {
      'use strict';
      var _assign = require('object-assign');
      var React = require('react');
      var ReactDOM = require('../index');
      var validateFormat = function() {};
      {
        validateFormat = function(format) {
          if (format === undefined) {
            throw new Error('invariant requires an error message argument');
          }
        };
      }
      function invariant(condition, format, a, b, c, d, e, f) {
        validateFormat(format);
        if (!condition) {
          var error = void 0;
          if (format === undefined) {
            error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
          } else {
            var args = [a, b, c, d, e, f];
            var argIndex = 0;
            error = new Error(format.replace(/%s/g, function() {
              return args[argIndex++];
            }));
            error.name = 'Invariant Violation';
          }
          error.framesToPop = 1;
          throw error;
        }
      }
      var warningWithoutStack = function() {};
      {
        warningWithoutStack = function(condition, format) {
          for (var _len = arguments.length,
              args = Array(_len > 2 ? _len - 2 : 0),
              _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }
          if (format === undefined) {
            throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
          }
          if (args.length > 8) {
            throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
          }
          if (condition) {
            return;
          }
          if (typeof console !== 'undefined') {
            var argsWithFormat = args.map(function(item) {
              return '' + item;
            });
            argsWithFormat.unshift('Warning: ' + format);
            Function.prototype.apply.call(console.error, console, argsWithFormat);
          }
          try {
            var argIndex = 0;
            var message = 'Warning: ' + format.replace(/%s/g, function() {
              return args[argIndex++];
            });
            throw new Error(message);
          } catch (x) {}
        };
      }
      var warningWithoutStack$1 = warningWithoutStack;
      function get(key) {
        return key._reactInternalFiber;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      if (!ReactSharedInternals.hasOwnProperty('ReactCurrentDispatcher')) {
        ReactSharedInternals.ReactCurrentDispatcher = {current: null};
      }
      var FunctionComponent = 0;
      var ClassComponent = 1;
      var HostRoot = 3;
      var HostComponent = 5;
      var HostText = 6;
      var NoEffect = 0;
      var Placement = 2;
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var MOUNTING = 1;
      var MOUNTED = 2;
      var UNMOUNTED = 3;
      function isFiberMountedImpl(fiber) {
        var node = fiber;
        if (!fiber.alternate) {
          if ((node.effectTag & Placement) !== NoEffect) {
            return MOUNTING;
          }
          while (node.return) {
            node = node.return;
            if ((node.effectTag & Placement) !== NoEffect) {
              return MOUNTING;
            }
          }
        } else {
          while (node.return) {
            node = node.return;
          }
        }
        if (node.tag === HostRoot) {
          return MOUNTED;
        }
        return UNMOUNTED;
      }
      function assertIsMounted(fiber) {
        !(isFiberMountedImpl(fiber) === MOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          var state = isFiberMountedImpl(fiber);
          !(state !== UNMOUNTED) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
          if (state === MOUNTING) {
            return null;
          }
          return fiber;
        }
        var a = fiber;
        var b = alternate;
        while (true) {
          var parentA = a.return;
          var parentB = parentA ? parentA.alternate : null;
          if (!parentA || !parentB) {
            break;
          }
          if (parentA.child === parentB.child) {
            var child = parentA.child;
            while (child) {
              if (child === a) {
                assertIsMounted(parentA);
                return fiber;
              }
              if (child === b) {
                assertIsMounted(parentA);
                return alternate;
              }
              child = child.sibling;
            }
            invariant(false, 'Unable to find node on an unmounted component.');
          }
          if (a.return !== b.return) {
            a = parentA;
            b = parentB;
          } else {
            var didFindChild = false;
            var _child = parentA.child;
            while (_child) {
              if (_child === a) {
                didFindChild = true;
                a = parentA;
                b = parentB;
                break;
              }
              if (_child === b) {
                didFindChild = true;
                b = parentA;
                a = parentB;
                break;
              }
              _child = _child.sibling;
            }
            if (!didFindChild) {
              _child = parentB.child;
              while (_child) {
                if (_child === a) {
                  didFindChild = true;
                  a = parentB;
                  b = parentA;
                  break;
                }
                if (_child === b) {
                  didFindChild = true;
                  b = parentB;
                  a = parentA;
                  break;
                }
                _child = _child.sibling;
              }
              !didFindChild ? invariant(false, 'Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.') : void 0;
            }
          }
          !(a.alternate === b) ? invariant(false, 'Return fibers should always be each others\' alternates. This error is likely caused by a bug in React. Please file an issue.') : void 0;
        }
        !(a.tag === HostRoot) ? invariant(false, 'Unable to find node on an unmounted component.') : void 0;
        if (a.stateNode.current === a) {
          return fiber;
        }
        return alternate;
      }
      var EVENT_POOL_SIZE = 10;
      var EventInterface = {
        type: null,
        target: null,
        currentTarget: function() {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null
      };
      function functionThatReturnsTrue() {
        return true;
      }
      function functionThatReturnsFalse() {
        return false;
      }
      function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
        {
          delete this.nativeEvent;
          delete this.preventDefault;
          delete this.stopPropagation;
          delete this.isDefaultPrevented;
          delete this.isPropagationStopped;
        }
        this.dispatchConfig = dispatchConfig;
        this._targetInst = targetInst;
        this.nativeEvent = nativeEvent;
        var Interface = this.constructor.Interface;
        for (var propName in Interface) {
          if (!Interface.hasOwnProperty(propName)) {
            continue;
          }
          {
            delete this[propName];
          }
          var normalize = Interface[propName];
          if (normalize) {
            this[propName] = normalize(nativeEvent);
          } else {
            if (propName === 'target') {
              this.target = nativeEventTarget;
            } else {
              this[propName] = nativeEvent[propName];
            }
          }
        }
        var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
        if (defaultPrevented) {
          this.isDefaultPrevented = functionThatReturnsTrue;
        } else {
          this.isDefaultPrevented = functionThatReturnsFalse;
        }
        this.isPropagationStopped = functionThatReturnsFalse;
        return this;
      }
      _assign(SyntheticEvent.prototype, {
        preventDefault: function() {
          this.defaultPrevented = true;
          var event = this.nativeEvent;
          if (!event) {
            return;
          }
          if (event.preventDefault) {
            event.preventDefault();
          } else if (typeof event.returnValue !== 'unknown') {
            event.returnValue = false;
          }
          this.isDefaultPrevented = functionThatReturnsTrue;
        },
        stopPropagation: function() {
          var event = this.nativeEvent;
          if (!event) {
            return;
          }
          if (event.stopPropagation) {
            event.stopPropagation();
          } else if (typeof event.cancelBubble !== 'unknown') {
            event.cancelBubble = true;
          }
          this.isPropagationStopped = functionThatReturnsTrue;
        },
        persist: function() {
          this.isPersistent = functionThatReturnsTrue;
        },
        isPersistent: functionThatReturnsFalse,
        destructor: function() {
          var Interface = this.constructor.Interface;
          for (var propName in Interface) {
            {
              Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
            }
          }
          this.dispatchConfig = null;
          this._targetInst = null;
          this.nativeEvent = null;
          this.isDefaultPrevented = functionThatReturnsFalse;
          this.isPropagationStopped = functionThatReturnsFalse;
          this._dispatchListeners = null;
          this._dispatchInstances = null;
          {
            Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
            Object.defineProperty(this, 'isDefaultPrevented', getPooledWarningPropertyDefinition('isDefaultPrevented', functionThatReturnsFalse));
            Object.defineProperty(this, 'isPropagationStopped', getPooledWarningPropertyDefinition('isPropagationStopped', functionThatReturnsFalse));
            Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', function() {}));
            Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', function() {}));
          }
        }
      });
      SyntheticEvent.Interface = EventInterface;
      SyntheticEvent.extend = function(Interface) {
        var Super = this;
        var E = function() {};
        E.prototype = Super.prototype;
        var prototype = new E();
        function Class() {
          return Super.apply(this, arguments);
        }
        _assign(prototype, Class.prototype);
        Class.prototype = prototype;
        Class.prototype.constructor = Class;
        Class.Interface = _assign({}, Super.Interface, Interface);
        Class.extend = Super.extend;
        addEventPoolingTo(Class);
        return Class;
      };
      addEventPoolingTo(SyntheticEvent);
      function getPooledWarningPropertyDefinition(propName, getVal) {
        var isFunction = typeof getVal === 'function';
        return {
          configurable: true,
          set: set,
          get: get
        };
        function set(val) {
          var action = isFunction ? 'setting the method' : 'setting the property';
          warn(action, 'This is effectively a no-op');
          return val;
        }
        function get() {
          var action = isFunction ? 'accessing the method' : 'accessing the property';
          var result = isFunction ? 'This is a no-op function' : 'This is set to null';
          warn(action, result);
          return getVal;
        }
        function warn(action, result) {
          var warningCondition = false;
          !warningCondition ? warningWithoutStack$1(false, "This synthetic event is reused for performance reasons. If you're seeing this, " + "you're %s `%s` on a released/nullified synthetic event. %s. " + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
        }
      }
      function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
        var EventConstructor = this;
        if (EventConstructor.eventPool.length) {
          var instance = EventConstructor.eventPool.pop();
          EventConstructor.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
          return instance;
        }
        return new EventConstructor(dispatchConfig, targetInst, nativeEvent, nativeInst);
      }
      function releasePooledEvent(event) {
        var EventConstructor = this;
        !(event instanceof EventConstructor) ? invariant(false, 'Trying to release an event instance into a pool of a different type.') : void 0;
        event.destructor();
        if (EventConstructor.eventPool.length < EVENT_POOL_SIZE) {
          EventConstructor.eventPool.push(event);
        }
      }
      function addEventPoolingTo(EventConstructor) {
        EventConstructor.eventPool = [];
        EventConstructor.getPooled = getPooledEvent;
        EventConstructor.release = releasePooledEvent;
      }
      var lowPriorityWarning = function() {};
      {
        var printWarning = function(format) {
          for (var _len = arguments.length,
              args = Array(_len > 1 ? _len - 1 : 0),
              _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          var argIndex = 0;
          var message = 'Warning: ' + format.replace(/%s/g, function() {
            return args[argIndex++];
          });
          if (typeof console !== 'undefined') {
            console.warn(message);
          }
          try {
            throw new Error(message);
          } catch (x) {}
        };
        lowPriorityWarning = function(condition, format) {
          if (format === undefined) {
            throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
          }
          if (!condition) {
            for (var _len2 = arguments.length,
                args = Array(_len2 > 2 ? _len2 - 2 : 0),
                _key2 = 2; _key2 < _len2; _key2++) {
              args[_key2 - 2] = arguments[_key2];
            }
            printWarning.apply(undefined, [format].concat(args));
          }
        };
      }
      var lowPriorityWarning$1 = lowPriorityWarning;
      var ELEMENT_NODE = 1;
      function unsafeCastStringToDOMTopLevelType(topLevelType) {
        return topLevelType;
      }
      var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes['Webkit' + styleProp] = 'webkit' + eventName;
        prefixes['Moz' + styleProp] = 'moz' + eventName;
        return prefixes;
      }
      var vendorPrefixes = {
        animationend: makePrefixMap('Animation', 'AnimationEnd'),
        animationiteration: makePrefixMap('Animation', 'AnimationIteration'),
        animationstart: makePrefixMap('Animation', 'AnimationStart'),
        transitionend: makePrefixMap('Transition', 'TransitionEnd')
      };
      var prefixedEventNames = {};
      var style = {};
      if (canUseDOM) {
        style = document.createElement('div').style;
        if (!('AnimationEvent' in window)) {
          delete vendorPrefixes.animationend.animation;
          delete vendorPrefixes.animationiteration.animation;
          delete vendorPrefixes.animationstart.animation;
        }
        if (!('TransitionEvent' in window)) {
          delete vendorPrefixes.transitionend.transition;
        }
      }
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName]) {
          return prefixedEventNames[eventName];
        } else if (!vendorPrefixes[eventName]) {
          return eventName;
        }
        var prefixMap = vendorPrefixes[eventName];
        for (var styleProp in prefixMap) {
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style) {
            return prefixedEventNames[eventName] = prefixMap[styleProp];
          }
        }
        return eventName;
      }
      var TOP_ABORT = unsafeCastStringToDOMTopLevelType('abort');
      var TOP_ANIMATION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationend'));
      var TOP_ANIMATION_ITERATION = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationiteration'));
      var TOP_ANIMATION_START = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('animationstart'));
      var TOP_BLUR = unsafeCastStringToDOMTopLevelType('blur');
      var TOP_CAN_PLAY = unsafeCastStringToDOMTopLevelType('canplay');
      var TOP_CAN_PLAY_THROUGH = unsafeCastStringToDOMTopLevelType('canplaythrough');
      var TOP_CANCEL = unsafeCastStringToDOMTopLevelType('cancel');
      var TOP_CHANGE = unsafeCastStringToDOMTopLevelType('change');
      var TOP_CLICK = unsafeCastStringToDOMTopLevelType('click');
      var TOP_CLOSE = unsafeCastStringToDOMTopLevelType('close');
      var TOP_COMPOSITION_END = unsafeCastStringToDOMTopLevelType('compositionend');
      var TOP_COMPOSITION_START = unsafeCastStringToDOMTopLevelType('compositionstart');
      var TOP_COMPOSITION_UPDATE = unsafeCastStringToDOMTopLevelType('compositionupdate');
      var TOP_CONTEXT_MENU = unsafeCastStringToDOMTopLevelType('contextmenu');
      var TOP_COPY = unsafeCastStringToDOMTopLevelType('copy');
      var TOP_CUT = unsafeCastStringToDOMTopLevelType('cut');
      var TOP_DOUBLE_CLICK = unsafeCastStringToDOMTopLevelType('dblclick');
      var TOP_DRAG = unsafeCastStringToDOMTopLevelType('drag');
      var TOP_DRAG_END = unsafeCastStringToDOMTopLevelType('dragend');
      var TOP_DRAG_ENTER = unsafeCastStringToDOMTopLevelType('dragenter');
      var TOP_DRAG_EXIT = unsafeCastStringToDOMTopLevelType('dragexit');
      var TOP_DRAG_LEAVE = unsafeCastStringToDOMTopLevelType('dragleave');
      var TOP_DRAG_OVER = unsafeCastStringToDOMTopLevelType('dragover');
      var TOP_DRAG_START = unsafeCastStringToDOMTopLevelType('dragstart');
      var TOP_DROP = unsafeCastStringToDOMTopLevelType('drop');
      var TOP_DURATION_CHANGE = unsafeCastStringToDOMTopLevelType('durationchange');
      var TOP_EMPTIED = unsafeCastStringToDOMTopLevelType('emptied');
      var TOP_ENCRYPTED = unsafeCastStringToDOMTopLevelType('encrypted');
      var TOP_ENDED = unsafeCastStringToDOMTopLevelType('ended');
      var TOP_ERROR = unsafeCastStringToDOMTopLevelType('error');
      var TOP_FOCUS = unsafeCastStringToDOMTopLevelType('focus');
      var TOP_INPUT = unsafeCastStringToDOMTopLevelType('input');
      var TOP_KEY_DOWN = unsafeCastStringToDOMTopLevelType('keydown');
      var TOP_KEY_PRESS = unsafeCastStringToDOMTopLevelType('keypress');
      var TOP_KEY_UP = unsafeCastStringToDOMTopLevelType('keyup');
      var TOP_LOAD = unsafeCastStringToDOMTopLevelType('load');
      var TOP_LOAD_START = unsafeCastStringToDOMTopLevelType('loadstart');
      var TOP_LOADED_DATA = unsafeCastStringToDOMTopLevelType('loadeddata');
      var TOP_LOADED_METADATA = unsafeCastStringToDOMTopLevelType('loadedmetadata');
      var TOP_MOUSE_DOWN = unsafeCastStringToDOMTopLevelType('mousedown');
      var TOP_MOUSE_MOVE = unsafeCastStringToDOMTopLevelType('mousemove');
      var TOP_MOUSE_OUT = unsafeCastStringToDOMTopLevelType('mouseout');
      var TOP_MOUSE_OVER = unsafeCastStringToDOMTopLevelType('mouseover');
      var TOP_MOUSE_UP = unsafeCastStringToDOMTopLevelType('mouseup');
      var TOP_PASTE = unsafeCastStringToDOMTopLevelType('paste');
      var TOP_PAUSE = unsafeCastStringToDOMTopLevelType('pause');
      var TOP_PLAY = unsafeCastStringToDOMTopLevelType('play');
      var TOP_PLAYING = unsafeCastStringToDOMTopLevelType('playing');
      var TOP_PROGRESS = unsafeCastStringToDOMTopLevelType('progress');
      var TOP_RATE_CHANGE = unsafeCastStringToDOMTopLevelType('ratechange');
      var TOP_SCROLL = unsafeCastStringToDOMTopLevelType('scroll');
      var TOP_SEEKED = unsafeCastStringToDOMTopLevelType('seeked');
      var TOP_SEEKING = unsafeCastStringToDOMTopLevelType('seeking');
      var TOP_SELECTION_CHANGE = unsafeCastStringToDOMTopLevelType('selectionchange');
      var TOP_STALLED = unsafeCastStringToDOMTopLevelType('stalled');
      var TOP_SUSPEND = unsafeCastStringToDOMTopLevelType('suspend');
      var TOP_TEXT_INPUT = unsafeCastStringToDOMTopLevelType('textInput');
      var TOP_TIME_UPDATE = unsafeCastStringToDOMTopLevelType('timeupdate');
      var TOP_TOGGLE = unsafeCastStringToDOMTopLevelType('toggle');
      var TOP_TOUCH_CANCEL = unsafeCastStringToDOMTopLevelType('touchcancel');
      var TOP_TOUCH_END = unsafeCastStringToDOMTopLevelType('touchend');
      var TOP_TOUCH_MOVE = unsafeCastStringToDOMTopLevelType('touchmove');
      var TOP_TOUCH_START = unsafeCastStringToDOMTopLevelType('touchstart');
      var TOP_TRANSITION_END = unsafeCastStringToDOMTopLevelType(getVendorPrefixedEventName('transitionend'));
      var TOP_VOLUME_CHANGE = unsafeCastStringToDOMTopLevelType('volumechange');
      var TOP_WAITING = unsafeCastStringToDOMTopLevelType('waiting');
      var TOP_WHEEL = unsafeCastStringToDOMTopLevelType('wheel');
      var findDOMNode = ReactDOM.findDOMNode;
      var _ReactDOM$__SECRET_IN = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.Events;
      var getInstanceFromNode = _ReactDOM$__SECRET_IN[0];
      var getNodeFromInstance = _ReactDOM$__SECRET_IN[1];
      var getFiberCurrentPropsFromNode = _ReactDOM$__SECRET_IN[2];
      var injectEventPluginsByName = _ReactDOM$__SECRET_IN[3];
      var eventNameDispatchConfigs = _ReactDOM$__SECRET_IN[4];
      var accumulateTwoPhaseDispatches = _ReactDOM$__SECRET_IN[5];
      var accumulateDirectDispatches = _ReactDOM$__SECRET_IN[6];
      var enqueueStateRestore = _ReactDOM$__SECRET_IN[7];
      var restoreStateIfNeeded = _ReactDOM$__SECRET_IN[8];
      var dispatchEvent = _ReactDOM$__SECRET_IN[9];
      var runEventsInBatch = _ReactDOM$__SECRET_IN[10];
      function Event(suffix) {}
      var hasWarnedAboutDeprecatedMockComponent = false;
      function simulateNativeEventOnNode(topLevelType, node, fakeNativeEvent) {
        fakeNativeEvent.target = node;
        dispatchEvent(topLevelType, fakeNativeEvent);
      }
      function simulateNativeEventOnDOMComponent(topLevelType, comp, fakeNativeEvent) {
        simulateNativeEventOnNode(topLevelType, findDOMNode(comp), fakeNativeEvent);
      }
      function findAllInRenderedFiberTreeInternal(fiber, test) {
        if (!fiber) {
          return [];
        }
        var currentParent = findCurrentFiberUsingSlowPath(fiber);
        if (!currentParent) {
          return [];
        }
        var node = currentParent;
        var ret = [];
        while (true) {
          if (node.tag === HostComponent || node.tag === HostText || node.tag === ClassComponent || node.tag === FunctionComponent) {
            var publicInst = node.stateNode;
            if (test(publicInst)) {
              ret.push(publicInst);
            }
          }
          if (node.child) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === currentParent) {
            return ret;
          }
          while (!node.sibling) {
            if (!node.return || node.return === currentParent) {
              return ret;
            }
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
      }
      function validateClassInstance(inst, methodName) {
        if (!inst) {
          return;
        }
        if (get(inst)) {
          return;
        }
        var received = void 0;
        var stringified = '' + inst;
        if (Array.isArray(inst)) {
          received = 'an array';
        } else if (inst && inst.nodeType === ELEMENT_NODE && inst.tagName) {
          received = 'a DOM node';
        } else if (stringified === '[object Object]') {
          received = 'object with keys {' + Object.keys(inst).join(', ') + '}';
        } else {
          received = stringified;
        }
        invariant(false, '%s(...): the first argument must be a React class instance. Instead received: %s.', methodName, received);
      }
      var actContainerElement = null;
      var ReactTestUtils = {
        renderIntoDocument: function(element) {
          var div = document.createElement('div');
          return ReactDOM.render(element, div);
        },
        isElement: function(element) {
          return React.isValidElement(element);
        },
        isElementOfType: function(inst, convenienceConstructor) {
          return React.isValidElement(inst) && inst.type === convenienceConstructor;
        },
        isDOMComponent: function(inst) {
          return !!(inst && inst.nodeType === ELEMENT_NODE && inst.tagName);
        },
        isDOMComponentElement: function(inst) {
          return !!(inst && React.isValidElement(inst) && !!inst.tagName);
        },
        isCompositeComponent: function(inst) {
          if (ReactTestUtils.isDOMComponent(inst)) {
            return false;
          }
          return inst != null && typeof inst.render === 'function' && typeof inst.setState === 'function';
        },
        isCompositeComponentWithType: function(inst, type) {
          if (!ReactTestUtils.isCompositeComponent(inst)) {
            return false;
          }
          var internalInstance = get(inst);
          var constructor = internalInstance.type;
          return constructor === type;
        },
        findAllInRenderedTree: function(inst, test) {
          validateClassInstance(inst, 'findAllInRenderedTree');
          if (!inst) {
            return [];
          }
          var internalInstance = get(inst);
          return findAllInRenderedFiberTreeInternal(internalInstance, test);
        },
        scryRenderedDOMComponentsWithClass: function(root, classNames) {
          validateClassInstance(root, 'scryRenderedDOMComponentsWithClass');
          return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
            if (ReactTestUtils.isDOMComponent(inst)) {
              var className = inst.className;
              if (typeof className !== 'string') {
                className = inst.getAttribute('class') || '';
              }
              var classList = className.split(/\s+/);
              if (!Array.isArray(classNames)) {
                !(classNames !== undefined) ? invariant(false, 'TestUtils.scryRenderedDOMComponentsWithClass expects a className as a second argument.') : void 0;
                classNames = classNames.split(/\s+/);
              }
              return classNames.every(function(name) {
                return classList.indexOf(name) !== -1;
              });
            }
            return false;
          });
        },
        findRenderedDOMComponentWithClass: function(root, className) {
          validateClassInstance(root, 'findRenderedDOMComponentWithClass');
          var all = ReactTestUtils.scryRenderedDOMComponentsWithClass(root, className);
          if (all.length !== 1) {
            throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for class:' + className);
          }
          return all[0];
        },
        scryRenderedDOMComponentsWithTag: function(root, tagName) {
          validateClassInstance(root, 'scryRenderedDOMComponentsWithTag');
          return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
            return ReactTestUtils.isDOMComponent(inst) && inst.tagName.toUpperCase() === tagName.toUpperCase();
          });
        },
        findRenderedDOMComponentWithTag: function(root, tagName) {
          validateClassInstance(root, 'findRenderedDOMComponentWithTag');
          var all = ReactTestUtils.scryRenderedDOMComponentsWithTag(root, tagName);
          if (all.length !== 1) {
            throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for tag:' + tagName);
          }
          return all[0];
        },
        scryRenderedComponentsWithType: function(root, componentType) {
          validateClassInstance(root, 'scryRenderedComponentsWithType');
          return ReactTestUtils.findAllInRenderedTree(root, function(inst) {
            return ReactTestUtils.isCompositeComponentWithType(inst, componentType);
          });
        },
        findRenderedComponentWithType: function(root, componentType) {
          validateClassInstance(root, 'findRenderedComponentWithType');
          var all = ReactTestUtils.scryRenderedComponentsWithType(root, componentType);
          if (all.length !== 1) {
            throw new Error('Did not find exactly one match (found: ' + all.length + ') ' + 'for componentType:' + componentType);
          }
          return all[0];
        },
        mockComponent: function(module, mockTagName) {
          if (!hasWarnedAboutDeprecatedMockComponent) {
            hasWarnedAboutDeprecatedMockComponent = true;
            lowPriorityWarning$1(false, 'ReactTestUtils.mockComponent() is deprecated. ' + 'Use shallow rendering or jest.mock() instead.\n\n' + 'See https://fb.me/test-utils-mock-component for more information.');
          }
          mockTagName = mockTagName || module.mockTagName || 'div';
          module.prototype.render.mockImplementation(function() {
            return React.createElement(mockTagName, null, this.props.children);
          });
          return this;
        },
        nativeTouchData: function(x, y) {
          return {touches: [{
              pageX: x,
              pageY: y
            }]};
        },
        Simulate: null,
        SimulateNative: {},
        act: function(callback) {
          if (actContainerElement === null) {
            {
              !(typeof document !== 'undefined' && document !== null && typeof document.createElement === 'function') ? warningWithoutStack$1(false, 'It looks like you called TestUtils.act(...) in a non-browser environment. ' + "If you're using TestRenderer for your tests, you should call " + 'TestRenderer.act(...) instead of TestUtils.act(...).') : void 0;
            }
            actContainerElement = document.createElement('div');
          }
          var result = ReactDOM.unstable_batchedUpdates(callback);
          {
            if (result !== undefined) {
              var addendum = void 0;
              if (result !== null && typeof result.then === 'function') {
                addendum = '\n\nIt looks like you wrote ReactTestUtils.act(async () => ...), ' + 'or returned a Promise from the callback passed to it. ' + 'Putting asynchronous logic inside ReactTestUtils.act(...) is not supported.\n';
              } else {
                addendum = ' You returned: ' + result;
              }
              warningWithoutStack$1(false, 'The callback passed to ReactTestUtils.act(...) function must not return anything.%s', addendum);
            }
          }
          ReactDOM.render(React.createElement('div', null), actContainerElement);
          return {then: function() {
              {
                warningWithoutStack$1(false, 'Do not await the result of calling ReactTestUtils.act(...), it is not a Promise.');
              }
            }};
        }
      };
      function makeSimulator(eventType) {
        return function(domNode, eventData) {
          !!React.isValidElement(domNode) ? invariant(false, 'TestUtils.Simulate expected a DOM node as the first argument but received a React element. Pass the DOM node you wish to simulate the event on instead. Note that TestUtils.Simulate will not work if you are using shallow rendering.') : void 0;
          !!ReactTestUtils.isCompositeComponent(domNode) ? invariant(false, 'TestUtils.Simulate expected a DOM node as the first argument but received a component instance. Pass the DOM node you wish to simulate the event on instead.') : void 0;
          var dispatchConfig = eventNameDispatchConfigs[eventType];
          var fakeNativeEvent = new Event();
          fakeNativeEvent.target = domNode;
          fakeNativeEvent.type = eventType.toLowerCase();
          var targetInst = getInstanceFromNode(domNode);
          var event = new SyntheticEvent(dispatchConfig, targetInst, fakeNativeEvent, domNode);
          event.persist();
          _assign(event, eventData);
          if (dispatchConfig.phasedRegistrationNames) {
            accumulateTwoPhaseDispatches(event);
          } else {
            accumulateDirectDispatches(event);
          }
          ReactDOM.unstable_batchedUpdates(function() {
            enqueueStateRestore(domNode);
            runEventsInBatch(event);
          });
          restoreStateIfNeeded();
        };
      }
      function buildSimulators() {
        ReactTestUtils.Simulate = {};
        var eventType = void 0;
        for (eventType in eventNameDispatchConfigs) {
          ReactTestUtils.Simulate[eventType] = makeSimulator(eventType);
        }
      }
      buildSimulators();
      function makeNativeSimulator(eventType, topLevelType) {
        return function(domComponentOrNode, nativeEventData) {
          var fakeNativeEvent = new Event(eventType);
          _assign(fakeNativeEvent, nativeEventData);
          if (ReactTestUtils.isDOMComponent(domComponentOrNode)) {
            simulateNativeEventOnDOMComponent(topLevelType, domComponentOrNode, fakeNativeEvent);
          } else if (domComponentOrNode.tagName) {
            simulateNativeEventOnNode(topLevelType, domComponentOrNode, fakeNativeEvent);
          }
        };
      }
      [[TOP_ABORT, 'abort'], [TOP_ANIMATION_END, 'animationEnd'], [TOP_ANIMATION_ITERATION, 'animationIteration'], [TOP_ANIMATION_START, 'animationStart'], [TOP_BLUR, 'blur'], [TOP_CAN_PLAY_THROUGH, 'canPlayThrough'], [TOP_CAN_PLAY, 'canPlay'], [TOP_CANCEL, 'cancel'], [TOP_CHANGE, 'change'], [TOP_CLICK, 'click'], [TOP_CLOSE, 'close'], [TOP_COMPOSITION_END, 'compositionEnd'], [TOP_COMPOSITION_START, 'compositionStart'], [TOP_COMPOSITION_UPDATE, 'compositionUpdate'], [TOP_CONTEXT_MENU, 'contextMenu'], [TOP_COPY, 'copy'], [TOP_CUT, 'cut'], [TOP_DOUBLE_CLICK, 'doubleClick'], [TOP_DRAG_END, 'dragEnd'], [TOP_DRAG_ENTER, 'dragEnter'], [TOP_DRAG_EXIT, 'dragExit'], [TOP_DRAG_LEAVE, 'dragLeave'], [TOP_DRAG_OVER, 'dragOver'], [TOP_DRAG_START, 'dragStart'], [TOP_DRAG, 'drag'], [TOP_DROP, 'drop'], [TOP_DURATION_CHANGE, 'durationChange'], [TOP_EMPTIED, 'emptied'], [TOP_ENCRYPTED, 'encrypted'], [TOP_ENDED, 'ended'], [TOP_ERROR, 'error'], [TOP_FOCUS, 'focus'], [TOP_INPUT, 'input'], [TOP_KEY_DOWN, 'keyDown'], [TOP_KEY_PRESS, 'keyPress'], [TOP_KEY_UP, 'keyUp'], [TOP_LOAD_START, 'loadStart'], [TOP_LOAD_START, 'loadStart'], [TOP_LOAD, 'load'], [TOP_LOADED_DATA, 'loadedData'], [TOP_LOADED_METADATA, 'loadedMetadata'], [TOP_MOUSE_DOWN, 'mouseDown'], [TOP_MOUSE_MOVE, 'mouseMove'], [TOP_MOUSE_OUT, 'mouseOut'], [TOP_MOUSE_OVER, 'mouseOver'], [TOP_MOUSE_UP, 'mouseUp'], [TOP_PASTE, 'paste'], [TOP_PAUSE, 'pause'], [TOP_PLAY, 'play'], [TOP_PLAYING, 'playing'], [TOP_PROGRESS, 'progress'], [TOP_RATE_CHANGE, 'rateChange'], [TOP_SCROLL, 'scroll'], [TOP_SEEKED, 'seeked'], [TOP_SEEKING, 'seeking'], [TOP_SELECTION_CHANGE, 'selectionChange'], [TOP_STALLED, 'stalled'], [TOP_SUSPEND, 'suspend'], [TOP_TEXT_INPUT, 'textInput'], [TOP_TIME_UPDATE, 'timeUpdate'], [TOP_TOGGLE, 'toggle'], [TOP_TOUCH_CANCEL, 'touchCancel'], [TOP_TOUCH_END, 'touchEnd'], [TOP_TOUCH_MOVE, 'touchMove'], [TOP_TOUCH_START, 'touchStart'], [TOP_TRANSITION_END, 'transitionEnd'], [TOP_VOLUME_CHANGE, 'volumeChange'], [TOP_WAITING, 'waiting'], [TOP_WHEEL, 'wheel']].forEach(function(_ref) {
        var topLevelType = _ref[0],
            eventType = _ref[1];
        ReactTestUtils.SimulateNative[eventType] = makeNativeSimulator(eventType, topLevelType);
      });
      var ReactTestUtils$2 = Object.freeze({default: ReactTestUtils});
      var ReactTestUtils$3 = (ReactTestUtils$2 && ReactTestUtils) || ReactTestUtils$2;
      var testUtils = ReactTestUtils$3.default || ReactTestUtils$3;
      module.exports = testUtils;
    })();
  }
})(require('process'));
