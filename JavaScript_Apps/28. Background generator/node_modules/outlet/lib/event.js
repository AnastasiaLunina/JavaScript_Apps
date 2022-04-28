'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*  weak */

// $FlowFixMe
var _require = require('zog');

var log = _require.log;
var error = _require.error;
var warn = _require.warn;
var debug = _require.debug;

var _ = require('lodash');

var Event = exports.Event = function () {
  function Event(name, app) {
    var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var callInfo = _ref.callInfo;
    var moduleName = _ref.moduleName;
    var fn = _ref.fn;
    (0, _classCallCheck3.default)(this, Event);

    this.name = name;
    this.app = app;
    this.callbacks = { before: [], after: [] };
    this.callbackOrdering = { before: [], after: [] };
    // Callsite info.
    (0, _assign2.default)(this, { callInfo: callInfo, moduleName: moduleName, fn: fn });
  }

  (0, _createClass3.default)(Event, [{
    key: 'desc',
    value: function desc(description) {
      this.description = description;
      return this;
    }
  }, {
    key: 'run',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(opts, performFn) {
        var _this = this;

        var fn;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.name) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt('return', error('Event name not set'));

              case 2:
                // Forward results from before hooks, if there is not a perform fn.
                fn = void 0;

                if (performFn) {
                  fn = performFn;
                } else {
                  fn = this.fn ? this.fn : function () {
                    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts, beforeResults) {
                      return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              return _context.abrupt('return', beforeResults);

                            case 1:
                            case 'end':
                              return _context.stop();
                          }
                        }
                      }, _callee, _this);
                    }));
                    return function (_x4, _x5) {
                      return ref.apply(this, arguments);
                    };
                  }();
                }
                _context2.next = 6;
                return this.app._perform(this.name, opts, fn);

              case 6:
                return _context2.abrupt('return', _context2.sent);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function run(_x2, _x3) {
        return ref.apply(this, arguments);
      }

      return run;
    }()

    /**
     * @param {string} stage - when the hooks should run. E.g. `before`, `after`.
     * @param {Object} opts
     * @param {string} opts.source - Used to determine whether this called as a hook on a previous event.
     */

  }, {
    key: 'runHooks',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(stage, opts) {
        var source, results, orderedCallbacks, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, callback, result;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this.callbacks[stage]) {
                  _context3.next = 3;
                  break;
                }

                warn('No hooks for stage \'' + stage + '\' of event \'' + this.name + '\'');
                return _context3.abrupt('return');

              case 3:
                source = this.name;
                results = [];
                orderedCallbacks = this.constructor._orderCallbacks(this.callbacks[stage], this.callbackOrdering[stage]);
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context3.prev = 9;
                _iterator = (0, _getIterator3.default)(orderedCallbacks);

              case 11:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context3.next = 22;
                  break;
                }

                callback = _step.value;

                //this.vent.emit('runHook', stage, name, callInfo)
                //await exec(fn, opts)
                opts.source = source;
                opts.stage = stage;
                _context3.next = 17;
                return callback.run(opts);

              case 17:
                result = _context3.sent;

                results.push(result);

              case 19:
                _iteratorNormalCompletion = true;
                _context3.next = 11;
                break;

              case 22:
                _context3.next = 28;
                break;

              case 24:
                _context3.prev = 24;
                _context3.t0 = _context3['catch'](9);
                _didIteratorError = true;
                _iteratorError = _context3.t0;

              case 28:
                _context3.prev = 28;
                _context3.prev = 29;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 31:
                _context3.prev = 31;

                if (!_didIteratorError) {
                  _context3.next = 34;
                  break;
                }

                throw _iteratorError;

              case 34:
                return _context3.finish(31);

              case 35:
                return _context3.finish(28);

              case 36:
                return _context3.abrupt('return', results);

              case 37:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[9, 24, 28, 36], [29,, 31, 35]]);
      }));

      function runHooks(_x6, _x7) {
        return ref.apply(this, arguments);
      }

      return runHooks;
    }()
  }, {
    key: 'addCallback',
    value: function addCallback(stage, cb) {
      this.callbacks[stage].push(cb);
      return this;
    }

    // Set ordering of callbacks.

  }, {
    key: 'order',
    value: function order(stage, ordering) {
      this.callbackOrdering[stage] = ordering;
    }

    //
    // Legacy
    //

  }, {
    key: 'get',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
        var _args4 = arguments;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.run.apply(this, _args4);

              case 2:
                return _context4.abrupt('return', _context4.sent);

              case 3:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function get(_x8) {
        return ref.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'fire',
    value: function () {
      var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
        var _args5 = arguments;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.run.apply(this, _args5);

              case 2:
                return _context5.abrupt('return', _context5.sent);

              case 3:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function fire(_x9) {
        return ref.apply(this, arguments);
      }

      return fire;
    }()
  }], [{
    key: '_orderCallbacks',
    value: function _orderCallbacks(events, ordering) {
      var orderedEvents = [];
      // Add events in order in which they are in the `ordering` array.
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = (0, _getIterator3.default)(ordering), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var eventName = _step2.value;

          // TODO(vjpr): Support passing an Event object instead of just a string.
          var event = _(events).find({ name: eventName });
          if (event) orderedEvents.push(event);
        }
        // Add any events not in the `ordering` array.
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var remainingEvents = _.reject(events, function (event) {
        return _.includes(ordering, event.name);
      });
      var allOrderedEvents = orderedEvents.concat(remainingEvents);
      return allOrderedEvents;
    }
  }]);
  return Event;
}();
//# sourceMappingURL=event.js.map
