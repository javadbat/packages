/* */ 
(function(process) {
  'use strict';
  Object.defineProperty(exports, '__esModule', {value: true});
  var extendStatics = Object.setPrototypeOf || ({__proto__: []} instanceof Array && function(d, b) {
    d.__proto__ = b;
  }) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
  };
  function __extends(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  var __assign = Object.assign || function __assign(t) {
    for (var s,
        i = 1,
        n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m)
      return m.call(o);
    return {next: function() {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }};
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = {error: error};
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spread() {
    for (var ar = [],
        i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
    return ar;
  }
  var OBFUSCATED_ERROR$$1 = "An invariant failed, however the error is obfuscated because this is an production build.";
  var EMPTY_ARRAY$$1 = [];
  Object.freeze(EMPTY_ARRAY$$1);
  var EMPTY_OBJECT$$1 = {};
  Object.freeze(EMPTY_OBJECT$$1);
  function getNextId$$1() {
    return ++globalState$$1.mobxGuid;
  }
  function fail$$1(message) {
    invariant$$1(false, message);
    throw "X";
  }
  function invariant$$1(check, message) {
    if (!check)
      throw new Error("[mobx] " + (message || OBFUSCATED_ERROR$$1));
  }
  var deprecatedMessages = [];
  function deprecated$$1(msg, thing) {
    if (process.env.NODE_ENV === "production")
      return false;
    if (thing) {
      return deprecated$$1("'" + msg + "', use '" + thing + "' instead.");
    }
    if (deprecatedMessages.indexOf(msg) !== -1)
      return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
  }
  function once$$1(func) {
    var invoked = false;
    return function() {
      if (invoked)
        return;
      invoked = true;
      return func.apply(this, arguments);
    };
  }
  var noop$$1 = function() {};
  function unique$$1(list) {
    var res = [];
    list.forEach(function(item) {
      if (res.indexOf(item) === -1)
        res.push(item);
    });
    return res;
  }
  function isObject$$1(value) {
    return value !== null && typeof value === "object";
  }
  function isPlainObject$$1(value) {
    if (value === null || typeof value !== "object")
      return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
  }
  function addHiddenProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
      enumerable: false,
      writable: true,
      configurable: true,
      value: value
    });
  }
  function addHiddenFinalProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
      enumerable: false,
      writable: false,
      configurable: true,
      value: value
    });
  }
  function isPropertyConfigurable$$1(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
  }
  function assertPropertyConfigurable$$1(object, prop) {
    if (process.env.NODE_ENV !== "production" && !isPropertyConfigurable$$1(object, prop))
      fail$$1("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
  }
  function createInstanceofPredicate$$1(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function(x) {
      return isObject$$1(x) && x[propName] === true;
    };
  }
  function isArrayLike$$1(x) {
    return Array.isArray(x) || isObservableArray$$1(x);
  }
  function isES6Map$$1(thing) {
    return thing instanceof Map;
  }
  function isES6Set$$1(thing) {
    return thing instanceof Set;
  }
  function getMapLikeKeys$$1(map) {
    if (isPlainObject$$1(map))
      return Object.keys(map);
    if (Array.isArray(map))
      return map.map(function(_a) {
        var _b = __read(_a, 1),
            key = _b[0];
        return key;
      });
    if (isES6Map$$1(map) || isObservableMap$$1(map))
      return Array.from(map.keys());
    return fail$$1("Cannot get keys from '" + map + "'");
  }
  function toPrimitive$$1(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
  }
  var $mobx$$1 = Symbol("mobx administration");
  var Atom$$1 = (function() {
    function Atom$$1(name) {
      if (name === void 0) {
        name = "Atom@" + getNextId$$1();
      }
      this.name = name;
      this.isPendingUnobservation = false;
      this.isBeingObserved = false;
      this.observers = new Set();
      this.diffValue = 0;
      this.lastAccessedBy = 0;
      this.lowestObserverState = exports.IDerivationState.NOT_TRACKING;
    }
    Atom$$1.prototype.onBecomeObserved = function() {
      if (this.onBecomeObservedListeners) {
        this.onBecomeObservedListeners.forEach(function(listener) {
          return listener();
        });
      }
    };
    Atom$$1.prototype.onBecomeUnobserved = function() {
      if (this.onBecomeUnobservedListeners) {
        this.onBecomeUnobservedListeners.forEach(function(listener) {
          return listener();
        });
      }
    };
    Atom$$1.prototype.reportObserved = function() {
      return reportObserved$$1(this);
    };
    Atom$$1.prototype.reportChanged = function() {
      startBatch$$1();
      propagateChanged$$1(this);
      endBatch$$1();
    };
    Atom$$1.prototype.toString = function() {
      return this.name;
    };
    return Atom$$1;
  }());
  var isAtom$$1 = createInstanceofPredicate$$1("Atom", Atom$$1);
  function createAtom$$1(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) {
      onBecomeObservedHandler = noop$$1;
    }
    if (onBecomeUnobservedHandler === void 0) {
      onBecomeUnobservedHandler = noop$$1;
    }
    var atom = new Atom$$1(name);
    if (onBecomeObservedHandler !== noop$$1) {
      onBecomeObserved$$1(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop$$1) {
      onBecomeUnobserved$$1(atom, onBecomeUnobservedHandler);
    }
    return atom;
  }
  function identityComparer(a, b) {
    return a === b;
  }
  function structuralComparer(a, b) {
    return deepEqual$$1(a, b);
  }
  function defaultComparer(a, b) {
    return Object.is(a, b);
  }
  var comparer$$1 = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
  };
  var mobxDidRunLazyInitializersSymbol$$1 = Symbol("mobx did run lazy initializers");
  var mobxPendingDecorators$$1 = Symbol("mobx pending decorators");
  var enumerableDescriptorCache = {};
  var nonEnumerableDescriptorCache = {};
  function createPropertyInitializerDescriptor(prop, enumerable) {
    var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] || (cache[prop] = {
      configurable: true,
      enumerable: enumerable,
      get: function() {
        initializeInstance$$1(this);
        return this[prop];
      },
      set: function(value) {
        initializeInstance$$1(this);
        this[prop] = value;
      }
    }));
  }
  function initializeInstance$$1(target) {
    if (target[mobxDidRunLazyInitializersSymbol$$1] === true)
      return;
    var decorators = target[mobxPendingDecorators$$1];
    if (decorators) {
      addHiddenProp$$1(target, mobxDidRunLazyInitializersSymbol$$1, true);
      for (var key in decorators) {
        var d = decorators[key];
        d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
      }
    }
  }
  function createPropDecorator$$1(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
      var decoratorArguments;
      var decorator = function decorate$$1(target, prop, descriptor, applyImmediately) {
        if (applyImmediately === true) {
          propertyCreator(target, prop, descriptor, target, decoratorArguments);
          return null;
        }
        if (process.env.NODE_ENV !== "production" && !quacksLikeADecorator$$1(arguments))
          fail$$1("This function is a decorator, but it wasn't invoked like a decorator");
        if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators$$1)) {
          var inheritedDecorators = target[mobxPendingDecorators$$1];
          addHiddenProp$$1(target, mobxPendingDecorators$$1, __assign({}, inheritedDecorators));
        }
        target[mobxPendingDecorators$$1][prop] = {
          prop: prop,
          propertyCreator: propertyCreator,
          descriptor: descriptor,
          decoratorTarget: target,
          decoratorArguments: decoratorArguments
        };
        return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
      };
      if (quacksLikeADecorator$$1(arguments)) {
        decoratorArguments = EMPTY_ARRAY$$1;
        return decorator.apply(null, arguments);
      } else {
        decoratorArguments = Array.prototype.slice.call(arguments);
        return decorator;
      }
    };
  }
  function quacksLikeADecorator$$1(args) {
    return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") || (args.length === 4 && args[3] === true));
  }
  function deepEnhancer$$1(v, _, name) {
    if (isObservable$$1(v))
      return v;
    if (Array.isArray(v))
      return observable$$1.array(v, {name: name});
    if (isPlainObject$$1(v))
      return observable$$1.object(v, undefined, {name: name});
    if (isES6Map$$1(v))
      return observable$$1.map(v, {name: name});
    if (isES6Set$$1(v))
      return observable$$1.set(v, {name: name});
    return v;
  }
  function shallowEnhancer$$1(v, _, name) {
    if (v === undefined || v === null)
      return v;
    if (isObservableObject$$1(v) || isObservableArray$$1(v) || isObservableMap$$1(v) || isObservableSet$$1(v))
      return v;
    if (Array.isArray(v))
      return observable$$1.array(v, {
        name: name,
        deep: false
      });
    if (isPlainObject$$1(v))
      return observable$$1.object(v, undefined, {
        name: name,
        deep: false
      });
    if (isES6Map$$1(v))
      return observable$$1.map(v, {
        name: name,
        deep: false
      });
    if (isES6Set$$1(v))
      return observable$$1.set(v, {
        name: name,
        deep: false
      });
    return fail$$1(process.env.NODE_ENV !== "production" && "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
  }
  function referenceEnhancer$$1(newValue) {
    return newValue;
  }
  function refStructEnhancer$$1(v, oldValue, name) {
    if (process.env.NODE_ENV !== "production" && isObservable$$1(v))
      throw "observable.struct should not be used with observable values";
    if (deepEqual$$1(v, oldValue))
      return oldValue;
    return v;
  }
  function createDecoratorForEnhancer$$1(enhancer) {
    invariant$$1(enhancer);
    var decorator = createPropDecorator$$1(true, function(target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
      if (process.env.NODE_ENV !== "production") {
        invariant$$1(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + propertyName + "\"), use @computed instead.");
      }
      var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
      asObservableObject$$1(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    var res = typeof process !== "undefined" && process.env && process.env.NODE_ENV !== "production" ? function observableDecorator() {
      if (arguments.length < 2)
        return fail$$1("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
      return decorator.apply(null, arguments);
    } : decorator;
    res.enhancer = enhancer;
    return res;
  }
  var defaultCreateObservableOptions$$1 = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
  };
  Object.freeze(defaultCreateObservableOptions$$1);
  function assertValidOption(key) {
    if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key))
      fail$$1("invalid option for (extend)observable: " + key);
  }
  function asCreateObservableOptions$$1(thing) {
    if (thing === null || thing === undefined)
      return defaultCreateObservableOptions$$1;
    if (typeof thing === "string")
      return {
        name: thing,
        deep: true,
        proxy: true
      };
    if (process.env.NODE_ENV !== "production") {
      if (typeof thing !== "object")
        return fail$$1("expected options object");
      Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
  }
  var deepDecorator$$1 = createDecoratorForEnhancer$$1(deepEnhancer$$1);
  var shallowDecorator = createDecoratorForEnhancer$$1(shallowEnhancer$$1);
  var refDecorator$$1 = createDecoratorForEnhancer$$1(referenceEnhancer$$1);
  var refStructDecorator = createDecoratorForEnhancer$$1(refStructEnhancer$$1);
  function getEnhancerFromOptions(options) {
    return options.defaultDecorator ? options.defaultDecorator.enhancer : options.deep === false ? referenceEnhancer$$1 : deepEnhancer$$1;
  }
  function createObservable(v, arg2, arg3) {
    if (typeof arguments[1] === "string") {
      return deepDecorator$$1.apply(null, arguments);
    }
    if (isObservable$$1(v))
      return v;
    var res = isPlainObject$$1(v) ? observable$$1.object(v, arg2, arg3) : Array.isArray(v) ? observable$$1.array(v, arg2) : isES6Map$$1(v) ? observable$$1.map(v, arg2) : isES6Set$$1(v) ? observable$$1.set(v, arg2) : v;
    if (res !== v)
      return res;
    fail$$1(process.env.NODE_ENV !== "production" && "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
  }
  var observableFactories = {
    box: function(value, options) {
      if (arguments.length > 2)
        incorrectlyUsedAsDecorator("box");
      var o = asCreateObservableOptions$$1(options);
      return new ObservableValue$$1(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function(initialValues, options) {
      if (arguments.length > 2)
        incorrectlyUsedAsDecorator("array");
      var o = asCreateObservableOptions$$1(options);
      return createObservableArray$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function(initialValues, options) {
      if (arguments.length > 2)
        incorrectlyUsedAsDecorator("map");
      var o = asCreateObservableOptions$$1(options);
      return new ObservableMap$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function(initialValues, options) {
      if (arguments.length > 2)
        incorrectlyUsedAsDecorator("set");
      var o = asCreateObservableOptions$$1(options);
      return new ObservableSet$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function(props, decorators, options) {
      if (typeof arguments[1] === "string")
        incorrectlyUsedAsDecorator("object");
      var o = asCreateObservableOptions$$1(options);
      if (o.proxy === false) {
        return extendObservable$$1({}, props, decorators, o);
      } else {
        var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(o);
        var base = extendObservable$$1({}, undefined, undefined, o);
        var proxy = createDynamicObservableObject$$1(base);
        extendObservableObjectWithProperties$$1(proxy, props, decorators, defaultDecorator);
        return proxy;
      }
    },
    ref: refDecorator$$1,
    shallow: shallowDecorator,
    deep: deepDecorator$$1,
    struct: refStructDecorator
  };
  var observable$$1 = createObservable;
  Object.keys(observableFactories).forEach(function(name) {
    return (observable$$1[name] = observableFactories[name]);
  });
  function incorrectlyUsedAsDecorator(methodName) {
    fail$$1("Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
  }
  var computedDecorator$$1 = createPropDecorator$$1(false, function(instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
    var get$$1 = descriptor.get,
        set$$1 = descriptor.set;
    var options = decoratorArgs[0] || {};
    asObservableObject$$1(instance).addComputedProp(instance, propertyName, __assign({
      get: get$$1,
      set: set$$1,
      context: instance
    }, options));
  });
  var computedStructDecorator = computedDecorator$$1({equals: comparer$$1.structural});
  var computed$$1 = function computed$$1(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
      return computedDecorator$$1.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
      return computedDecorator$$1.apply(null, arguments);
    }
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(typeof arg1 === "function", "First argument to `computed` should be an expression.");
      invariant$$1(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || "";
    return new ComputedValue$$1(opts);
  };
  computed$$1.struct = computedStructDecorator;
  function createAction$$1(actionName, fn) {
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
      if (typeof actionName !== "string" || !actionName)
        fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    var res = function() {
      return executeAction$$1(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
  }
  function executeAction$$1(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    var shouldSupressReactionError = true;
    try {
      var res = fn.apply(scope, args);
      shouldSupressReactionError = false;
      return res;
    } finally {
      if (shouldSupressReactionError) {
        globalState$$1.suppressReactionErrors = shouldSupressReactionError;
        endAction(runInfo);
        globalState$$1.suppressReactionErrors = false;
      } else {
        endAction(runInfo);
      }
    }
  }
  function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled$$1() && !!actionName;
    var startTime = 0;
    if (notifySpy && process.env.NODE_ENV !== "production") {
      startTime = Date.now();
      var l = (args && args.length) || 0;
      var flattendArgs = new Array(l);
      if (l > 0)
        for (var i = 0; i < l; i++)
          flattendArgs[i] = args[i];
      spyReportStart$$1({
        type: "action",
        name: actionName,
        object: scope,
        arguments: flattendArgs
      });
    }
    var prevDerivation = untrackedStart$$1();
    startBatch$$1();
    var prevAllowStateChanges = allowStateChangesStart$$1(true);
    return {
      prevDerivation: prevDerivation,
      prevAllowStateChanges: prevAllowStateChanges,
      notifySpy: notifySpy,
      startTime: startTime
    };
  }
  function endAction(runInfo) {
    allowStateChangesEnd$$1(runInfo.prevAllowStateChanges);
    endBatch$$1();
    untrackedEnd$$1(runInfo.prevDerivation);
    if (runInfo.notifySpy && process.env.NODE_ENV !== "production")
      spyReportEnd$$1({time: Date.now() - runInfo.startTime});
  }
  function allowStateChanges$$1(allowStateChanges$$1, func) {
    var prev = allowStateChangesStart$$1(allowStateChanges$$1);
    var res;
    try {
      res = func();
    } finally {
      allowStateChangesEnd$$1(prev);
    }
    return res;
  }
  function allowStateChangesStart$$1(allowStateChanges$$1) {
    var prev = globalState$$1.allowStateChanges;
    globalState$$1.allowStateChanges = allowStateChanges$$1;
    return prev;
  }
  function allowStateChangesEnd$$1(prev) {
    globalState$$1.allowStateChanges = prev;
  }
  function allowStateChangesInsideComputed$$1(func) {
    var prev = globalState$$1.computationDepth;
    globalState$$1.computationDepth = 0;
    var res;
    try {
      res = func();
    } finally {
      globalState$$1.computationDepth = prev;
    }
    return res;
  }
  var ObservableValue$$1 = (function(_super) {
    __extends(ObservableValue$$1, _super);
    function ObservableValue$$1(value, enhancer, name, notifySpy, equals) {
      if (name === void 0) {
        name = "ObservableValue@" + getNextId$$1();
      }
      if (notifySpy === void 0) {
        notifySpy = true;
      }
      if (equals === void 0) {
        equals = comparer$$1.default;
      }
      var _this = _super.call(this, name) || this;
      _this.enhancer = enhancer;
      _this.name = name;
      _this.equals = equals;
      _this.hasUnreportedChange = false;
      _this.value = enhancer(value, undefined, name);
      if (notifySpy && isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
        spyReport$$1({
          type: "create",
          name: _this.name,
          newValue: "" + _this.value
        });
      }
      return _this;
    }
    ObservableValue$$1.prototype.dehanceValue = function(value) {
      if (this.dehancer !== undefined)
        return this.dehancer(value);
      return value;
    };
    ObservableValue$$1.prototype.set = function(newValue) {
      var oldValue = this.value;
      newValue = this.prepareNewValue(newValue);
      if (newValue !== globalState$$1.UNCHANGED) {
        var notifySpy = isSpyEnabled$$1();
        if (notifySpy && process.env.NODE_ENV !== "production") {
          spyReportStart$$1({
            type: "update",
            name: this.name,
            newValue: newValue,
            oldValue: oldValue
          });
        }
        this.setNewValue(newValue);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
      }
    };
    ObservableValue$$1.prototype.prepareNewValue = function(newValue) {
      checkIfStateModificationsAreAllowed$$1(this);
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          object: this,
          type: "update",
          newValue: newValue
        });
        if (!change)
          return globalState$$1.UNCHANGED;
        newValue = change.newValue;
      }
      newValue = this.enhancer(newValue, this.value, this.name);
      return this.equals(this.value, newValue) ? globalState$$1.UNCHANGED : newValue;
    };
    ObservableValue$$1.prototype.setNewValue = function(newValue) {
      var oldValue = this.value;
      this.value = newValue;
      this.reportChanged();
      if (hasListeners$$1(this)) {
        notifyListeners$$1(this, {
          type: "update",
          object: this,
          newValue: newValue,
          oldValue: oldValue
        });
      }
    };
    ObservableValue$$1.prototype.get = function() {
      this.reportObserved();
      return this.dehanceValue(this.value);
    };
    ObservableValue$$1.prototype.intercept = function(handler) {
      return registerInterceptor$$1(this, handler);
    };
    ObservableValue$$1.prototype.observe = function(listener, fireImmediately) {
      if (fireImmediately)
        listener({
          object: this,
          type: "update",
          newValue: this.value,
          oldValue: undefined
        });
      return registerListener$$1(this, listener);
    };
    ObservableValue$$1.prototype.toJSON = function() {
      return this.get();
    };
    ObservableValue$$1.prototype.toString = function() {
      return this.name + "[" + this.value + "]";
    };
    ObservableValue$$1.prototype.valueOf = function() {
      return toPrimitive$$1(this.get());
    };
    ObservableValue$$1.prototype[Symbol.toPrimitive] = function() {
      return this.valueOf();
    };
    return ObservableValue$$1;
  }(Atom$$1));
  var isObservableValue$$1 = createInstanceofPredicate$$1("ObservableValue", ObservableValue$$1);
  var ComputedValue$$1 = (function() {
    function ComputedValue$$1(options) {
      this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
      this.observing = [];
      this.newObserving = null;
      this.isBeingObserved = false;
      this.isPendingUnobservation = false;
      this.observers = new Set();
      this.diffValue = 0;
      this.runId = 0;
      this.lastAccessedBy = 0;
      this.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
      this.unboundDepsCount = 0;
      this.__mapid = "#" + getNextId$$1();
      this.value = new CaughtException$$1(null);
      this.isComputing = false;
      this.isRunningSetter = false;
      this.isTracing = TraceMode$$1.NONE;
      if (process.env.NODE_ENV !== "production" && !options.get)
        throw "[mobx] missing option for computed: get";
      this.derivation = options.get;
      this.name = options.name || "ComputedValue@" + getNextId$$1();
      if (options.set)
        this.setter = createAction$$1(this.name + "-setter", options.set);
      this.equals = options.equals || (options.compareStructural || options.struct ? comparer$$1.structural : comparer$$1.default);
      this.scope = options.context;
      this.requiresReaction = !!options.requiresReaction;
      this.keepAlive = !!options.keepAlive;
    }
    ComputedValue$$1.prototype.onBecomeStale = function() {
      propagateMaybeChanged$$1(this);
    };
    ComputedValue$$1.prototype.onBecomeObserved = function() {
      if (this.onBecomeObservedListeners) {
        this.onBecomeObservedListeners.forEach(function(listener) {
          return listener();
        });
      }
    };
    ComputedValue$$1.prototype.onBecomeUnobserved = function() {
      if (this.onBecomeUnobservedListeners) {
        this.onBecomeUnobservedListeners.forEach(function(listener) {
          return listener();
        });
      }
    };
    ComputedValue$$1.prototype.get = function() {
      if (this.isComputing)
        fail$$1("Cycle detected in computation " + this.name + ": " + this.derivation);
      if (globalState$$1.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
        if (shouldCompute$$1(this)) {
          this.warnAboutUntrackedRead();
          startBatch$$1();
          this.value = this.computeValue(false);
          endBatch$$1();
        }
      } else {
        reportObserved$$1(this);
        if (shouldCompute$$1(this))
          if (this.trackAndCompute())
            propagateChangeConfirmed$$1(this);
      }
      var result = this.value;
      if (isCaughtException$$1(result))
        throw result.cause;
      return result;
    };
    ComputedValue$$1.prototype.peek = function() {
      var res = this.computeValue(false);
      if (isCaughtException$$1(res))
        throw res.cause;
      return res;
    };
    ComputedValue$$1.prototype.set = function(value) {
      if (this.setter) {
        invariant$$1(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
        this.isRunningSetter = true;
        try {
          this.setter.call(this.scope, value);
        } finally {
          this.isRunningSetter = false;
        }
      } else
        invariant$$1(false, process.env.NODE_ENV !== "production" && "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue$$1.prototype.trackAndCompute = function() {
      if (isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
        spyReport$$1({
          object: this.scope,
          type: "compute",
          name: this.name
        });
      }
      var oldValue = this.value;
      var wasSuspended = this.dependenciesState === exports.IDerivationState.NOT_TRACKING;
      var newValue = this.computeValue(true);
      var changed = wasSuspended || isCaughtException$$1(oldValue) || isCaughtException$$1(newValue) || !this.equals(oldValue, newValue);
      if (changed) {
        this.value = newValue;
      }
      return changed;
    };
    ComputedValue$$1.prototype.computeValue = function(track) {
      this.isComputing = true;
      globalState$$1.computationDepth++;
      var res;
      if (track) {
        res = trackDerivedFunction$$1(this, this.derivation, this.scope);
      } else {
        if (globalState$$1.disableErrorBoundaries === true) {
          res = this.derivation.call(this.scope);
        } else {
          try {
            res = this.derivation.call(this.scope);
          } catch (e) {
            res = new CaughtException$$1(e);
          }
        }
      }
      globalState$$1.computationDepth--;
      this.isComputing = false;
      return res;
    };
    ComputedValue$$1.prototype.suspend = function() {
      if (!this.keepAlive) {
        clearObserving$$1(this);
        this.value = undefined;
      }
    };
    ComputedValue$$1.prototype.observe = function(listener, fireImmediately) {
      var _this = this;
      var firstTime = true;
      var prevValue = undefined;
      return autorun$$1(function() {
        var newValue = _this.get();
        if (!firstTime || fireImmediately) {
          var prevU = untrackedStart$$1();
          listener({
            type: "update",
            object: _this,
            newValue: newValue,
            oldValue: prevValue
          });
          untrackedEnd$$1(prevU);
        }
        firstTime = false;
        prevValue = newValue;
      });
    };
    ComputedValue$$1.prototype.warnAboutUntrackedRead = function() {
      if (process.env.NODE_ENV === "production")
        return;
      if (this.requiresReaction === true) {
        fail$$1("[mobx] Computed value " + this.name + " is read outside a reactive context");
      }
      if (this.isTracing !== TraceMode$$1.NONE) {
        console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
      }
      if (globalState$$1.computedRequiresReaction) {
        console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
      }
    };
    ComputedValue$$1.prototype.toJSON = function() {
      return this.get();
    };
    ComputedValue$$1.prototype.toString = function() {
      return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue$$1.prototype.valueOf = function() {
      return toPrimitive$$1(this.get());
    };
    ComputedValue$$1.prototype[Symbol.toPrimitive] = function() {
      return this.valueOf();
    };
    return ComputedValue$$1;
  }());
  var isComputedValue$$1 = createInstanceofPredicate$$1("ComputedValue", ComputedValue$$1);
  (function(IDerivationState$$1) {
    IDerivationState$$1[IDerivationState$$1["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    IDerivationState$$1[IDerivationState$$1["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    IDerivationState$$1[IDerivationState$$1["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    IDerivationState$$1[IDerivationState$$1["STALE"] = 2] = "STALE";
  })(exports.IDerivationState || (exports.IDerivationState = {}));
  var TraceMode$$1;
  (function(TraceMode$$1) {
    TraceMode$$1[TraceMode$$1["NONE"] = 0] = "NONE";
    TraceMode$$1[TraceMode$$1["LOG"] = 1] = "LOG";
    TraceMode$$1[TraceMode$$1["BREAK"] = 2] = "BREAK";
  })(TraceMode$$1 || (TraceMode$$1 = {}));
  var CaughtException$$1 = (function() {
    function CaughtException$$1(cause) {
      this.cause = cause;
    }
    return CaughtException$$1;
  }());
  function isCaughtException$$1(e) {
    return e instanceof CaughtException$$1;
  }
  function shouldCompute$$1(derivation) {
    switch (derivation.dependenciesState) {
      case exports.IDerivationState.UP_TO_DATE:
        return false;
      case exports.IDerivationState.NOT_TRACKING:
      case exports.IDerivationState.STALE:
        return true;
      case exports.IDerivationState.POSSIBLY_STALE:
        {
          var prevUntracked = untrackedStart$$1();
          var obs = derivation.observing,
              l = obs.length;
          for (var i = 0; i < l; i++) {
            var obj = obs[i];
            if (isComputedValue$$1(obj)) {
              if (globalState$$1.disableErrorBoundaries) {
                obj.get();
              } else {
                try {
                  obj.get();
                } catch (e) {
                  untrackedEnd$$1(prevUntracked);
                  return true;
                }
              }
              if (derivation.dependenciesState === exports.IDerivationState.STALE) {
                untrackedEnd$$1(prevUntracked);
                return true;
              }
            }
          }
          changeDependenciesStateTo0$$1(derivation);
          untrackedEnd$$1(prevUntracked);
          return false;
        }
    }
  }
  function isComputingDerivation$$1() {
    return globalState$$1.trackingDerivation !== null;
  }
  function checkIfStateModificationsAreAllowed$$1(atom) {
    var hasObservers$$1 = atom.observers.size > 0;
    if (globalState$$1.computationDepth > 0 && hasObservers$$1)
      fail$$1(process.env.NODE_ENV !== "production" && "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name);
    if (!globalState$$1.allowStateChanges && (hasObservers$$1 || globalState$$1.enforceActions === "strict"))
      fail$$1(process.env.NODE_ENV !== "production" && (globalState$$1.enforceActions ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: " : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") + atom.name);
  }
  function trackDerivedFunction$$1(derivation, f, context) {
    changeDependenciesStateTo0$$1(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState$$1.runId;
    var prevTracking = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = derivation;
    var result;
    if (globalState$$1.disableErrorBoundaries === true) {
      result = f.call(context);
    } else {
      try {
        result = f.call(context);
      } catch (e) {
        result = new CaughtException$$1(e);
      }
    }
    globalState$$1.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
  }
  function bindDependencies(derivation) {
    var prevObserving = derivation.observing;
    var observing = (derivation.observing = derivation.newObserving);
    var lowestNewObservingDerivationState = exports.IDerivationState.UP_TO_DATE;
    var i0 = 0,
        l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
      var dep = observing[i];
      if (dep.diffValue === 0) {
        dep.diffValue = 1;
        if (i0 !== i)
          observing[i0] = dep;
        i0++;
      }
      if (dep.dependenciesState > lowestNewObservingDerivationState) {
        lowestNewObservingDerivationState = dep.dependenciesState;
      }
    }
    observing.length = i0;
    derivation.newObserving = null;
    l = prevObserving.length;
    while (l--) {
      var dep = prevObserving[l];
      if (dep.diffValue === 0) {
        removeObserver$$1(dep, derivation);
      }
      dep.diffValue = 0;
    }
    while (i0--) {
      var dep = observing[i0];
      if (dep.diffValue === 1) {
        dep.diffValue = 0;
        addObserver$$1(dep, derivation);
      }
    }
    if (lowestNewObservingDerivationState !== exports.IDerivationState.UP_TO_DATE) {
      derivation.dependenciesState = lowestNewObservingDerivationState;
      derivation.onBecomeStale();
    }
  }
  function clearObserving$$1(derivation) {
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
      removeObserver$$1(obs[i], derivation);
    derivation.dependenciesState = exports.IDerivationState.NOT_TRACKING;
  }
  function untracked$$1(action$$1) {
    var prev = untrackedStart$$1();
    try {
      return action$$1();
    } finally {
      untrackedEnd$$1(prev);
    }
  }
  function untrackedStart$$1() {
    var prev = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = null;
    return prev;
  }
  function untrackedEnd$$1(prev) {
    globalState$$1.trackingDerivation = prev;
  }
  function changeDependenciesStateTo0$$1(derivation) {
    if (derivation.dependenciesState === exports.IDerivationState.UP_TO_DATE)
      return;
    derivation.dependenciesState = exports.IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
      obs[i].lowestObserverState = exports.IDerivationState.UP_TO_DATE;
  }
  var persistentKeys = ["mobxGuid", "spyListeners", "enforceActions", "computedRequiresReaction", "disableErrorBoundaries", "runId", "UNCHANGED"];
  var MobXGlobals$$1 = (function() {
    function MobXGlobals$$1() {
      this.version = 5;
      this.UNCHANGED = {};
      this.trackingDerivation = null;
      this.computationDepth = 0;
      this.runId = 0;
      this.mobxGuid = 0;
      this.inBatch = 0;
      this.pendingUnobservations = [];
      this.pendingReactions = [];
      this.isRunningReactions = false;
      this.allowStateChanges = true;
      this.enforceActions = false;
      this.spyListeners = [];
      this.globalReactionErrorHandlers = [];
      this.computedRequiresReaction = false;
      this.disableErrorBoundaries = false;
      this.suppressReactionErrors = false;
    }
    return MobXGlobals$$1;
  }());
  var canMergeGlobalState = true;
  var isolateCalled = false;
  var globalState$$1 = (function() {
    var global = getGlobal$$1();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
      canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals$$1().version)
      canMergeGlobalState = false;
    if (!canMergeGlobalState) {
      setTimeout(function() {
        if (!isolateCalled) {
          fail$$1("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
        }
      }, 1);
      return new MobXGlobals$$1();
    } else if (global.__mobxGlobals) {
      global.__mobxInstanceCount += 1;
      if (!global.__mobxGlobals.UNCHANGED)
        global.__mobxGlobals.UNCHANGED = {};
      return global.__mobxGlobals;
    } else {
      global.__mobxInstanceCount = 1;
      return (global.__mobxGlobals = new MobXGlobals$$1());
    }
  })();
  function isolateGlobalState$$1() {
    if (globalState$$1.pendingReactions.length || globalState$$1.inBatch || globalState$$1.isRunningReactions)
      fail$$1("isolateGlobalState should be called before MobX is running any reactions");
    isolateCalled = true;
    if (canMergeGlobalState) {
      if (--getGlobal$$1().__mobxInstanceCount === 0)
        getGlobal$$1().__mobxGlobals = undefined;
      globalState$$1 = new MobXGlobals$$1();
    }
  }
  function getGlobalState$$1() {
    return globalState$$1;
  }
  function resetGlobalState$$1() {
    var defaultGlobals = new MobXGlobals$$1();
    for (var key in defaultGlobals)
      if (persistentKeys.indexOf(key) === -1)
        globalState$$1[key] = defaultGlobals[key];
    globalState$$1.allowStateChanges = !globalState$$1.enforceActions;
  }
  function getGlobal$$1() {
    return typeof window !== "undefined" ? window : global;
  }
  function hasObservers$$1(observable$$1) {
    return observable$$1.observers && observable$$1.observers.size > 0;
  }
  function getObservers$$1(observable$$1) {
    return observable$$1.observers;
  }
  function addObserver$$1(observable$$1, node) {
    observable$$1.observers.add(node);
    if (observable$$1.lowestObserverState > node.dependenciesState)
      observable$$1.lowestObserverState = node.dependenciesState;
  }
  function removeObserver$$1(observable$$1, node) {
    observable$$1.observers.delete(node);
    if (observable$$1.observers.size === 0) {
      queueForUnobservation$$1(observable$$1);
    }
  }
  function queueForUnobservation$$1(observable$$1) {
    if (observable$$1.isPendingUnobservation === false) {
      observable$$1.isPendingUnobservation = true;
      globalState$$1.pendingUnobservations.push(observable$$1);
    }
  }
  function startBatch$$1() {
    globalState$$1.inBatch++;
  }
  function endBatch$$1() {
    if (--globalState$$1.inBatch === 0) {
      runReactions$$1();
      var list = globalState$$1.pendingUnobservations;
      for (var i = 0; i < list.length; i++) {
        var observable$$1 = list[i];
        observable$$1.isPendingUnobservation = false;
        if (observable$$1.observers.size === 0) {
          if (observable$$1.isBeingObserved) {
            observable$$1.isBeingObserved = false;
            observable$$1.onBecomeUnobserved();
          }
          if (observable$$1 instanceof ComputedValue$$1) {
            observable$$1.suspend();
          }
        }
      }
      globalState$$1.pendingUnobservations = [];
    }
  }
  function reportObserved$$1(observable$$1) {
    var derivation = globalState$$1.trackingDerivation;
    if (derivation !== null) {
      if (derivation.runId !== observable$$1.lastAccessedBy) {
        observable$$1.lastAccessedBy = derivation.runId;
        derivation.newObserving[derivation.unboundDepsCount++] = observable$$1;
        if (!observable$$1.isBeingObserved) {
          observable$$1.isBeingObserved = true;
          observable$$1.onBecomeObserved();
        }
      }
      return true;
    } else if (observable$$1.observers.size === 0 && globalState$$1.inBatch > 0) {
      queueForUnobservation$$1(observable$$1);
    }
    return false;
  }
  function propagateChanged$$1(observable$$1) {
    if (observable$$1.lowestObserverState === exports.IDerivationState.STALE)
      return;
    observable$$1.lowestObserverState = exports.IDerivationState.STALE;
    observable$$1.observers.forEach(function(d) {
      if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
        if (d.isTracing !== TraceMode$$1.NONE) {
          logTraceInfo(d, observable$$1);
        }
        d.onBecomeStale();
      }
      d.dependenciesState = exports.IDerivationState.STALE;
    });
  }
  function propagateChangeConfirmed$$1(observable$$1) {
    if (observable$$1.lowestObserverState === exports.IDerivationState.STALE)
      return;
    observable$$1.lowestObserverState = exports.IDerivationState.STALE;
    observable$$1.observers.forEach(function(d) {
      if (d.dependenciesState === exports.IDerivationState.POSSIBLY_STALE)
        d.dependenciesState = exports.IDerivationState.STALE;
      else if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE)
        observable$$1.lowestObserverState = exports.IDerivationState.UP_TO_DATE;
    });
  }
  function propagateMaybeChanged$$1(observable$$1) {
    if (observable$$1.lowestObserverState !== exports.IDerivationState.UP_TO_DATE)
      return;
    observable$$1.lowestObserverState = exports.IDerivationState.POSSIBLY_STALE;
    observable$$1.observers.forEach(function(d) {
      if (d.dependenciesState === exports.IDerivationState.UP_TO_DATE) {
        d.dependenciesState = exports.IDerivationState.POSSIBLY_STALE;
        if (d.isTracing !== TraceMode$$1.NONE) {
          logTraceInfo(d, observable$$1);
        }
        d.onBecomeStale();
      }
    });
  }
  function logTraceInfo(derivation, observable$$1) {
    console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable$$1.name + "'");
    if (derivation.isTracing === TraceMode$$1.BREAK) {
      var lines = [];
      printDepTree(getDependencyTree$$1(derivation), lines, 1);
      new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable$$1.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue$$1 ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
  }
  function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
      lines.push("(and many more)");
      return;
    }
    lines.push("" + new Array(depth).join("\t") + tree.name);
    if (tree.dependencies)
      tree.dependencies.forEach(function(child) {
        return printDepTree(child, lines, depth + 1);
      });
  }
  var Reaction$$1 = (function() {
    function Reaction$$1(name, onInvalidate, errorHandler) {
      if (name === void 0) {
        name = "Reaction@" + getNextId$$1();
      }
      this.name = name;
      this.onInvalidate = onInvalidate;
      this.errorHandler = errorHandler;
      this.observing = [];
      this.newObserving = [];
      this.dependenciesState = exports.IDerivationState.NOT_TRACKING;
      this.diffValue = 0;
      this.runId = 0;
      this.unboundDepsCount = 0;
      this.__mapid = "#" + getNextId$$1();
      this.isDisposed = false;
      this._isScheduled = false;
      this._isTrackPending = false;
      this._isRunning = false;
      this.isTracing = TraceMode$$1.NONE;
    }
    Reaction$$1.prototype.onBecomeStale = function() {
      this.schedule();
    };
    Reaction$$1.prototype.schedule = function() {
      if (!this._isScheduled) {
        this._isScheduled = true;
        globalState$$1.pendingReactions.push(this);
        runReactions$$1();
      }
    };
    Reaction$$1.prototype.isScheduled = function() {
      return this._isScheduled;
    };
    Reaction$$1.prototype.runReaction = function() {
      if (!this.isDisposed) {
        startBatch$$1();
        this._isScheduled = false;
        if (shouldCompute$$1(this)) {
          this._isTrackPending = true;
          try {
            this.onInvalidate();
            if (this._isTrackPending && isSpyEnabled$$1() && process.env.NODE_ENV !== "production") {
              spyReport$$1({
                name: this.name,
                type: "scheduled-reaction"
              });
            }
          } catch (e) {
            this.reportExceptionInDerivation(e);
          }
        }
        endBatch$$1();
      }
    };
    Reaction$$1.prototype.track = function(fn) {
      startBatch$$1();
      var notify = isSpyEnabled$$1();
      var startTime;
      if (notify && process.env.NODE_ENV !== "production") {
        startTime = Date.now();
        spyReportStart$$1({
          name: this.name,
          type: "reaction"
        });
      }
      this._isRunning = true;
      var result = trackDerivedFunction$$1(this, fn, undefined);
      this._isRunning = false;
      this._isTrackPending = false;
      if (this.isDisposed) {
        clearObserving$$1(this);
      }
      if (isCaughtException$$1(result))
        this.reportExceptionInDerivation(result.cause);
      if (notify && process.env.NODE_ENV !== "production") {
        spyReportEnd$$1({time: Date.now() - startTime});
      }
      endBatch$$1();
    };
    Reaction$$1.prototype.reportExceptionInDerivation = function(error) {
      var _this = this;
      if (this.errorHandler) {
        this.errorHandler(error, this);
        return;
      }
      if (globalState$$1.disableErrorBoundaries)
        throw error;
      var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
      if (globalState$$1.suppressReactionErrors) {
        console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)");
      } else {
        console.error(message, error);
      }
      if (isSpyEnabled$$1()) {
        spyReport$$1({
          type: "error",
          name: this.name,
          message: message,
          error: "" + error
        });
      }
      globalState$$1.globalReactionErrorHandlers.forEach(function(f) {
        return f(error, _this);
      });
    };
    Reaction$$1.prototype.dispose = function() {
      if (!this.isDisposed) {
        this.isDisposed = true;
        if (!this._isRunning) {
          startBatch$$1();
          clearObserving$$1(this);
          endBatch$$1();
        }
      }
    };
    Reaction$$1.prototype.getDisposer = function() {
      var r = this.dispose.bind(this);
      r[$mobx$$1] = this;
      return r;
    };
    Reaction$$1.prototype.toString = function() {
      return "Reaction[" + this.name + "]";
    };
    Reaction$$1.prototype.trace = function(enterBreakPoint) {
      if (enterBreakPoint === void 0) {
        enterBreakPoint = false;
      }
      trace$$1(this, enterBreakPoint);
    };
    return Reaction$$1;
  }());
  function onReactionError$$1(handler) {
    globalState$$1.globalReactionErrorHandlers.push(handler);
    return function() {
      var idx = globalState$$1.globalReactionErrorHandlers.indexOf(handler);
      if (idx >= 0)
        globalState$$1.globalReactionErrorHandlers.splice(idx, 1);
    };
  }
  var MAX_REACTION_ITERATIONS = 100;
  var reactionScheduler = function(f) {
    return f();
  };
  function runReactions$$1() {
    if (globalState$$1.inBatch > 0 || globalState$$1.isRunningReactions)
      return;
    reactionScheduler(runReactionsHelper);
  }
  function runReactionsHelper() {
    globalState$$1.isRunningReactions = true;
    var allReactions = globalState$$1.pendingReactions;
    var iterations = 0;
    while (allReactions.length > 0) {
      if (++iterations === MAX_REACTION_ITERATIONS) {
        console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." + (" Probably there is a cycle in the reactive function: " + allReactions[0]));
        allReactions.splice(0);
      }
      var remainingReactions = allReactions.splice(0);
      for (var i = 0,
          l = remainingReactions.length; i < l; i++)
        remainingReactions[i].runReaction();
    }
    globalState$$1.isRunningReactions = false;
  }
  var isReaction$$1 = createInstanceofPredicate$$1("Reaction", Reaction$$1);
  function setReactionScheduler$$1(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function(f) {
      return fn(function() {
        return baseScheduler(f);
      });
    };
  }
  function isSpyEnabled$$1() {
    return process.env.NODE_ENV !== "production" && !!globalState$$1.spyListeners.length;
  }
  function spyReport$$1(event) {
    if (process.env.NODE_ENV === "production")
      return;
    if (!globalState$$1.spyListeners.length)
      return;
    var listeners = globalState$$1.spyListeners;
    for (var i = 0,
        l = listeners.length; i < l; i++)
      listeners[i](event);
  }
  function spyReportStart$$1(event) {
    if (process.env.NODE_ENV === "production")
      return;
    var change = __assign({}, event, {spyReportStart: true});
    spyReport$$1(change);
  }
  var END_EVENT = {spyReportEnd: true};
  function spyReportEnd$$1(change) {
    if (process.env.NODE_ENV === "production")
      return;
    if (change)
      spyReport$$1(__assign({}, change, {spyReportEnd: true}));
    else
      spyReport$$1(END_EVENT);
  }
  function spy$$1(listener) {
    if (process.env.NODE_ENV === "production") {
      console.warn("[mobx.spy] Is a no-op in production builds");
      return function() {};
    } else {
      globalState$$1.spyListeners.push(listener);
      return once$$1(function() {
        globalState$$1.spyListeners = globalState$$1.spyListeners.filter(function(l) {
          return l !== listener;
        });
      });
    }
  }
  function dontReassignFields() {
    fail$$1(process.env.NODE_ENV !== "production" && "@action fields are not reassignable");
  }
  function namedActionDecorator$$1(name) {
    return function(target, prop, descriptor) {
      if (descriptor) {
        if (process.env.NODE_ENV !== "production" && descriptor.get !== undefined) {
          return fail$$1("@action cannot be used with getters");
        }
        if (descriptor.value) {
          return {
            value: createAction$$1(name, descriptor.value),
            enumerable: false,
            configurable: true,
            writable: true
          };
        }
        var initializer_1 = descriptor.initializer;
        return {
          enumerable: false,
          configurable: true,
          writable: true,
          initializer: function() {
            return createAction$$1(name, initializer_1.call(this));
          }
        };
      }
      return actionFieldDecorator$$1(name).apply(this, arguments);
    };
  }
  function actionFieldDecorator$$1(name) {
    return function(target, prop, descriptor) {
      Object.defineProperty(target, prop, {
        configurable: true,
        enumerable: false,
        get: function() {
          return undefined;
        },
        set: function(value) {
          addHiddenProp$$1(this, prop, action$$1(name, value));
        }
      });
    };
  }
  function boundActionDecorator$$1(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
      defineBoundAction$$1(target, propertyName, descriptor.value);
      return null;
    }
    if (descriptor) {
      return {
        configurable: true,
        enumerable: false,
        get: function() {
          defineBoundAction$$1(this, propertyName, descriptor.value || descriptor.initializer.call(this));
          return this[propertyName];
        },
        set: dontReassignFields
      };
    }
    return {
      enumerable: false,
      configurable: true,
      set: function(v) {
        defineBoundAction$$1(this, propertyName, v);
      },
      get: function() {
        return undefined;
      }
    };
  }
  var action$$1 = function action$$1(arg1, arg2, arg3, arg4) {
    if (arguments.length === 1 && typeof arg1 === "function")
      return createAction$$1(arg1.name || "<unnamed action>", arg1);
    if (arguments.length === 2 && typeof arg2 === "function")
      return createAction$$1(arg1, arg2);
    if (arguments.length === 1 && typeof arg1 === "string")
      return namedActionDecorator$$1(arg1);
    if (arg4 === true) {
      addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value));
    } else {
      return namedActionDecorator$$1(arg2).apply(null, arguments);
    }
  };
  action$$1.bound = boundActionDecorator$$1;
  function runInAction$$1(arg1, arg2) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
      if (typeof actionName !== "string" || !actionName)
        fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    return executeAction$$1(actionName, fn, this, undefined);
  }
  function isAction$$1(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
  }
  function defineBoundAction$$1(target, propertyName, fn) {
    addHiddenProp$$1(target, propertyName, createAction$$1(propertyName, fn.bind(target)));
  }
  function autorun$$1(view, opts) {
    if (opts === void 0) {
      opts = EMPTY_OBJECT$$1;
    }
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(typeof view === "function", "Autorun expects a function as first argument");
      invariant$$1(isAction$$1(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    var name = (opts && opts.name) || view.name || "Autorun@" + getNextId$$1();
    var runSync = !opts.scheduler && !opts.delay;
    var reaction$$1;
    if (runSync) {
      reaction$$1 = new Reaction$$1(name, function() {
        this.track(reactionRunner);
      }, opts.onError);
    } else {
      var scheduler_1 = createSchedulerFromOptions(opts);
      var isScheduled_1 = false;
      reaction$$1 = new Reaction$$1(name, function() {
        if (!isScheduled_1) {
          isScheduled_1 = true;
          scheduler_1(function() {
            isScheduled_1 = false;
            if (!reaction$$1.isDisposed)
              reaction$$1.track(reactionRunner);
          });
        }
      }, opts.onError);
    }
    function reactionRunner() {
      view(reaction$$1);
    }
    reaction$$1.schedule();
    return reaction$$1.getDisposer();
  }
  var run = function(f) {
    return f();
  };
  function createSchedulerFromOptions(opts) {
    return opts.scheduler ? opts.scheduler : opts.delay ? function(f) {
      return setTimeout(f, opts.delay);
    } : run;
  }
  function reaction$$1(expression, effect, opts) {
    if (opts === void 0) {
      opts = EMPTY_OBJECT$$1;
    }
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(typeof expression === "function", "First argument to reaction should be a function");
      invariant$$1(typeof opts === "object", "Third argument of reactions should be an object");
    }
    var name = opts.name || "Reaction@" + getNextId$$1();
    var effectAction = action$$1(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.compareStructural ? comparer$$1.structural : opts.equals || comparer$$1.default;
    var r = new Reaction$$1(name, function() {
      if (firstTime || runSync) {
        reactionRunner();
      } else if (!isScheduled) {
        isScheduled = true;
        scheduler(reactionRunner);
      }
    }, opts.onError);
    function reactionRunner() {
      isScheduled = false;
      if (r.isDisposed)
        return;
      var changed = false;
      r.track(function() {
        var nextValue = expression(r);
        changed = firstTime || !equals(value, nextValue);
        value = nextValue;
      });
      if (firstTime && opts.fireImmediately)
        effectAction(value, r);
      if (!firstTime && changed === true)
        effectAction(value, r);
      if (firstTime)
        firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
  }
  function wrapErrorHandler(errorHandler, baseFn) {
    return function() {
      try {
        return baseFn.apply(this, arguments);
      } catch (e) {
        errorHandler.call(this, e);
      }
    };
  }
  function onBecomeObserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
  }
  function onBecomeUnobserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
  }
  function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg2 === "string" ? getAtom$$1(thing, arg2) : getAtom$$1(thing);
    var cb = typeof arg2 === "string" ? arg3 : arg2;
    var listenersKey = hook + "Listeners";
    if (atom[listenersKey]) {
      atom[listenersKey].add(cb);
    } else {
      atom[listenersKey] = new Set([cb]);
    }
    var orig = atom[hook];
    if (typeof orig !== "function")
      return fail$$1(process.env.NODE_ENV !== "production" && "Not an atom that can be (un)observed");
    return function() {
      var hookListeners = atom[listenersKey];
      if (hookListeners) {
        hookListeners.delete(cb);
        if (hookListeners.size === 0) {
          delete atom[listenersKey];
        }
      }
    };
  }
  function configure$$1(options) {
    var enforceActions = options.enforceActions,
        computedRequiresReaction = options.computedRequiresReaction,
        disableErrorBoundaries = options.disableErrorBoundaries,
        reactionScheduler = options.reactionScheduler;
    if (options.isolateGlobalState === true) {
      isolateGlobalState$$1();
    }
    if (enforceActions !== undefined) {
      if (typeof enforceActions === "boolean" || enforceActions === "strict")
        deprecated$$1("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
      var ea = void 0;
      switch (enforceActions) {
        case true:
        case "observed":
          ea = true;
          break;
        case false:
        case "never":
          ea = false;
          break;
        case "strict":
        case "always":
          ea = "strict";
          break;
        default:
          fail$$1("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
      }
      globalState$$1.enforceActions = ea;
      globalState$$1.allowStateChanges = ea === true || ea === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
      globalState$$1.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (disableErrorBoundaries !== undefined) {
      if (disableErrorBoundaries === true)
        console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
      globalState$$1.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
      setReactionScheduler$$1(reactionScheduler);
    }
  }
  function decorate$$1(thing, decorators) {
    process.env.NODE_ENV !== "production" && invariant$$1(isPlainObject$$1(decorators), "Decorators should be a key value map");
    var target = typeof thing === "function" ? thing.prototype : thing;
    var _loop_1 = function(prop) {
      var propertyDecorators = decorators[prop];
      if (!Array.isArray(propertyDecorators)) {
        propertyDecorators = [propertyDecorators];
      }
      process.env.NODE_ENV !== "production" && invariant$$1(propertyDecorators.every(function(decorator) {
        return typeof decorator === "function";
      }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
      var descriptor = Object.getOwnPropertyDescriptor(target, prop);
      var newDescriptor = propertyDecorators.reduce(function(accDescriptor, decorator) {
        return decorator(target, prop, accDescriptor);
      }, descriptor);
      if (newDescriptor)
        Object.defineProperty(target, prop, newDescriptor);
    };
    for (var prop in decorators) {
      _loop_1(prop);
    }
    return thing;
  }
  function extendObservable$$1(target, properties, decorators, options) {
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
      invariant$$1(typeof target === "object", "'extendObservable' expects an object as first argument");
      invariant$$1(!isObservableMap$$1(target), "'extendObservable' should not be used on maps, use map.merge instead");
    }
    options = asCreateObservableOptions$$1(options);
    var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(options);
    initializeInstance$$1(target);
    asObservableObject$$1(target, options.name, defaultDecorator.enhancer);
    if (properties)
      extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator);
    return target;
  }
  function getDefaultDecoratorFromObjectOptions$$1(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator$$1 : deepDecorator$$1);
  }
  function extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator) {
    if (process.env.NODE_ENV !== "production") {
      invariant$$1(!isObservable$$1(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
      if (decorators)
        for (var key in decorators)
          if (!(key in properties))
            fail$$1("Trying to declare a decorator for unspecified property '" + key + "'");
    }
    startBatch$$1();
    try {
      for (var key in properties) {
        var descriptor = Object.getOwnPropertyDescriptor(properties, key);
        if (process.env.NODE_ENV !== "production") {
          if (Object.getOwnPropertyDescriptor(target, key))
            fail$$1("'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '" + key + "' already exists on '" + target + "'");
          if (isComputed$$1(descriptor.value))
            fail$$1("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
        }
        var decorator = decorators && key in decorators ? decorators[key] : descriptor.get ? computedDecorator$$1 : defaultDecorator;
        if (process.env.NODE_ENV !== "production" && typeof decorator !== "function")
          fail$$1("Not a valid decorator for '" + key + "', got: " + decorator);
        var resultDescriptor = decorator(target, key, descriptor, true);
        if (resultDescriptor)
          Object.defineProperty(target, key, resultDescriptor);
      }
    } finally {
      endBatch$$1();
    }
  }
  function getDependencyTree$$1(thing, property) {
    return nodeToDependencyTree(getAtom$$1(thing, property));
  }
  function nodeToDependencyTree(node) {
    var result = {name: node.name};
    if (node.observing && node.observing.length > 0)
      result.dependencies = unique$$1(node.observing).map(nodeToDependencyTree);
    return result;
  }
  function getObserverTree$$1(thing, property) {
    return nodeToObserverTree(getAtom$$1(thing, property));
  }
  function nodeToObserverTree(node) {
    var result = {name: node.name};
    if (hasObservers$$1(node))
      result.observers = Array.from(getObservers$$1(node)).map(nodeToObserverTree);
    return result;
  }
  var generatorId = 0;
  function flow$$1(generator) {
    if (arguments.length !== 1)
      fail$$1(process.env.NODE_ENV && "Flow expects one 1 argument and cannot be used as decorator");
    var name = generator.name || "<unnamed flow>";
    return function() {
      var ctx = this;
      var args = arguments;
      var runId = ++generatorId;
      var gen = action$$1(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
      var rejector;
      var pendingPromise = undefined;
      var promise = new Promise(function(resolve, reject) {
        var stepId = 0;
        rejector = reject;
        function onFulfilled(res) {
          pendingPromise = undefined;
          var ret;
          try {
            ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
          } catch (e) {
            return reject(e);
          }
          next(ret);
        }
        function onRejected(err) {
          pendingPromise = undefined;
          var ret;
          try {
            ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
          } catch (e) {
            return reject(e);
          }
          next(ret);
        }
        function next(ret) {
          if (ret && typeof ret.then === "function") {
            ret.then(next, reject);
            return;
          }
          if (ret.done)
            return resolve(ret.value);
          pendingPromise = Promise.resolve(ret.value);
          return pendingPromise.then(onFulfilled, onRejected);
        }
        onFulfilled(undefined);
      });
      promise.cancel = action$$1(name + " - runid: " + runId + " - cancel", function() {
        try {
          if (pendingPromise)
            cancelPromise(pendingPromise);
          var res = gen.return();
          var yieldedPromise = Promise.resolve(res.value);
          yieldedPromise.then(noop$$1, noop$$1);
          cancelPromise(yieldedPromise);
          rejector(new Error("FLOW_CANCELLED"));
        } catch (e) {
          rejector(e);
        }
      });
      return promise;
    };
  }
  function cancelPromise(promise) {
    if (typeof promise.cancel === "function")
      promise.cancel();
  }
  function interceptReads$$1(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap$$1(thing) || isObservableArray$$1(thing) || isObservableValue$$1(thing)) {
      target = getAdministration$$1(thing);
    } else if (isObservableObject$$1(thing)) {
      if (typeof propOrHandler !== "string")
        return fail$$1(process.env.NODE_ENV !== "production" && "InterceptReads can only be used with a specific property, not with an object in general");
      target = getAdministration$$1(thing, propOrHandler);
    } else {
      return fail$$1(process.env.NODE_ENV !== "production" && "Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined)
      return fail$$1(process.env.NODE_ENV !== "production" && "An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function() {
      target.dehancer = undefined;
    };
  }
  function intercept$$1(thing, propOrHandler, handler) {
    if (typeof handler === "function")
      return interceptProperty(thing, propOrHandler, handler);
    else
      return interceptInterceptable(thing, propOrHandler);
  }
  function interceptInterceptable(thing, handler) {
    return getAdministration$$1(thing).intercept(handler);
  }
  function interceptProperty(thing, property, handler) {
    return getAdministration$$1(thing, property).intercept(handler);
  }
  function _isComputed$$1(value, property) {
    if (value === null || value === undefined)
      return false;
    if (property !== undefined) {
      if (isObservableObject$$1(value) === false)
        return false;
      if (!value[$mobx$$1].values.has(property))
        return false;
      var atom = getAtom$$1(value, property);
      return isComputedValue$$1(atom);
    }
    return isComputedValue$$1(value);
  }
  function isComputed$$1(value) {
    if (arguments.length > 1)
      return fail$$1(process.env.NODE_ENV !== "production" && "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isComputed$$1(value);
  }
  function isComputedProp$$1(value, propName) {
    if (typeof propName !== "string")
      return fail$$1(process.env.NODE_ENV !== "production" && "isComputed expected a property name as second argument");
    return _isComputed$$1(value, propName);
  }
  function _isObservable(value, property) {
    if (value === null || value === undefined)
      return false;
    if (property !== undefined) {
      if (process.env.NODE_ENV !== "production" && (isObservableMap$$1(value) || isObservableArray$$1(value)))
        return fail$$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
      if (isObservableObject$$1(value)) {
        return value[$mobx$$1].values.has(property);
      }
      return false;
    }
    return (isObservableObject$$1(value) || !!value[$mobx$$1] || isAtom$$1(value) || isReaction$$1(value) || isComputedValue$$1(value));
  }
  function isObservable$$1(value) {
    if (arguments.length !== 1)
      fail$$1(process.env.NODE_ENV !== "production" && "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
  }
  function isObservableProp$$1(value, propName) {
    if (typeof propName !== "string")
      return fail$$1(process.env.NODE_ENV !== "production" && "expected a property name as second argument");
    return _isObservable(value, propName);
  }
  function keys$$1(obj) {
    if (isObservableObject$$1(obj)) {
      return obj[$mobx$$1].getKeys();
    }
    if (isObservableMap$$1(obj)) {
      return Array.from(obj.keys());
    }
    if (isObservableSet$$1(obj)) {
      return Array.from(obj.keys());
    }
    if (isObservableArray$$1(obj)) {
      return obj.map(function(_, index) {
        return index;
      });
    }
    return fail$$1(process.env.NODE_ENV !== "production" && "'keys()' can only be used on observable objects, arrays, sets and maps");
  }
  function values$$1(obj) {
    if (isObservableObject$$1(obj)) {
      return keys$$1(obj).map(function(key) {
        return obj[key];
      });
    }
    if (isObservableMap$$1(obj)) {
      return keys$$1(obj).map(function(key) {
        return obj.get(key);
      });
    }
    if (isObservableSet$$1(obj)) {
      return Array.from(obj.values());
    }
    if (isObservableArray$$1(obj)) {
      return obj.slice();
    }
    return fail$$1(process.env.NODE_ENV !== "production" && "'values()' can only be used on observable objects, arrays, sets and maps");
  }
  function entries$$1(obj) {
    if (isObservableObject$$1(obj)) {
      return keys$$1(obj).map(function(key) {
        return [key, obj[key]];
      });
    }
    if (isObservableMap$$1(obj)) {
      return keys$$1(obj).map(function(key) {
        return [key, obj.get(key)];
      });
    }
    if (isObservableSet$$1(obj)) {
      return Array.from(obj.entries());
    }
    if (isObservableArray$$1(obj)) {
      return obj.map(function(key, index) {
        return [index, key];
      });
    }
    return fail$$1(process.env.NODE_ENV !== "production" && "'entries()' can only be used on observable objects, arrays and maps");
  }
  function set$$1(obj, key, value) {
    if (arguments.length === 2) {
      startBatch$$1();
      var values_1 = key;
      try {
        for (var key_1 in values_1)
          set$$1(obj, key_1, values_1[key_1]);
      } finally {
        endBatch$$1();
      }
      return;
    }
    if (isObservableObject$$1(obj)) {
      var adm = obj[$mobx$$1];
      var existingObservable = adm.values.get(key);
      if (existingObservable) {
        adm.write(key, value);
      } else {
        adm.addObservableProp(key, value, adm.defaultEnhancer);
      }
    } else if (isObservableMap$$1(obj)) {
      obj.set(key, value);
    } else if (isObservableArray$$1(obj)) {
      if (typeof key !== "number")
        key = parseInt(key, 10);
      invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
      startBatch$$1();
      if (key >= obj.length)
        obj.length = key + 1;
      obj[key] = value;
      endBatch$$1();
    } else {
      return fail$$1(process.env.NODE_ENV !== "production" && "'set()' can only be used on observable objects, arrays and maps");
    }
  }
  function remove$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
      obj[$mobx$$1].remove(key);
    } else if (isObservableMap$$1(obj)) {
      obj.delete(key);
    } else if (isObservableSet$$1(obj)) {
      obj.delete(key);
    } else if (isObservableArray$$1(obj)) {
      if (typeof key !== "number")
        key = parseInt(key, 10);
      invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
      obj.splice(key, 1);
    } else {
      return fail$$1(process.env.NODE_ENV !== "production" && "'remove()' can only be used on observable objects, arrays and maps");
    }
  }
  function has$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
      var adm = getAdministration$$1(obj);
      return adm.has(key);
    } else if (isObservableMap$$1(obj)) {
      return obj.has(key);
    } else if (isObservableSet$$1(obj)) {
      return obj.has(key);
    } else if (isObservableArray$$1(obj)) {
      return key >= 0 && key < obj.length;
    } else {
      return fail$$1(process.env.NODE_ENV !== "production" && "'has()' can only be used on observable objects, arrays and maps");
    }
  }
  function get$$1(obj, key) {
    if (!has$$1(obj, key))
      return undefined;
    if (isObservableObject$$1(obj)) {
      return obj[key];
    } else if (isObservableMap$$1(obj)) {
      return obj.get(key);
    } else if (isObservableArray$$1(obj)) {
      return obj[key];
    } else {
      return fail$$1(process.env.NODE_ENV !== "production" && "'get()' can only be used on observable objects, arrays and maps");
    }
  }
  function observe$$1(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
      return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
      return observeObservable(thing, propOrCb, cbOrFire);
  }
  function observeObservable(thing, listener, fireImmediately) {
    return getAdministration$$1(thing).observe(listener, fireImmediately);
  }
  function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration$$1(thing, property).observe(listener, fireImmediately);
  }
  var defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true,
    recurseEverything: false
  };
  function cache(map, key, value, options) {
    if (options.detectCycles)
      map.set(key, value);
    return value;
  }
  function toJSHelper(source, options, __alreadySeen) {
    if (!options.recurseEverything && !isObservable$$1(source))
      return source;
    if (typeof source !== "object")
      return source;
    if (source === null)
      return null;
    if (source instanceof Date)
      return source;
    if (isObservableValue$$1(source))
      return toJSHelper(source.get(), options, __alreadySeen);
    if (isObservable$$1(source))
      keys$$1(source);
    var detectCycles = options.detectCycles === true;
    if (detectCycles && source !== null && __alreadySeen.has(source)) {
      return __alreadySeen.get(source);
    }
    if (isObservableArray$$1(source) || Array.isArray(source)) {
      var res_1 = cache(__alreadySeen, source, [], options);
      var toAdd = source.map(function(value) {
        return toJSHelper(value, options, __alreadySeen);
      });
      res_1.length = toAdd.length;
      for (var i = 0,
          l = toAdd.length; i < l; i++)
        res_1[i] = toAdd[i];
      return res_1;
    }
    if (isObservableSet$$1(source) || Object.getPrototypeOf(source) === Set.prototype) {
      if (options.exportMapsAsObjects === false) {
        var res_2 = cache(__alreadySeen, source, new Set(), options);
        source.forEach(function(value) {
          res_2.add(toJSHelper(value, options, __alreadySeen));
        });
        return res_2;
      } else {
        var res_3 = cache(__alreadySeen, source, [], options);
        source.forEach(function(value) {
          res_3.push(toJSHelper(value, options, __alreadySeen));
        });
        return res_3;
      }
    }
    if (isObservableMap$$1(source) || Object.getPrototypeOf(source) === Map.prototype) {
      if (options.exportMapsAsObjects === false) {
        var res_4 = cache(__alreadySeen, source, new Map(), options);
        source.forEach(function(value, key) {
          res_4.set(key, toJSHelper(value, options, __alreadySeen));
        });
        return res_4;
      } else {
        var res_5 = cache(__alreadySeen, source, {}, options);
        source.forEach(function(value, key) {
          res_5[key] = toJSHelper(value, options, __alreadySeen);
        });
        return res_5;
      }
    }
    var res = cache(__alreadySeen, source, {}, options);
    for (var key in source) {
      res[key] = toJSHelper(source[key], options, __alreadySeen);
    }
    return res;
  }
  function toJS$$1(source, options) {
    if (typeof options === "boolean")
      options = {detectCycles: options};
    if (!options)
      options = defaultOptions;
    options.detectCycles = options.detectCycles === undefined ? options.recurseEverything === true : options.detectCycles === true;
    var __alreadySeen;
    if (options.detectCycles)
      __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
  }
  function trace$$1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
      enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
      return fail$$1(process.env.NODE_ENV !== "production" && "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing === TraceMode$$1.NONE) {
      console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
    }
    derivation.isTracing = enterBreakPoint ? TraceMode$$1.BREAK : TraceMode$$1.LOG;
  }
  function getAtomFromArgs(args) {
    switch (args.length) {
      case 0:
        return globalState$$1.trackingDerivation;
      case 1:
        return getAtom$$1(args[0]);
      case 2:
        return getAtom$$1(args[0], args[1]);
    }
  }
  function transaction$$1(action$$1, thisArg) {
    if (thisArg === void 0) {
      thisArg = undefined;
    }
    startBatch$$1();
    try {
      return action$$1.apply(thisArg);
    } finally {
      endBatch$$1();
    }
  }
  function when$$1(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
      return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
  }
  function _when(predicate, effect, opts) {
    var timeoutHandle;
    if (typeof opts.timeout === "number") {
      timeoutHandle = setTimeout(function() {
        if (!disposer[$mobx$$1].isDisposed) {
          disposer();
          var error = new Error("WHEN_TIMEOUT");
          if (opts.onError)
            opts.onError(error);
          else
            throw error;
        }
      }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId$$1();
    var effectAction = createAction$$1(opts.name + "-effect", effect);
    var disposer = autorun$$1(function(r) {
      if (predicate()) {
        r.dispose();
        if (timeoutHandle)
          clearTimeout(timeoutHandle);
        effectAction();
      }
    }, opts);
    return disposer;
  }
  function whenPromise(predicate, opts) {
    if (process.env.NODE_ENV !== "production" && opts && opts.onError)
      return fail$$1("the options 'onError' and 'promise' cannot be combined");
    var cancel;
    var res = new Promise(function(resolve, reject) {
      var disposer = _when(predicate, resolve, __assign({}, opts, {onError: reject}));
      cancel = function() {
        disposer();
        reject("WHEN_CANCELLED");
      };
    });
    res.cancel = cancel;
    return res;
  }
  function getAdm(target) {
    return target[$mobx$$1];
  }
  var objectProxyTraps = {
    has: function(target, name) {
      if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
        return true;
      var adm = getAdm(target);
      if (typeof name === "string")
        return adm.has(name);
      return name in target;
    },
    get: function(target, name) {
      if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
        return target[name];
      var adm = getAdm(target);
      var observable$$1 = adm.values.get(name);
      if (observable$$1 instanceof Atom$$1) {
        var result = observable$$1.get();
        if (result === undefined) {
          adm.has(name);
        }
        return result;
      }
      if (typeof name === "string")
        adm.has(name);
      return target[name];
    },
    set: function(target, name, value) {
      if (typeof name !== "string")
        return false;
      set$$1(target, name, value);
      return true;
    },
    deleteProperty: function(target, name) {
      if (typeof name !== "string")
        return false;
      var adm = getAdm(target);
      adm.remove(name);
      return true;
    },
    ownKeys: function(target) {
      var adm = getAdm(target);
      adm.keysAtom.reportObserved();
      return Reflect.ownKeys(target);
    },
    preventExtensions: function(target) {
      fail$$1("Dynamic observable objects cannot be frozen");
      return false;
    }
  };
  function createDynamicObservableObject$$1(base) {
    var proxy = new Proxy(base, objectProxyTraps);
    base[$mobx$$1].proxy = proxy;
    return proxy;
  }
  function hasInterceptors$$1(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
  }
  function registerInterceptor$$1(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once$$1(function() {
      var idx = interceptors.indexOf(handler);
      if (idx !== -1)
        interceptors.splice(idx, 1);
    });
  }
  function interceptChange$$1(interceptable, change) {
    var prevU = untrackedStart$$1();
    try {
      var interceptors = interceptable.interceptors;
      if (interceptors)
        for (var i = 0,
            l = interceptors.length; i < l; i++) {
          change = interceptors[i](change);
          invariant$$1(!change || change.type, "Intercept handlers should return nothing or a change object");
          if (!change)
            break;
        }
      return change;
    } finally {
      untrackedEnd$$1(prevU);
    }
  }
  function hasListeners$$1(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
  }
  function registerListener$$1(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once$$1(function() {
      var idx = listeners.indexOf(handler);
      if (idx !== -1)
        listeners.splice(idx, 1);
    });
  }
  function notifyListeners$$1(listenable, change) {
    var prevU = untrackedStart$$1();
    var listeners = listenable.changeListeners;
    if (!listeners)
      return;
    listeners = listeners.slice();
    for (var i = 0,
        l = listeners.length; i < l; i++) {
      listeners[i](change);
    }
    untrackedEnd$$1(prevU);
  }
  var MAX_SPLICE_SIZE = 10000;
  var arrayTraps = {
    get: function(target, name) {
      if (name === $mobx$$1)
        return target[$mobx$$1];
      if (name === "length")
        return target[$mobx$$1].getArrayLength();
      if (typeof name === "number") {
        return arrayExtensions.get.call(target, name);
      }
      if (typeof name === "string" && !isNaN(name)) {
        return arrayExtensions.get.call(target, parseInt(name));
      }
      if (arrayExtensions.hasOwnProperty(name)) {
        return arrayExtensions[name];
      }
      return target[name];
    },
    set: function(target, name, value) {
      if (name === "length") {
        target[$mobx$$1].setArrayLength(value);
        return true;
      }
      if (typeof name === "number") {
        arrayExtensions.set.call(target, name, value);
        return true;
      }
      if (!isNaN(name)) {
        arrayExtensions.set.call(target, parseInt(name), value);
        return true;
      }
      return false;
    },
    preventExtensions: function(target) {
      fail$$1("Observable arrays cannot be frozen");
      return false;
    }
  };
  function createObservableArray$$1(initialValues, enhancer, name, owned) {
    if (name === void 0) {
      name = "ObservableArray@" + getNextId$$1();
    }
    if (owned === void 0) {
      owned = false;
    }
    var adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp$$1(adm.values, $mobx$$1, adm);
    var proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
      var prev = allowStateChangesStart$$1(true);
      adm.spliceWithArray(0, 0, initialValues);
      allowStateChangesEnd$$1(prev);
    }
    return proxy;
  }
  var ObservableArrayAdministration = (function() {
    function ObservableArrayAdministration(name, enhancer, owned) {
      this.owned = owned;
      this.values = [];
      this.proxy = undefined;
      this.lastKnownLength = 0;
      this.atom = new Atom$$1(name || "ObservableArray@" + getNextId$$1());
      this.enhancer = function(newV, oldV) {
        return enhancer(newV, oldV, name + "[..]");
      };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function(value) {
      if (this.dehancer !== undefined)
        return this.dehancer(value);
      return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function(values$$1) {
      if (this.dehancer !== undefined && values$$1.length > 0)
        return values$$1.map(this.dehancer);
      return values$$1;
    };
    ObservableArrayAdministration.prototype.intercept = function(handler) {
      return registerInterceptor$$1(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }
      if (fireImmediately) {
        listener({
          object: this.proxy,
          type: "splice",
          index: 0,
          added: this.values.slice(),
          addedCount: this.values.length,
          removed: [],
          removedCount: 0
        });
      }
      return registerListener$$1(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function() {
      this.atom.reportObserved();
      return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function(newLength) {
      if (typeof newLength !== "number" || newLength < 0)
        throw new Error("[mobx.array] Out of range: " + newLength);
      var currentLength = this.values.length;
      if (newLength === currentLength)
        return;
      else if (newLength > currentLength) {
        var newItems = new Array(newLength - currentLength);
        for (var i = 0; i < newLength - currentLength; i++)
          newItems[i] = undefined;
        this.spliceWithArray(currentLength, 0, newItems);
      } else
        this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function(oldLength, delta) {
      if (oldLength !== this.lastKnownLength)
        throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
      this.lastKnownLength += delta;
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function(index, deleteCount, newItems) {
      var _this = this;
      checkIfStateModificationsAreAllowed$$1(this.atom);
      var length = this.values.length;
      if (index === undefined)
        index = 0;
      else if (index > length)
        index = length;
      else if (index < 0)
        index = Math.max(0, length + index);
      if (arguments.length === 1)
        deleteCount = length - index;
      else if (deleteCount === undefined || deleteCount === null)
        deleteCount = 0;
      else
        deleteCount = Math.max(0, Math.min(deleteCount, length - index));
      if (newItems === undefined)
        newItems = EMPTY_ARRAY$$1;
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          object: this.proxy,
          type: "splice",
          index: index,
          removedCount: deleteCount,
          added: newItems
        });
        if (!change)
          return EMPTY_ARRAY$$1;
        deleteCount = change.removedCount;
        newItems = change.added;
      }
      newItems = newItems.length === 0 ? newItems : newItems.map(function(v) {
        return _this.enhancer(v, undefined);
      });
      if (process.env.NODE_ENV !== "production") {
        var lengthDelta = newItems.length - deleteCount;
        this.updateArrayLength(length, lengthDelta);
      }
      var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
      if (deleteCount !== 0 || newItems.length !== 0)
        this.notifyArraySplice(index, newItems, res);
      return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function(index, deleteCount, newItems) {
      var _a;
      if (newItems.length < MAX_SPLICE_SIZE) {
        return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
      } else {
        var res = this.values.slice(index, index + deleteCount);
        this.values = this.values.slice(0, index).concat(newItems, this.values.slice(index + deleteCount));
        return res;
      }
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function(index, newValue, oldValue) {
      var notifySpy = !this.owned && isSpyEnabled$$1();
      var notify = hasListeners$$1(this);
      var change = notify || notifySpy ? {
        object: this.proxy,
        type: "update",
        index: index,
        newValue: newValue,
        oldValue: oldValue
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportStart$$1(__assign({}, change, {name: this.atom.name}));
      this.atom.reportChanged();
      if (notify)
        notifyListeners$$1(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd$$1();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function(index, added, removed) {
      var notifySpy = !this.owned && isSpyEnabled$$1();
      var notify = hasListeners$$1(this);
      var change = notify || notifySpy ? {
        object: this.proxy,
        type: "splice",
        index: index,
        removed: removed,
        added: added,
        removedCount: removed.length,
        addedCount: added.length
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportStart$$1(__assign({}, change, {name: this.atom.name}));
      this.atom.reportChanged();
      if (notify)
        notifyListeners$$1(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd$$1();
    };
    return ObservableArrayAdministration;
  }());
  var arrayExtensions = {
    intercept: function(handler) {
      return this[$mobx$$1].intercept(handler);
    },
    observe: function(listener, fireImmediately) {
      if (fireImmediately === void 0) {
        fireImmediately = false;
      }
      var adm = this[$mobx$$1];
      return adm.observe(listener, fireImmediately);
    },
    clear: function() {
      return this.splice(0);
    },
    replace: function(newItems) {
      var adm = this[$mobx$$1];
      return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    toJS: function() {
      return this.slice();
    },
    toJSON: function() {
      return this.toJS();
    },
    splice: function(index, deleteCount) {
      var newItems = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        newItems[_i - 2] = arguments[_i];
      }
      var adm = this[$mobx$$1];
      switch (arguments.length) {
        case 0:
          return [];
        case 1:
          return adm.spliceWithArray(index);
        case 2:
          return adm.spliceWithArray(index, deleteCount);
      }
      return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray: function(index, deleteCount, newItems) {
      var adm = this[$mobx$$1];
      return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push: function() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      var adm = this[$mobx$$1];
      adm.spliceWithArray(adm.values.length, 0, items);
      return adm.values.length;
    },
    pop: function() {
      return this.splice(Math.max(this[$mobx$$1].values.length - 1, 0), 1)[0];
    },
    shift: function() {
      return this.splice(0, 1)[0];
    },
    unshift: function() {
      var items = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
      }
      var adm = this[$mobx$$1];
      adm.spliceWithArray(0, 0, items);
      return adm.values.length;
    },
    reverse: function() {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
      }
      var clone = this.slice();
      return clone.reverse.apply(clone, arguments);
    },
    sort: function(compareFn) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
      }
      var clone = this.slice();
      return clone.sort.apply(clone, arguments);
    },
    remove: function(value) {
      var adm = this[$mobx$$1];
      var idx = adm.dehanceValues(adm.values).indexOf(value);
      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      }
      return false;
    },
    get: function(index) {
      var adm = this[$mobx$$1];
      if (adm) {
        if (index < adm.values.length) {
          adm.atom.reportObserved();
          return adm.dehanceValue(adm.values[index]);
        }
        console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
      }
      return undefined;
    },
    set: function(index, newValue) {
      var adm = this[$mobx$$1];
      var values$$1 = adm.values;
      if (index < values$$1.length) {
        checkIfStateModificationsAreAllowed$$1(adm.atom);
        var oldValue = values$$1[index];
        if (hasInterceptors$$1(adm)) {
          var change = interceptChange$$1(adm, {
            type: "update",
            object: this,
            index: index,
            newValue: newValue
          });
          if (!change)
            return;
          newValue = change.newValue;
        }
        newValue = adm.enhancer(newValue, oldValue);
        var changed = newValue !== oldValue;
        if (changed) {
          values$$1[index] = newValue;
          adm.notifyArrayChildUpdate(index, newValue, oldValue);
        }
      } else if (index === values$$1.length) {
        adm.spliceWithArray(index, 0, [newValue]);
      } else {
        throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values$$1.length);
      }
    }
  };
  ["concat", "every", "filter", "forEach", "indexOf", "join", "lastIndexOf", "map", "reduce", "reduceRight", "slice", "some", "toString", "toLocaleString"].forEach(function(funcName) {
    arrayExtensions[funcName] = function() {
      var adm = this[$mobx$$1];
      adm.atom.reportObserved();
      var res = adm.dehanceValues(adm.values);
      return res[funcName].apply(res, arguments);
    };
  });
  var isObservableArrayAdministration = createInstanceofPredicate$$1("ObservableArrayAdministration", ObservableArrayAdministration);
  function isObservableArray$$1(thing) {
    return isObject$$1(thing) && isObservableArrayAdministration(thing[$mobx$$1]);
  }
  var _a;
  var ObservableMapMarker = {};
  var ObservableMap$$1 = (function() {
    function ObservableMap$$1(initialData, enhancer, name) {
      if (enhancer === void 0) {
        enhancer = deepEnhancer$$1;
      }
      if (name === void 0) {
        name = "ObservableMap@" + getNextId$$1();
      }
      this.enhancer = enhancer;
      this.name = name;
      this[_a] = ObservableMapMarker;
      this._keysAtom = createAtom$$1(this.name + ".keys()");
      this[Symbol.toStringTag] = "Map";
      if (typeof Map !== "function") {
        throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
      }
      this._data = new Map();
      this._hasMap = new Map();
      this.merge(initialData);
    }
    ObservableMap$$1.prototype._has = function(key) {
      return this._data.has(key);
    };
    ObservableMap$$1.prototype.has = function(key) {
      if (this._hasMap.has(key))
        return this._hasMap.get(key).get();
      return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap$$1.prototype.set = function(key, value) {
      var hasKey = this._has(key);
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          type: hasKey ? "update" : "add",
          object: this,
          newValue: value,
          name: key
        });
        if (!change)
          return this;
        value = change.newValue;
      }
      if (hasKey) {
        this._updateValue(key, value);
      } else {
        this._addValue(key, value);
      }
      return this;
    };
    ObservableMap$$1.prototype.delete = function(key) {
      var _this = this;
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          type: "delete",
          object: this,
          name: key
        });
        if (!change)
          return false;
      }
      if (this._has(key)) {
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy ? {
          type: "delete",
          object: this,
          oldValue: this._data.get(key).value,
          name: key
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(__assign({}, change, {
            name: this.name,
            key: key
          }));
        transaction$$1(function() {
          _this._keysAtom.reportChanged();
          _this._updateHasMapEntry(key, false);
          var observable$$1 = _this._data.get(key);
          observable$$1.setNewValue(undefined);
          _this._data.delete(key);
        });
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
        return true;
      }
      return false;
    };
    ObservableMap$$1.prototype._updateHasMapEntry = function(key, value) {
      var entry = this._hasMap.get(key);
      if (entry) {
        entry.setNewValue(value);
      } else {
        entry = new ObservableValue$$1(value, referenceEnhancer$$1, this.name + "." + key + "?", false);
        this._hasMap.set(key, entry);
      }
      return entry;
    };
    ObservableMap$$1.prototype._updateValue = function(key, newValue) {
      var observable$$1 = this._data.get(key);
      newValue = observable$$1.prepareNewValue(newValue);
      if (newValue !== globalState$$1.UNCHANGED) {
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy ? {
          type: "update",
          object: this,
          oldValue: observable$$1.value,
          name: key,
          newValue: newValue
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(__assign({}, change, {
            name: this.name,
            key: key
          }));
        observable$$1.setNewValue(newValue);
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
      }
    };
    ObservableMap$$1.prototype._addValue = function(key, newValue) {
      var _this = this;
      checkIfStateModificationsAreAllowed$$1(this._keysAtom);
      transaction$$1(function() {
        var observable$$1 = new ObservableValue$$1(newValue, _this.enhancer, _this.name + "." + key, false);
        _this._data.set(key, observable$$1);
        newValue = observable$$1.value;
        _this._updateHasMapEntry(key, true);
        _this._keysAtom.reportChanged();
      });
      var notifySpy = isSpyEnabled$$1();
      var notify = hasListeners$$1(this);
      var change = notify || notifySpy ? {
        type: "add",
        object: this,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportStart$$1(__assign({}, change, {
          name: this.name,
          key: key
        }));
      if (notify)
        notifyListeners$$1(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd$$1();
    };
    ObservableMap$$1.prototype.get = function(key) {
      if (this.has(key))
        return this.dehanceValue(this._data.get(key).get());
      return this.dehanceValue(undefined);
    };
    ObservableMap$$1.prototype.dehanceValue = function(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }
      return value;
    };
    ObservableMap$$1.prototype.keys = function() {
      this._keysAtom.reportObserved();
      return this._data.keys();
    };
    ObservableMap$$1.prototype.values = function() {
      var self = this;
      var nextIndex = 0;
      var keys$$1 = Array.from(this.keys());
      return makeIterable({next: function() {
          return nextIndex < keys$$1.length ? {
            value: self.get(keys$$1[nextIndex++]),
            done: false
          } : {done: true};
        }});
    };
    ObservableMap$$1.prototype.entries = function() {
      var self = this;
      var nextIndex = 0;
      var keys$$1 = Array.from(this.keys());
      return makeIterable({next: function() {
          if (nextIndex < keys$$1.length) {
            var key = keys$$1[nextIndex++];
            return {
              value: [key, self.get(key)],
              done: false
            };
          }
          return {done: true};
        }});
    };
    ObservableMap$$1.prototype[(_a = $mobx$$1, Symbol.iterator)] = function() {
      return this.entries();
    };
    ObservableMap$$1.prototype.forEach = function(callback, thisArg) {
      var e_1,
          _a;
      try {
        for (var _b = __values(this),
            _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2),
              key = _d[0],
              value = _d[1];
          callback.call(thisArg, value, key, this);
        }
      } catch (e_1_1) {
        e_1 = {error: e_1_1};
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
    };
    ObservableMap$$1.prototype.merge = function(other) {
      var _this = this;
      if (isObservableMap$$1(other)) {
        other = other.toJS();
      }
      transaction$$1(function() {
        if (isPlainObject$$1(other))
          Object.keys(other).forEach(function(key) {
            return _this.set(key, other[key]);
          });
        else if (Array.isArray(other))
          other.forEach(function(_a) {
            var _b = __read(_a, 2),
                key = _b[0],
                value = _b[1];
            return _this.set(key, value);
          });
        else if (isES6Map$$1(other)) {
          if (other.constructor !== Map)
            return fail$$1("Cannot initialize from classes that inherit from Map: " + other.constructor.name);
          other.forEach(function(value, key) {
            return _this.set(key, value);
          });
        } else if (other !== null && other !== undefined)
          fail$$1("Cannot initialize map from " + other);
      });
      return this;
    };
    ObservableMap$$1.prototype.clear = function() {
      var _this = this;
      transaction$$1(function() {
        untracked$$1(function() {
          var e_2,
              _a;
          try {
            for (var _b = __values(_this.keys()),
                _c = _b.next(); !_c.done; _c = _b.next()) {
              var key = _c.value;
              _this.delete(key);
            }
          } catch (e_2_1) {
            e_2 = {error: e_2_1};
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        });
      });
    };
    ObservableMap$$1.prototype.replace = function(values$$1) {
      var _this = this;
      transaction$$1(function() {
        var newKeys = getMapLikeKeys$$1(values$$1);
        var oldKeys = Array.from(_this.keys());
        var missingKeys = oldKeys.filter(function(k) {
          return newKeys.indexOf(k) === -1;
        });
        missingKeys.forEach(function(k) {
          return _this.delete(k);
        });
        _this.merge(values$$1);
      });
      return this;
    };
    Object.defineProperty(ObservableMap$$1.prototype, "size", {
      get: function() {
        this._keysAtom.reportObserved();
        return this._data.size;
      },
      enumerable: true,
      configurable: true
    });
    ObservableMap$$1.prototype.toPOJO = function() {
      var e_3,
          _a;
      var res = {};
      try {
        for (var _b = __values(this),
            _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2),
              key = _d[0],
              value = _d[1];
          res["" + key] = value;
        }
      } catch (e_3_1) {
        e_3 = {error: e_3_1};
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_3)
            throw e_3.error;
        }
      }
      return res;
    };
    ObservableMap$$1.prototype.toJS = function() {
      return new Map(this);
    };
    ObservableMap$$1.prototype.toJSON = function() {
      return this.toPOJO();
    };
    ObservableMap$$1.prototype.toString = function() {
      var _this = this;
      return (this.name + "[{ " + Array.from(this.keys()).map(function(key) {
        return key + ": " + ("" + _this.get(key));
      }).join(", ") + " }]");
    };
    ObservableMap$$1.prototype.observe = function(listener, fireImmediately) {
      process.env.NODE_ENV !== "production" && invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
      return registerListener$$1(this, listener);
    };
    ObservableMap$$1.prototype.intercept = function(handler) {
      return registerInterceptor$$1(this, handler);
    };
    return ObservableMap$$1;
  }());
  var isObservableMap$$1 = createInstanceofPredicate$$1("ObservableMap", ObservableMap$$1);
  var _a$1;
  var ObservableSetMarker = {};
  var ObservableSet$$1 = (function() {
    function ObservableSet$$1(initialData, enhancer, name) {
      if (enhancer === void 0) {
        enhancer = deepEnhancer$$1;
      }
      if (name === void 0) {
        name = "ObservableSet@" + getNextId$$1();
      }
      this.name = name;
      this[_a$1] = ObservableSetMarker;
      this._data = new Set();
      this._atom = createAtom$$1(this.name);
      this[Symbol.toStringTag] = "Set";
      if (typeof Set !== "function") {
        throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
      }
      this.enhancer = function(newV, oldV) {
        return enhancer(newV, oldV, name);
      };
      if (initialData) {
        this.replace(initialData);
      }
    }
    ObservableSet$$1.prototype.dehanceValue = function(value) {
      if (this.dehancer !== undefined) {
        return this.dehancer(value);
      }
      return value;
    };
    ObservableSet$$1.prototype.clear = function() {
      var _this = this;
      transaction$$1(function() {
        untracked$$1(function() {
          var e_1,
              _a;
          try {
            for (var _b = __values(_this._data.values()),
                _c = _b.next(); !_c.done; _c = _b.next()) {
              var value = _c.value;
              _this.delete(value);
            }
          } catch (e_1_1) {
            e_1 = {error: e_1_1};
          } finally {
            try {
              if (_c && !_c.done && (_a = _b.return))
                _a.call(_b);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        });
      });
    };
    ObservableSet$$1.prototype.forEach = function(callbackFn, thisArg) {
      var e_2,
          _a;
      try {
        for (var _b = __values(this),
            _c = _b.next(); !_c.done; _c = _b.next()) {
          var value = _c.value;
          callbackFn.call(thisArg, value, value, this);
        }
      } catch (e_2_1) {
        e_2 = {error: e_2_1};
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_2)
            throw e_2.error;
        }
      }
    };
    Object.defineProperty(ObservableSet$$1.prototype, "size", {
      get: function() {
        this._atom.reportObserved();
        return this._data.size;
      },
      enumerable: true,
      configurable: true
    });
    ObservableSet$$1.prototype.add = function(value) {
      var _this = this;
      checkIfStateModificationsAreAllowed$$1(this._atom);
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          type: "add",
          object: this,
          newValue: value
        });
        if (!change)
          return this;
      }
      if (!this.has(value)) {
        transaction$$1(function() {
          _this._data.add(_this.enhancer(value, undefined));
          _this._atom.reportChanged();
        });
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy ? {
          type: "add",
          object: this,
          newValue: value
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(change);
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
      }
      return this;
    };
    ObservableSet$$1.prototype.delete = function(value) {
      var _this = this;
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          type: "delete",
          object: this,
          oldValue: value
        });
        if (!change)
          return false;
      }
      if (this.has(value)) {
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy ? {
          type: "delete",
          object: this,
          oldValue: value
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(__assign({}, change, {name: this.name}));
        transaction$$1(function() {
          _this._atom.reportChanged();
          _this._data.delete(value);
        });
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
        return true;
      }
      return false;
    };
    ObservableSet$$1.prototype.has = function(value) {
      this._atom.reportObserved();
      return this._data.has(this.dehanceValue(value));
    };
    ObservableSet$$1.prototype.entries = function() {
      var nextIndex = 0;
      var keys$$1 = Array.from(this.keys());
      var values$$1 = Array.from(this.values());
      return makeIterable({next: function() {
          var index = nextIndex;
          nextIndex += 1;
          return index < values$$1.length ? {
            value: [keys$$1[index], values$$1[index]],
            done: false
          } : {done: true};
        }});
    };
    ObservableSet$$1.prototype.keys = function() {
      return this.values();
    };
    ObservableSet$$1.prototype.values = function() {
      this._atom.reportObserved();
      var self = this;
      var nextIndex = 0;
      var observableValues = Array.from(this._data.values());
      return makeIterable({next: function() {
          return nextIndex < observableValues.length ? {
            value: self.dehanceValue(observableValues[nextIndex++]),
            done: false
          } : {done: true};
        }});
    };
    ObservableSet$$1.prototype.replace = function(other) {
      var _this = this;
      if (isObservableSet$$1(other)) {
        other = other.toJS();
      }
      transaction$$1(function() {
        if (Array.isArray(other)) {
          _this.clear();
          other.forEach(function(value) {
            return _this.add(value);
          });
        } else if (isES6Set$$1(other)) {
          _this.clear();
          other.forEach(function(value) {
            return _this.add(value);
          });
        } else if (other !== null && other !== undefined) {
          fail$$1("Cannot initialize set from " + other);
        }
      });
      return this;
    };
    ObservableSet$$1.prototype.observe = function(listener, fireImmediately) {
      process.env.NODE_ENV !== "production" && invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
      return registerListener$$1(this, listener);
    };
    ObservableSet$$1.prototype.intercept = function(handler) {
      return registerInterceptor$$1(this, handler);
    };
    ObservableSet$$1.prototype.toJS = function() {
      return new Set(this);
    };
    ObservableSet$$1.prototype.toString = function() {
      return this.name + "[ " + Array.from(this).join(", ") + " ]";
    };
    ObservableSet$$1.prototype[(_a$1 = $mobx$$1, Symbol.iterator)] = function() {
      return this.values();
    };
    return ObservableSet$$1;
  }());
  var isObservableSet$$1 = createInstanceofPredicate$$1("ObservableSet", ObservableSet$$1);
  var ObservableObjectAdministration$$1 = (function() {
    function ObservableObjectAdministration$$1(target, values$$1, name, defaultEnhancer) {
      if (values$$1 === void 0) {
        values$$1 = new Map();
      }
      this.target = target;
      this.values = values$$1;
      this.name = name;
      this.defaultEnhancer = defaultEnhancer;
      this.keysAtom = new Atom$$1(name + ".keys");
    }
    ObservableObjectAdministration$$1.prototype.read = function(key) {
      return this.values.get(key).get();
    };
    ObservableObjectAdministration$$1.prototype.write = function(key, newValue) {
      var instance = this.target;
      var observable$$1 = this.values.get(key);
      if (observable$$1 instanceof ComputedValue$$1) {
        observable$$1.set(newValue);
        return;
      }
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          type: "update",
          object: this.proxy || instance,
          name: key,
          newValue: newValue
        });
        if (!change)
          return;
        newValue = change.newValue;
      }
      newValue = observable$$1.prepareNewValue(newValue);
      if (newValue !== globalState$$1.UNCHANGED) {
        var notify = hasListeners$$1(this);
        var notifySpy = isSpyEnabled$$1();
        var change = notify || notifySpy ? {
          type: "update",
          object: this.proxy || instance,
          oldValue: observable$$1.value,
          name: key,
          newValue: newValue
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(__assign({}, change, {
            name: this.name,
            key: key
          }));
        observable$$1.setNewValue(newValue);
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
      }
    };
    ObservableObjectAdministration$$1.prototype.has = function(key) {
      var map = this.pendingKeys || (this.pendingKeys = new Map());
      var entry = map.get(key);
      if (entry)
        return entry.get();
      else {
        var exists = !!this.values.get(key);
        entry = new ObservableValue$$1(exists, referenceEnhancer$$1, this.name + "." + key.toString() + "?", false);
        map.set(key, entry);
        return entry.get();
      }
    };
    ObservableObjectAdministration$$1.prototype.addObservableProp = function(propName, newValue, enhancer) {
      if (enhancer === void 0) {
        enhancer = this.defaultEnhancer;
      }
      var target = this.target;
      assertPropertyConfigurable$$1(target, propName);
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          object: this.proxy || target,
          name: propName,
          type: "add",
          newValue: newValue
        });
        if (!change)
          return;
        newValue = change.newValue;
      }
      var observable$$1 = new ObservableValue$$1(newValue, enhancer, this.name + "." + propName, false);
      this.values.set(propName, observable$$1);
      newValue = observable$$1.value;
      Object.defineProperty(target, propName, generateObservablePropConfig$$1(propName));
      this.notifyPropertyAddition(propName, newValue);
    };
    ObservableObjectAdministration$$1.prototype.addComputedProp = function(propertyOwner, propName, options) {
      var target = this.target;
      options.name = options.name || this.name + "." + propName;
      this.values.set(propName, new ComputedValue$$1(options));
      if (propertyOwner === target || isPropertyConfigurable$$1(propertyOwner, propName))
        Object.defineProperty(propertyOwner, propName, generateComputedPropConfig$$1(propName));
    };
    ObservableObjectAdministration$$1.prototype.remove = function(key) {
      if (!this.values.has(key))
        return;
      var target = this.target;
      if (hasInterceptors$$1(this)) {
        var change = interceptChange$$1(this, {
          object: this.proxy || target,
          name: key,
          type: "remove"
        });
        if (!change)
          return;
      }
      try {
        startBatch$$1();
        var notify = hasListeners$$1(this);
        var notifySpy = isSpyEnabled$$1();
        var oldObservable = this.values.get(key);
        var oldValue = oldObservable && oldObservable.get();
        oldObservable && oldObservable.set(undefined);
        this.keysAtom.reportChanged();
        this.values.delete(key);
        if (this.pendingKeys) {
          var entry = this.pendingKeys.get(key);
          if (entry)
            entry.set(false);
        }
        delete this.target[key];
        var change = notify || notifySpy ? {
          type: "remove",
          object: this.proxy || target,
          oldValue: oldValue,
          name: key
        } : null;
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportStart$$1(__assign({}, change, {
            name: this.name,
            key: key
          }));
        if (notify)
          notifyListeners$$1(this, change);
        if (notifySpy && process.env.NODE_ENV !== "production")
          spyReportEnd$$1();
      } finally {
        endBatch$$1();
      }
    };
    ObservableObjectAdministration$$1.prototype.illegalAccess = function(owner, propName) {
      console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
    };
    ObservableObjectAdministration$$1.prototype.observe = function(callback, fireImmediately) {
      process.env.NODE_ENV !== "production" && invariant$$1(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
      return registerListener$$1(this, callback);
    };
    ObservableObjectAdministration$$1.prototype.intercept = function(handler) {
      return registerInterceptor$$1(this, handler);
    };
    ObservableObjectAdministration$$1.prototype.notifyPropertyAddition = function(key, newValue) {
      var notify = hasListeners$$1(this);
      var notifySpy = isSpyEnabled$$1();
      var change = notify || notifySpy ? {
        type: "add",
        object: this.proxy || this.target,
        name: key,
        newValue: newValue
      } : null;
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportStart$$1(__assign({}, change, {
          name: this.name,
          key: key
        }));
      if (notify)
        notifyListeners$$1(this, change);
      if (notifySpy && process.env.NODE_ENV !== "production")
        spyReportEnd$$1();
      if (this.pendingKeys) {
        var entry = this.pendingKeys.get(key);
        if (entry)
          entry.set(true);
      }
      this.keysAtom.reportChanged();
    };
    ObservableObjectAdministration$$1.prototype.getKeys = function() {
      var e_1,
          _a;
      this.keysAtom.reportObserved();
      var res = [];
      try {
        for (var _b = __values(this.values),
            _c = _b.next(); !_c.done; _c = _b.next()) {
          var _d = __read(_c.value, 2),
              key = _d[0],
              value = _d[1];
          if (value instanceof ObservableValue$$1)
            res.push(key);
        }
      } catch (e_1_1) {
        e_1 = {error: e_1_1};
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return))
            _a.call(_b);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      return res;
    };
    return ObservableObjectAdministration$$1;
  }());
  function asObservableObject$$1(target, name, defaultEnhancer) {
    if (name === void 0) {
      name = "";
    }
    if (defaultEnhancer === void 0) {
      defaultEnhancer = deepEnhancer$$1;
    }
    if (Object.prototype.hasOwnProperty.call(target, $mobx$$1))
      return target[$mobx$$1];
    process.env.NODE_ENV !== "production" && invariant$$1(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject$$1(target))
      name = (target.constructor.name || "ObservableObject") + "@" + getNextId$$1();
    if (!name)
      name = "ObservableObject@" + getNextId$$1();
    var adm = new ObservableObjectAdministration$$1(target, new Map(), name, defaultEnhancer);
    addHiddenProp$$1(target, $mobx$$1, adm);
    return adm;
  }
  var observablePropertyConfigs = Object.create(null);
  var computedPropertyConfigs = Object.create(null);
  function generateObservablePropConfig$$1(propName) {
    return (observablePropertyConfigs[propName] || (observablePropertyConfigs[propName] = {
      configurable: true,
      enumerable: true,
      get: function() {
        return this[$mobx$$1].read(propName);
      },
      set: function(v) {
        this[$mobx$$1].write(propName, v);
      }
    }));
  }
  function getAdministrationForComputedPropOwner(owner) {
    var adm = owner[$mobx$$1];
    if (!adm) {
      initializeInstance$$1(owner);
      return owner[$mobx$$1];
    }
    return adm;
  }
  function generateComputedPropConfig$$1(propName) {
    return (computedPropertyConfigs[propName] || (computedPropertyConfigs[propName] = {
      configurable: false,
      enumerable: false,
      get: function() {
        return getAdministrationForComputedPropOwner(this).read(propName);
      },
      set: function(v) {
        getAdministrationForComputedPropOwner(this).write(propName, v);
      }
    }));
  }
  var isObservableObjectAdministration = createInstanceofPredicate$$1("ObservableObjectAdministration", ObservableObjectAdministration$$1);
  function isObservableObject$$1(thing) {
    if (isObject$$1(thing)) {
      initializeInstance$$1(thing);
      return isObservableObjectAdministration(thing[$mobx$$1]);
    }
    return false;
  }
  function getAtom$$1(thing, property) {
    if (typeof thing === "object" && thing !== null) {
      if (isObservableArray$$1(thing)) {
        if (property !== undefined)
          fail$$1(process.env.NODE_ENV !== "production" && "It is not possible to get index atoms from arrays");
        return thing[$mobx$$1].atom;
      }
      if (isObservableSet$$1(thing)) {
        return thing[$mobx$$1];
      }
      if (isObservableMap$$1(thing)) {
        var anyThing = thing;
        if (property === undefined)
          return anyThing._keysAtom;
        var observable$$1 = anyThing._data.get(property) || anyThing._hasMap.get(property);
        if (!observable$$1)
          fail$$1(process.env.NODE_ENV !== "production" && "the entry '" + property + "' does not exist in the observable map '" + getDebugName$$1(thing) + "'");
        return observable$$1;
      }
      initializeInstance$$1(thing);
      if (property && !thing[$mobx$$1])
        thing[property];
      if (isObservableObject$$1(thing)) {
        if (!property)
          return fail$$1(process.env.NODE_ENV !== "production" && "please specify a property");
        var observable$$1 = thing[$mobx$$1].values.get(property);
        if (!observable$$1)
          fail$$1(process.env.NODE_ENV !== "production" && "no observable property '" + property + "' found on the observable object '" + getDebugName$$1(thing) + "'");
        return observable$$1;
      }
      if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) {
        return thing;
      }
    } else if (typeof thing === "function") {
      if (isReaction$$1(thing[$mobx$$1])) {
        return thing[$mobx$$1];
      }
    }
    return fail$$1(process.env.NODE_ENV !== "production" && "Cannot obtain atom from " + thing);
  }
  function getAdministration$$1(thing, property) {
    if (!thing)
      fail$$1("Expecting some object");
    if (property !== undefined)
      return getAdministration$$1(getAtom$$1(thing, property));
    if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing))
      return thing;
    if (isObservableMap$$1(thing) || isObservableSet$$1(thing))
      return thing;
    initializeInstance$$1(thing);
    if (thing[$mobx$$1])
      return thing[$mobx$$1];
    fail$$1(process.env.NODE_ENV !== "production" && "Cannot obtain administration from " + thing);
  }
  function getDebugName$$1(thing, property) {
    var named;
    if (property !== undefined)
      named = getAtom$$1(thing, property);
    else if (isObservableObject$$1(thing) || isObservableMap$$1(thing) || isObservableSet$$1(thing))
      named = getAdministration$$1(thing);
    else
      named = getAtom$$1(thing);
    return named.name;
  }
  var toString = Object.prototype.toString;
  function deepEqual$$1(a, b) {
    return eq(a, b);
  }
  function eq(a, b, aStack, bStack) {
    if (a === b)
      return a !== 0 || 1 / a === 1 / b;
    if (a == null || b == null)
      return false;
    if (a !== a)
      return b !== b;
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object")
      return false;
    return deepEq(a, b, aStack, bStack);
  }
  function deepEq(a, b, aStack, bStack) {
    a = unwrap(a);
    b = unwrap(b);
    var className = toString.call(a);
    if (className !== toString.call(b))
      return false;
    switch (className) {
      case "[object RegExp]":
      case "[object String]":
        return "" + a === "" + b;
      case "[object Number]":
        if (+a !== +a)
          return +b !== +b;
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case "[object Date]":
      case "[object Boolean]":
        return +a === +b;
      case "[object Symbol]":
        return (typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
      if (typeof a != "object" || typeof b != "object")
        return false;
      var aCtor = a.constructor,
          bCtor = b.constructor;
      if (aCtor !== bCtor && !(typeof aCtor === "function" && aCtor instanceof aCtor && typeof bCtor === "function" && bCtor instanceof bCtor) && ("constructor" in a && "constructor" in b)) {
        return false;
      }
    }
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
      if (aStack[length] === a)
        return bStack[length] === b;
    }
    aStack.push(a);
    bStack.push(b);
    if (areArrays) {
      length = a.length;
      if (length !== b.length)
        return false;
      while (length--) {
        if (!eq(a[length], b[length], aStack, bStack))
          return false;
      }
    } else {
      var keys$$1 = Object.keys(a),
          key;
      length = keys$$1.length;
      if (Object.keys(b).length !== length)
        return false;
      while (length--) {
        key = keys$$1[length];
        if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
          return false;
      }
    }
    aStack.pop();
    bStack.pop();
    return true;
  }
  function unwrap(a) {
    if (isObservableArray$$1(a))
      return a.slice();
    if (isES6Map$$1(a) || isObservableMap$$1(a))
      return Array.from(a.entries());
    if (isES6Set$$1(a) || isObservableSet$$1(a))
      return Array.from(a.entries());
    return a;
  }
  function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
  }
  function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
  }
  function self() {
    return this;
  }
  if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
  }
  try {
    process.env.NODE_ENV;
  } catch (e) {
    var g = typeof window !== "undefined" ? window : global;
    if (typeof process === "undefined")
      g.process = {};
    g.process.env = {};
  }
  (function() {
    function testCodeMinification() {}
    if (testCodeMinification.name !== "testCodeMinification" && process.env.NODE_ENV !== "production" && process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
      console.warn("[mobx] you are running a minified build, but 'process.env.NODE_ENV' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
    }
  })();
  if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
      spy: spy$$1,
      extras: {getDebugName: getDebugName$$1},
      $mobx: $mobx$$1
    });
  }
  exports.Reaction = Reaction$$1;
  exports.untracked = untracked$$1;
  exports.createAtom = createAtom$$1;
  exports.spy = spy$$1;
  exports.comparer = comparer$$1;
  exports.isObservableObject = isObservableObject$$1;
  exports.isBoxedObservable = isObservableValue$$1;
  exports.isObservableArray = isObservableArray$$1;
  exports.ObservableMap = ObservableMap$$1;
  exports.isObservableMap = isObservableMap$$1;
  exports.ObservableSet = ObservableSet$$1;
  exports.isObservableSet = isObservableSet$$1;
  exports.transaction = transaction$$1;
  exports.observable = observable$$1;
  exports.computed = computed$$1;
  exports.isObservable = isObservable$$1;
  exports.isObservableProp = isObservableProp$$1;
  exports.isComputed = isComputed$$1;
  exports.isComputedProp = isComputedProp$$1;
  exports.extendObservable = extendObservable$$1;
  exports.observe = observe$$1;
  exports.intercept = intercept$$1;
  exports.autorun = autorun$$1;
  exports.reaction = reaction$$1;
  exports.when = when$$1;
  exports.action = action$$1;
  exports.isAction = isAction$$1;
  exports.runInAction = runInAction$$1;
  exports.keys = keys$$1;
  exports.values = values$$1;
  exports.entries = entries$$1;
  exports.set = set$$1;
  exports.remove = remove$$1;
  exports.has = has$$1;
  exports.get = get$$1;
  exports.decorate = decorate$$1;
  exports.configure = configure$$1;
  exports.onBecomeObserved = onBecomeObserved$$1;
  exports.onBecomeUnobserved = onBecomeUnobserved$$1;
  exports.flow = flow$$1;
  exports.toJS = toJS$$1;
  exports.trace = trace$$1;
  exports.getDependencyTree = getDependencyTree$$1;
  exports.getObserverTree = getObserverTree$$1;
  exports._resetGlobalState = resetGlobalState$$1;
  exports._getGlobalState = getGlobalState$$1;
  exports.getDebugName = getDebugName$$1;
  exports.getAtom = getAtom$$1;
  exports._getAdministration = getAdministration$$1;
  exports._allowStateChanges = allowStateChanges$$1;
  exports._allowStateChangesInsideComputed = allowStateChangesInsideComputed$$1;
  exports.isArrayLike = isArrayLike$$1;
  exports.$mobx = $mobx$$1;
  exports._isComputingDerivation = isComputingDerivation$$1;
  exports.onReactionError = onReactionError$$1;
  exports._interceptReads = interceptReads$$1;
})(require('process'));
