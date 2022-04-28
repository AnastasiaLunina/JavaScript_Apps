'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Outlet = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _uniqueid = require('uniqueid');

var _uniqueid2 = _interopRequireDefault(_uniqueid);

var _liveCaller = require('live-caller');

var _event = require('./event');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */

// $FlowFixMe
var _require = require('zog');

var log = _require.log;
var error = _require.error;
var warn = _require.warn;
var debug = _require.debug;
// $FlowFixMe

var getId = (0, _uniqueid2.default)();

var Outlet = exports.Outlet = function () {
  function Outlet() {
    var container = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    (0, _classCallCheck3.default)(this, Outlet);


    _lodash2.default.defaults(container, {
      events: {},
      state: {},
      vent: new _eventemitter2.default()
    });

    this.container = container;
    this.events = container.events;
    this.state = container.state;
    this.vent = container.vent;
  }

  (0, _createClass3.default)(Outlet, [{
    key: 'runHooks',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(stage, name) {
        var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var event, results;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event = this.events[name];

                if (event) {
                  _context.next = 4;
                  break;
                }

                console.warn('Event was not found: \'' + name + '\'');
                return _context.abrupt('return');

              case 4:
                _context.next = 6;
                return event.runHooks(stage, opts);

              case 6:
                results = _context.sent;
                return _context.abrupt('return', results);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function runHooks(_x2, _x3, _x4) {
        return ref.apply(this, arguments);
      }

      return runHooks;
    }()

    // name can also be an `Event` object.

  }, {
    key: 'getOrCreateEvent',
    value: function getOrCreateEvent(name, event) {
      if (event) {
        if (!this.events[event.name]) this.events[event.name] = event;
        return event;
      }
      return this.events[name] = this.events[name] || new _event.Event(name, this);
    }
  }, {
    key: 'addHook',
    value: function addHook(stage, _ref) {
      var name = _ref.name;
      var sourceEvent = _ref.event;
      var opts = _ref.opts;
      var fn = _ref.fn;
      var targetEvent = _ref.targetEvent;
      var targetEvents = _ref.targetEvents;

      var callInfo = (0, _liveCaller.getCallerFile)(3); // TODO(vjpr): Set correctly.
      var event = this.getOrCreateEvent(name, sourceEvent);

      var callbackName = fn && fn.name || 'anon' + getId();
      var callback = this.getOrCreateEvent(callbackName, targetEvent);
      callback.callInfo = callInfo;
      callback.moduleName = this.moduleName;
      if (!targetEvent) {
        callback.fn = fn;
      }

      this.vent.emit('add-callback', name, callback);
      event.addCallback(stage, callback);
      return callback;
    }
  }, {
    key: 'perform',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(name, opts, fn) {
        var callInfo;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!fn) {
                  fn = opts;opts = {};
                }
                if (!opts) opts = {};
                callInfo = (0, _liveCaller.getCallerFile)(2); // TODO: Need to find the first non-regenerator for live-app perform.

                _context2.next = 5;
                return this._perform(name, (0, _extends3.default)({ callInfo: callInfo }, opts), fn);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function perform(_x6, _x7, _x8) {
        return ref.apply(this, arguments);
      }

      return perform;
    }()
  }, {
    key: '_perform',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(name, opts, fn) {
        var beforeResults, result, afterResults;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!fn) {
                  fn = opts;opts = {};
                }
                if (!opts) opts = {};
                this.vent.emit('start-perform', name, opts);
                _context3.next = 5;
                return this.runHooks('before', name, opts);

              case 5:
                beforeResults = _context3.sent;

                this.vent.emit('run-event', name, opts);
                result = null;

                if (!fn) {
                  _context3.next = 12;
                  break;
                }

                _context3.next = 11;
                return fn(opts, beforeResults);

              case 11:
                result = _context3.sent;

              case 12:
                _context3.next = 14;
                return this.runHooks('after', name, opts);

              case 14:
                afterResults = _context3.sent;
                return _context3.abrupt('return', result);

              case 16:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _perform(_x9, _x10, _x11) {
        return ref.apply(this, arguments);
      }

      return _perform;
    }()

    // Defines an event that handlers can be added to.

  }, {
    key: 'event',
    value: function event(name, opts, fn) {
      if (!fn) {
        fn = opts;opts = {};
      }
      if (!opts) opts = {};
      var evt = this.getOrCreateEvent(name);
      if (fn) evt.fn = fn; // TODO(vjpr): Might be a bad idea.
      return evt;
    }

    // TODO: Should we store lifecycle events for each event, or store events with a naming convention.
    // E.g. `app.on('before:some:event')` OR `app.before('some:event')`.
    // Two parts: Implementation and API.

  }, {
    key: 'on',
    value: function on(_name, _opts, _fn) {
      // TODO: Allow `before:event` sugar.
      //if (const rest = hasBeforePrefix(name)) return this.addHook('before', opts, ...rest.join(''))
      this.addHook('after', parseParams(arguments));
    }

    //register(name, opts, fn, done) {
    //
    //  const {before, after, ...rest} = opts
    //
    //  // Wrap function in perform function to trigger hooks.
    //  const performFn = this.perform.bind(this, name, opts, fn)
    //
    //  // TODO(vjpr): Only supports 1 before hook. Should support array.
    //  if (before) {
    //    this.addHook('before', {name: before[0], opts, fn: performFn})
    //    return
    //  }
    //
    //  if (after) {
    //    this.addHook('after', {name: after[0], opts, fn: performFn})
    //    return
    //  }
    //
    //}

  }, {
    key: 'before',
    value: function before(_name, _opts, _fn) {
      return this.addHook('before', parseParams(arguments));
    }
  }, {
    key: 'after',
    value: function after(_name, _opts, _fn) {
      return this.addHook('after', parseParams(arguments));
    }

    //
    // Legacy
    //

  }, {
    key: 'reply',
    value: function reply(_name, _opts, _fn) {
      return this.addHook('before', parseParams(arguments));
    }

    // TODO: instead of logging with prefix `before`, use `provide`.

  }, {
    key: 'provide',
    value: function provide(_name, _opts, _fn) {
      return this.addHook('before', parseParams(arguments));
    }

    //consumes(_name, _opts, _fn) {
    //  return this.addHook('after', parseParams(arguments))
    //}

  }, {
    key: 'consume',
    value: function consume(name) {
      return this.event(name);
    }

    // ---

  }]);
  return Outlet;
}();

function parseParams(args) {
  var name = void 0,
      event = void 0,
      fn = void 0,
      opts = void 0,
      targetEvent = void 0,
      targetEvents = void 0;
  if (_lodash2.default.isString(args[0])) {
    name = args[0];
  } else if (args[0] instanceof _event.Event) {
    event = args[0];
  }

  if (args.length === 2) {
    if (args[1] instanceof _event.Event) {
      targetEvent = args[1];
    } else if (_lodash2.default.isFunction(args[1])) {
      fn = args[1];
    }
  }

  if (args.length === 3) {
    opts = args[1];
    if (_lodash2.default.isFunction(args[2])) {
      fn = args[2];
    } else if (args[2] instanceof _event.Event) {
      targetEvent = args[2];
    } else if (_lodash2.default.isArray(args[2])) {
      targetEvents = args[2]; // TODO(vjpr): Allow passing an array of functions/Events.
    }
  }

  return { name: name, event: event, opts: opts, fn: fn, targetEvent: targetEvent };
}

//function parseParams(args) {
//  const {name, event, opts, fn, targetEvent} = Args([
//    [
//      {name: Args.STRING | Args.Required},
//      {event: Args.OBJECT | Args.Required, _type: Event},
//    ],
//    [
//      {fn: Args.FUNCTION | Args.Optional},
//      {targetEvent: Args.OBJECT | Args.Optional, _type: Event},
//      {targetEvents: Args.ARRAY | Args.Optional}, // TODO(vjpr): Allow passing an array of functions/Events.
//    ],
//  ], args)
//  return {name, event, opts, fn, targetEvent}
//}

function hasBeforePrefix(name) {
  // $FlowFixMe
  var _name$split = name.split(':');

  var _name$split2 = (0, _toArray3.default)(_name$split);

  var first = _name$split2[0];

  var rest = _name$split2.slice(1);
  // $FlowFixMe


  if (first === 'before') return rest;
  return false;
}
//# sourceMappingURL=outlet.js.map
