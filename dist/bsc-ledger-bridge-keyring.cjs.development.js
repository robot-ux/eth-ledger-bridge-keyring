'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var events = require('events');
var HDKey = _interopDefault(require('hdkey'));
var ethUtil = _interopDefault(require('ethereumjs-util'));
var TransportUsb = _interopDefault(require('@ledgerhq/hw-transport-webusb'));
var LedgerEth = _interopDefault(require('@ledgerhq/hw-app-eth'));
var erc20 = require('@ledgerhq/hw-app-eth/erc20');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var pathBase = 'm';
var hdPathString = pathBase + "/44'/60'/0'";
var type = 'Ledger Hardware';
var BRIDGE_URL = 'https://metamask.github.io/eth-ledger-bridge-keyring';
var MAX_INDEX = 1000;
var NETWORK_API_URLS = {
  ropsten: 'http://api-ropsten.etherscan.io',
  kovan: 'http://api-kovan.etherscan.io',
  rinkeby: 'https://api-rinkeby.etherscan.io',
  mainnet: 'https://api.etherscan.io'
};

var FirefoxLedgerBridge = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(FirefoxLedgerBridge, _EventEmitter);

  function FirefoxLedgerBridge(opts) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    _this = _EventEmitter.call(this) || this;
    _this.accountDetails = {};
    _this.bridgeUrl = null;
    _this.type = type;
    _this.page = 0;
    _this.perPage = 5;
    _this.unlockedAccount = 0;
    _this.hdk = new HDKey();
    _this.paths = {};
    _this.iframe = null;
    _this.network = 'mainnet';
    _this.implementFullBIP44 = false;

    _this.deserialize(opts);

    _this.iframeLoaded = false;

    _this._setupIframe();

    return _this;
  }

  var _proto = FirefoxLedgerBridge.prototype;

  _proto.serialize = function serialize() {
    return Promise.resolve({
      hdPath: this.hdPath,
      accounts: this.accounts,
      accountDetails: this.accountDetails,
      bridgeUrl: this.bridgeUrl,
      implementFullBIP44: false
    });
  };

  _proto.deserialize = function deserialize(opts) {
    var _this2 = this;

    if (opts === void 0) {
      opts = {};
    }

    this.hdPath = opts.hdPath || hdPathString;
    this.bridgeUrl = opts.bridgeUrl || BRIDGE_URL;
    this.accounts = opts.accounts || [];
    this.accountDetails = opts.accountDetails || {};
    this.implementFullBIP44 = opts.implementFullBIP44 || false; // Remove accounts that don't have corresponding account details

    this.accounts = this.accounts.filter(function (account) {
      return Object.keys(_this2.accountDetails).includes(ethUtil.toChecksumAddress(account));
    });
    return Promise.resolve();
  };

  _proto.isUnlocked = function isUnlocked() {
    return Boolean(this.hdk && this.hdk.publicKey);
  };

  _proto.setAccountToUnlock = function setAccountToUnlock(index) {
    this.unlockedAccount = parseInt(index, 10);
  };

  _proto.setHdPath = function setHdPath(hdPath) {
    // Reset HDKey if the path changes
    if (this.hdPath !== hdPath) {
      this.hdk = new HDKey();
    }

    this.hdPath = hdPath;
  };

  _proto.unlock = function unlock(hdPath) {
    var _this3 = this;

    if (this.isUnlocked() && !hdPath) {
      return Promise.resolve('already unlocked');
    }

    var path = hdPath ? this._toLedgerPath(hdPath) : this.hdPath;
    return new Promise(function (resolve, reject) {
      _this3._sendMessage({
        action: 'ledger-unlock',
        params: {
          hdPath: path
        }
      }, function (_ref) {
        var success = _ref.success,
            payload = _ref.payload;

        if (success) {
          _this3.hdk.publicKey = Buffer.from(payload.publicKey, 'hex');
          _this3.hdk.chainCode = Buffer.from(payload.chainCode, 'hex');
          resolve(payload.address);
        } else {
          reject(payload.error || 'Unknown error');
        }
      });
    });
  };

  _proto.getFirstPage = function getFirstPage() {
    this.page = 0;
    return this.__getPage(1);
  };

  _proto.getNextPage = function getNextPage() {
    return this.__getPage(1);
  };

  _proto.getPreviousPage = function getPreviousPage() {
    return this.__getPage(-1);
  };

  _proto.updateTransportMethod = function updateTransportMethod() {
    console.log('Only for compatible');
  };

  _proto.signTransaction = function signTransaction(address, tx, accountIndex) {
    var _this4 = this;

    return new Promise(function (resolve, reject) {
      _this4.unlock().then(function (_) {
        tx.v = ethUtil.bufferToHex(tx.getChainId());
        tx.r = '0x00';
        tx.s = '0x00';
        var hdPath;

        if (_this4._isLedgerLiveHdPath()) {
          var index = accountIndex;
          hdPath = _this4._getPathForIndex(index);
        } else {
          hdPath = _this4._toLedgerPath(_this4._pathFromAddress(address));
        }

        _this4._sendMessage({
          action: 'ledger-sign-transaction',
          params: {
            tx: tx.serialize().toString('hex'),
            hdPath: hdPath,
            to: ethUtil.bufferToHex(tx.to).toLowerCase()
          }
        }, function (_ref2) {
          var success = _ref2.success,
              payload = _ref2.payload;

          if (success) {
            tx.v = Buffer.from(payload.v, 'hex');
            tx.r = Buffer.from(payload.r, 'hex');
            tx.s = Buffer.from(payload.s, 'hex');
            resolve(tx);
          } else {
            reject(new Error(payload.error || 'Ledger: Unknown error while signing transaction'));
          }
        });
      })["catch"](function (err) {
        throw err;
      });
    });
  }
  /* PRIVATE METHODS */
  ;

  _proto._setupIframe = function _setupIframe() {
    this.iframe = document.createElement('iframe');
    this.iframe.src = this.bridgeUrl;
    document.head.appendChild(this.iframe);
  };

  _proto._getOrigin = function _getOrigin() {
    var tmp = this.bridgeUrl.split('/');
    tmp.splice(-1, 1);
    return tmp.join('/');
  };

  _proto._sendMessage = function _sendMessage(msg, cb) {
    var _this5 = this;

    msg.target = 'LEDGER-IFRAME';
    this.iframe.contentWindow.postMessage(msg, '*');

    var eventListener = function eventListener(_ref3) {
      var origin = _ref3.origin,
          data = _ref3.data;

      if (origin !== _this5._getOrigin()) {
        return false;
      }

      if (data && data.action && data.action === msg.action + "-reply" && cb) {
        cb(data);
        return undefined;
      }

      window.removeEventListener('message', eventListener);
      return undefined;
    };

    window.addEventListener('message', eventListener);
  };

  _proto.__getPage = /*#__PURE__*/function () {
    var _getPage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(increment) {
      var from, to, accounts;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.page += increment;

              if (this.page <= 0) {
                this.page = 1;
              }

              from = (this.page - 1) * this.perPage;
              to = from + this.perPage;
              _context.next = 6;
              return this.unlock();

            case 6:
              if (!this._isLedgerLiveHdPath()) {
                _context.next = 12;
                break;
              }

              _context.next = 9;
              return this._getAccountsBIP44(from, to);

            case 9:
              accounts = _context.sent;
              _context.next = 13;
              break;

            case 12:
              accounts = this._getAccountsLegacy(from, to);

            case 13:
              return _context.abrupt("return", accounts);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __getPage(_x) {
      return _getPage.apply(this, arguments);
    }

    return __getPage;
  }();

  _proto._getAccountsBIP44 = /*#__PURE__*/function () {
    var _getAccountsBIP = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(from, to) {
      var accounts, i, path, address, valid;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              accounts = [];
              i = from;

            case 2:
              if (!(i < to)) {
                _context2.next = 21;
                break;
              }

              path = this._getPathForIndex(i);
              _context2.next = 6;
              return this.unlock(path);

            case 6:
              address = _context2.sent;

              if (!this.implementFullBIP44) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return this._hasPreviousTransactions(address);

            case 10:
              _context2.t0 = _context2.sent;
              _context2.next = 14;
              break;

            case 13:
              _context2.t0 = true;

            case 14:
              valid = _context2.t0;
              accounts.push({
                address: address,
                balance: null,
                index: i
              }); // PER BIP44
              // "Software should prevent a creation of an account if
              // a previous account does not have a transaction history
              // (meaning none of its addresses have been used before)."

              if (valid) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt("break", 21);

            case 18:
              i++;
              _context2.next = 2;
              break;

            case 21:
              return _context2.abrupt("return", accounts);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _getAccountsBIP44(_x2, _x3) {
      return _getAccountsBIP.apply(this, arguments);
    }

    return _getAccountsBIP44;
  }();

  _proto._getAccountsLegacy = function _getAccountsLegacy(from, to) {
    var accounts = [];

    for (var i = from; i < to; i++) {
      var address = this._addressFromIndex(pathBase, i);

      accounts.push({
        address: address,
        balance: null,
        index: i
      });
      this.paths[ethUtil.toChecksumAddress(address)] = i;
    }

    return accounts;
  };

  _proto._padLeftEven = function _padLeftEven(hex) {
    return hex.length % 2 === 0 ? hex : "0" + hex;
  };

  _proto._normalize = function _normalize(buf) {
    return this._padLeftEven(ethUtil.bufferToHex(buf).toLowerCase());
  } // eslint-disable-next-line no-shadow
  ;

  _proto._addressFromIndex = function _addressFromIndex(pathBase, i) {
    var dkey = this.hdk.derive(pathBase + "/" + i);
    var address = ethUtil.publicToAddress(dkey.publicKey, true).toString('hex');
    return ethUtil.toChecksumAddress("0x" + address);
  };

  _proto._pathFromAddress = function _pathFromAddress(address) {
    var checksummedAddress = ethUtil.toChecksumAddress(address);
    var index = this.paths[checksummedAddress];

    if (typeof index === 'undefined') {
      for (var i = 0; i < MAX_INDEX; i++) {
        if (checksummedAddress === this._addressFromIndex(pathBase, i)) {
          index = i;
          break;
        }
      }
    }

    if (typeof index === 'undefined') {
      throw new Error('Unknown address');
    }

    return this._getPathForIndex(index);
  };

  _proto._toAscii = function _toAscii(hex) {
    var str = '';
    var i = 0;
    var l = hex.length;

    if (hex.substring(0, 2) === '0x') {
      i = 2;
    }

    for (; i < l; i += 2) {
      var code = parseInt(hex.substr(i, 2), 16);
      str += String.fromCharCode(code);
    }

    return str;
  };

  _proto._getPathForIndex = function _getPathForIndex(index) {
    // Check if the path is BIP 44 (Ledger Live)
    return this._isLedgerLiveHdPath() ? "m/44'/60'/" + index + "'/0/0" : this.hdPath + "/" + index;
  };

  _proto._isLedgerLiveHdPath = function _isLedgerLiveHdPath() {
    return this.hdPath === "m/44'/60'/0'/0/0";
  };

  _proto._toLedgerPath = function _toLedgerPath(path) {
    return path.toString().replace('m/', '');
  };

  _proto._hasPreviousTransactions = /*#__PURE__*/function () {
    var _hasPreviousTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(address) {
      var apiUrl, response, parsedResponse;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              apiUrl = this._getApiUrl();
              _context3.next = 3;
              return window.fetch(apiUrl + "/api?module=account&action=txlist&address=" + address + "&tag=latest&page=1&offset=1");

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return response.json();

            case 6:
              parsedResponse = _context3.sent;

              if (!(parsedResponse.status !== '0' && parsedResponse.result.length > 0)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", true);

            case 9:
              return _context3.abrupt("return", false);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _hasPreviousTransactions(_x4) {
      return _hasPreviousTransactions2.apply(this, arguments);
    }

    return _hasPreviousTransactions;
  }();

  _proto._getApiUrl = function _getApiUrl() {
    return NETWORK_API_URLS[this.network] || NETWORK_API_URLS.mainnet;
  };

  return FirefoxLedgerBridge;
}(events.EventEmitter);

FirefoxLedgerBridge.type = type;

var LedgerBridge = /*#__PURE__*/function () {
  function LedgerBridge() {}

  var _proto = LedgerBridge.prototype;

  _proto.makeApp = /*#__PURE__*/function () {
    var _makeApp = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return TransportUsb.create();

            case 3:
              this.transport = _context.sent;
              this.app = new LedgerEth(this.transport);
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              console.log('LEDGER:::CREATE APP ERROR', _context.t0);
              throw _context.t0;

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 7]]);
    }));

    function makeApp() {
      return _makeApp.apply(this, arguments);
    }

    return makeApp;
  }();

  _proto.cleanUp = /*#__PURE__*/function () {
    var _cleanUp = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2() {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.app = null;

              if (!this.transport) {
                _context2.next = 4;
                break;
              }

              _context2.next = 4;
              return this.transport.close();

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function cleanUp() {
      return _cleanUp.apply(this, arguments);
    }

    return cleanUp;
  }();

  _proto.unlock = /*#__PURE__*/function () {
    var _unlock = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(hdPath) {
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return this.makeApp();

            case 3:
              _context3.next = 5;
              return this.app.getAddress(hdPath, false, true);

            case 5:
              return _context3.abrupt("return", _context3.sent);

            case 8:
              _context3.prev = 8;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.reject(this.ledgerErrToMessage(_context3.t0)));

            case 11:
              _context3.prev = 11;
              _context3.next = 14;
              return this.cleanUp();

            case 14:
              return _context3.finish(11);

            case 15:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 8, 11, 15]]);
    }));

    function unlock(_x) {
      return _unlock.apply(this, arguments);
    }

    return unlock;
  }();

  _proto.signTransaction = /*#__PURE__*/function () {
    var _signTransaction = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(hdPath, tx, to) {
      var isKnownERC20Token;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.makeApp();

            case 3:
              if (!to) {
                _context4.next = 8;
                break;
              }

              isKnownERC20Token = erc20.byContractAddress(to);

              if (!isKnownERC20Token) {
                _context4.next = 8;
                break;
              }

              _context4.next = 8;
              return this.app.provideERC20TokenInformation(isKnownERC20Token);

            case 8:
              _context4.next = 10;
              return this.app.signTransaction(hdPath, tx);

            case 10:
              return _context4.abrupt("return", _context4.sent);

            case 13:
              _context4.prev = 13;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", Promise.reject(this.ledgerErrToMessage(_context4.t0)));

            case 16:
              _context4.prev = 16;
              _context4.next = 19;
              return this.cleanUp();

            case 19:
              return _context4.finish(16);

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 13, 16, 20]]);
    }));

    function signTransaction(_x2, _x3, _x4) {
      return _signTransaction.apply(this, arguments);
    }

    return signTransaction;
  }();

  _proto.signPersonalMessage = /*#__PURE__*/function () {
    var _signPersonalMessage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(hdPath, message) {
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return this.makeApp();

            case 3:
              _context5.next = 5;
              return this.app.signPersonalMessage(hdPath, message);

            case 5:
              return _context5.abrupt("return", _context5.sent);

            case 8:
              _context5.prev = 8;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", Promise.reject(this.ledgerErrToMessage(_context5.t0)));

            case 11:
              _context5.prev = 11;
              this.cleanUp();
              return _context5.finish(11);

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 8, 11, 14]]);
    }));

    function signPersonalMessage(_x5, _x6) {
      return _signPersonalMessage.apply(this, arguments);
    }

    return signPersonalMessage;
  }();

  _proto.ledgerErrToMessage = function ledgerErrToMessage(err) {
    var isU2FError = function isU2FError(e) {
      return Boolean(e) && Boolean(e.metaData);
    };

    var isStringError = function isStringError(e) {
      return typeof e === 'string';
    }; // eslint-disable-next-line no-prototype-builtins


    var isErrorWithId = function isErrorWithId(e) {
      return e.hasOwnProperty('id') && e.hasOwnProperty('message');
    };

    var isWrongAppError = function isWrongAppError(e) {
      return String(e.message || e).includes('6804');
    };

    var isLedgerLockedError = function isLedgerLockedError(e) {
      return e.message && e.message.includes('OpenFailed');
    }; // https://developers.yubico.com/U2F/Libraries/Client_error_codes.html


    if (isU2FError(err)) {
      if (err.metaData.code === 5) {
        return 'LEDGER_TIMEOUT';
      }

      return err.metaData.type;
    }

    if (isWrongAppError(err)) {
      return 'LEDGER_WRONG_APP';
    }

    if (isLedgerLockedError(err) || isStringError(err) && err.includes('6801')) {
      return 'LEDGER_LOCKED';
    }

    if (isErrorWithId(err)) {
      // Browser doesn't support U2F
      if (err.message.includes('U2F not supported')) {
        return 'U2F_NOT_SUPPORTED';
      }
    } // Other


    return err.toString();
  };

  return LedgerBridge;
}();

var pathBase$1 = 'm';
var hdPathString$1 = pathBase$1 + "/44'/60'/0'";
var type$1 = 'Ledger Hardware';
var MAX_INDEX$1 = 1000;
var NETWORK_API_URLS$1 = {
  ropsten: 'http://api-ropsten.etherscan.io',
  kovan: 'http://api-kovan.etherscan.io',
  rinkeby: 'https://api-rinkeby.etherscan.io',
  mainnet: 'https://api.etherscan.io'
};

var ChromeLedgerBridge = /*#__PURE__*/function (_EventEmitter) {
  _inheritsLoose(ChromeLedgerBridge, _EventEmitter);

  function ChromeLedgerBridge(opts) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    _this = _EventEmitter.call(this) || this;
    _this.accountDetails = {};
    _this.type = type$1;
    _this.page = 0;
    _this.perPage = 5;
    _this.unlockedAccount = 0;
    _this.hdk = new HDKey();
    _this.paths = {};
    _this.network = 'mainnet';
    _this.implementFullBIP44 = false;

    _this.deserialize(opts);

    _this.bridge = new LedgerBridge();
    return _this;
  }

  var _proto = ChromeLedgerBridge.prototype;

  _proto.serialize = function serialize() {
    return Promise.resolve({
      hdPath: this.hdPath,
      accounts: this.accounts,
      accountDetails: this.accountDetails,
      implementFullBIP44: false
    });
  };

  _proto.deserialize = function deserialize(opts) {
    var _this2 = this;

    if (opts === void 0) {
      opts = {};
    }

    this.hdPath = opts.hdPath || hdPathString$1;
    this.accounts = opts.accounts || [];
    this.accountDetails = opts.accountDetails || {};
    this.implementFullBIP44 = opts.implementFullBIP44 || false; // Remove accounts that don't have corresponding account details

    this.accounts = this.accounts.filter(function (account) {
      return Object.keys(_this2.accountDetails).includes(ethUtil.toChecksumAddress(account));
    });
    return Promise.resolve();
  };

  _proto.isUnlocked = function isUnlocked() {
    return Boolean(this.hdk && this.hdk.publicKey);
  };

  _proto.setAccountToUnlock = function setAccountToUnlock(index) {
    this.unlockedAccount = parseInt(index, 10);
  };

  _proto.setHdPath = function setHdPath(hdPath) {
    // Reset HDKey if the path changes
    if (this.hdPath !== hdPath) {
      this.hdk = new HDKey();
    }

    this.hdPath = hdPath;
  };

  _proto.unlock = function unlock(hdPath) {
    var _this3 = this;

    if (this.isUnlocked() && !hdPath) {
      return Promise.resolve('already unlocked');
    }

    var path = hdPath ? this._toLedgerPath(hdPath) : this.hdPath;
    return this.bridge.unlock(path).then(function (payload) {
      _this3.hdk.publicKey = Buffer.from(payload.publicKey, 'hex');
      _this3.hdk.chainCode = Buffer.from(payload.chainCode, 'hex');
      return payload.address;
    });
  };

  _proto.getFirstPage = function getFirstPage() {
    this.page = 0;
    return this.__getPage(1);
  };

  _proto.getNextPage = function getNextPage() {
    return this.__getPage(1);
  };

  _proto.getPreviousPage = function getPreviousPage() {
    return this.__getPage(-1);
  };

  _proto.updateTransportMethod = function updateTransportMethod() {
    console.log('Only for compatible');
  };

  _proto.signTransaction = function signTransaction(address, tx, accountIndex) {
    var _this4 = this;

    return this.unlock().then(function (_) {
      tx.v = ethUtil.bufferToHex(tx.getChainId());
      tx.r = '0x00';
      tx.s = '0x00';
      var hdPath;

      if (_this4._isLedgerLiveHdPath()) {
        var index = accountIndex;
        hdPath = _this4._getPathForIndex(index);
      } else {
        hdPath = _this4._toLedgerPath(_this4._pathFromAddress(address));
      }

      return _this4.bridge.signTransaction(hdPath, tx.serialize().toString('hex'), ethUtil.bufferToHex(tx.to).toLowerCase()).then(function (payload) {
        tx.v = Buffer.from(payload.v, 'hex');
        tx.r = Buffer.from(payload.r, 'hex');
        tx.s = Buffer.from(payload.s, 'hex');
        return tx;
      });
    });
  };

  _proto.__getPage = /*#__PURE__*/function () {
    var _getPage = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(increment) {
      var from, to, accounts;
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.page += increment;

              if (this.page <= 0) {
                this.page = 1;
              }

              from = (this.page - 1) * this.perPage;
              to = from + this.perPage;
              _context.next = 6;
              return this.unlock();

            case 6:
              if (!this._isLedgerLiveHdPath()) {
                _context.next = 12;
                break;
              }

              _context.next = 9;
              return this._getAccountsBIP44(from, to);

            case 9:
              accounts = _context.sent;
              _context.next = 13;
              break;

            case 12:
              accounts = this._getAccountsLegacy(from, to);

            case 13:
              return _context.abrupt("return", accounts);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __getPage(_x) {
      return _getPage.apply(this, arguments);
    }

    return __getPage;
  }();

  _proto._getAccountsBIP44 = /*#__PURE__*/function () {
    var _getAccountsBIP = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(from, to) {
      var accounts, i, path, address, valid;
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              accounts = [];
              i = from;

            case 2:
              if (!(i < to)) {
                _context2.next = 21;
                break;
              }

              path = this._getPathForIndex(i);
              _context2.next = 6;
              return this.unlock(path);

            case 6:
              address = _context2.sent;

              if (!this.implementFullBIP44) {
                _context2.next = 13;
                break;
              }

              _context2.next = 10;
              return this._hasPreviousTransactions(address);

            case 10:
              _context2.t0 = _context2.sent;
              _context2.next = 14;
              break;

            case 13:
              _context2.t0 = true;

            case 14:
              valid = _context2.t0;
              accounts.push({
                address: address,
                balance: null,
                index: i
              }); // PER BIP44
              // "Software should prevent a creation of an account if
              // a previous account does not have a transaction history
              // (meaning none of its addresses have been used before)."

              if (valid) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt("break", 21);

            case 18:
              i++;
              _context2.next = 2;
              break;

            case 21:
              return _context2.abrupt("return", accounts);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _getAccountsBIP44(_x2, _x3) {
      return _getAccountsBIP.apply(this, arguments);
    }

    return _getAccountsBIP44;
  }();

  _proto._getAccountsLegacy = function _getAccountsLegacy(from, to) {
    var accounts = [];

    for (var i = from; i < to; i++) {
      var address = this._addressFromIndex(pathBase$1, i);

      accounts.push({
        address: address,
        balance: null,
        index: i
      });
      this.paths[ethUtil.toChecksumAddress(address)] = i;
    }

    return accounts;
  };

  _proto._padLeftEven = function _padLeftEven(hex) {
    return hex.length % 2 === 0 ? hex : "0" + hex;
  };

  _proto._normalize = function _normalize(buf) {
    return this._padLeftEven(ethUtil.bufferToHex(buf).toLowerCase());
  } // eslint-disable-next-line no-shadow
  ;

  _proto._addressFromIndex = function _addressFromIndex(pathBase, i) {
    var dkey = this.hdk.derive(pathBase + "/" + i);
    var address = ethUtil.publicToAddress(dkey.publicKey, true).toString('hex');
    return ethUtil.toChecksumAddress("0x" + address);
  };

  _proto._pathFromAddress = function _pathFromAddress(address) {
    var checksummedAddress = ethUtil.toChecksumAddress(address);
    var index = this.paths[checksummedAddress];

    if (typeof index === 'undefined') {
      for (var i = 0; i < MAX_INDEX$1; i++) {
        if (checksummedAddress === this._addressFromIndex(pathBase$1, i)) {
          index = i;
          break;
        }
      }
    }

    if (typeof index === 'undefined') {
      throw new Error('Unknown address');
    }

    return this._getPathForIndex(index);
  };

  _proto._toAscii = function _toAscii(hex) {
    var str = '';
    var i = 0;
    var l = hex.length;

    if (hex.substring(0, 2) === '0x') {
      i = 2;
    }

    for (; i < l; i += 2) {
      var code = parseInt(hex.substr(i, 2), 16);
      str += String.fromCharCode(code);
    }

    return str;
  };

  _proto._getPathForIndex = function _getPathForIndex(index) {
    // Check if the path is BIP 44 (Ledger Live)
    return this._isLedgerLiveHdPath() ? "m/44'/60'/" + index + "'/0/0" : this.hdPath + "/" + index;
  };

  _proto._isLedgerLiveHdPath = function _isLedgerLiveHdPath() {
    return this.hdPath === "m/44'/60'/0'/0/0";
  };

  _proto._toLedgerPath = function _toLedgerPath(path) {
    return path.toString().replace('m/', '');
  };

  _proto._hasPreviousTransactions = /*#__PURE__*/function () {
    var _hasPreviousTransactions2 = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(address) {
      var apiUrl, response, parsedResponse;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              apiUrl = this._getApiUrl();
              _context3.next = 3;
              return window.fetch(apiUrl + "/api?module=account&action=txlist&address=" + address + "&tag=latest&page=1&offset=1");

            case 3:
              response = _context3.sent;
              _context3.next = 6;
              return response.json();

            case 6:
              parsedResponse = _context3.sent;

              if (!(parsedResponse.status !== '0' && parsedResponse.result.length > 0)) {
                _context3.next = 9;
                break;
              }

              return _context3.abrupt("return", true);

            case 9:
              return _context3.abrupt("return", false);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function _hasPreviousTransactions(_x4) {
      return _hasPreviousTransactions2.apply(this, arguments);
    }

    return _hasPreviousTransactions;
  }();

  _proto._getApiUrl = function _getApiUrl() {
    return NETWORK_API_URLS$1[this.network] || NETWORK_API_URLS$1.mainnet;
  };

  return ChromeLedgerBridge;
}(events.EventEmitter);

ChromeLedgerBridge.type = type$1;

var isChrome = /*#__PURE__*/ /chrome/i.test(window.navigator.userAgent);
module.exports = isChrome ? ChromeLedgerBridge : FirefoxLedgerBridge;
//# sourceMappingURL=bsc-ledger-bridge-keyring.cjs.development.js.map
