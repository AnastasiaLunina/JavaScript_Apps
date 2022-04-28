'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite('Outlet');

var _require = require('../outlet');

var Outlet = _require.Outlet;


process.on('unhandledException', function () {
  throw e;
});

function ee(EventEmitter, deferred) {
  var emitter = new EventEmitter();
  emitter.on('foo:before', function () {
    emitter.emit('foo');
  });
  emitter.on('foo', function () {
    emitter.emit('foo:after');
  });
  emitter.on('foo:after', function () {
    deferred.resolve();
  });
  emitter.emit('foo:before');
}

suite.add('Outlet#run (async/await)', function (deferred) {
  var _this = this;

  var container = {};
  var outlet = new Outlet(container);
  var eventName = 'foo';
  var event = outlet.event(eventName);
  outlet.before(eventName, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(opts) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));
    return function (_x) {
      return ref.apply(this, arguments);
    };
  }());
  outlet.after(eventName, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(opts) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));
    return function (_x2) {
      return ref.apply(this, arguments);
    };
  }());
  event.run({}, function () {
    var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(opts, results) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));
    return function (_x3, _x4) {
      return ref.apply(this, arguments);
    };
  }()).then(function () {
    deferred.resolve();
  });
}, { defer: true })

// TODO
//.add('Outlet#run (callbacks)', function(deferred) {
//  const container = {}
//  const outlet = new Outlet(container)
//  const eventName = 'foo'
//  const event = outlet.event(eventName)
//  outlet.before(eventName, (done) => {})
//  outlet.after(eventName, (done) => {})
//  event.run({}, (done) => {}).then(() => {
//    deferred.resolve()
//  })
//}, {defer: true})

.add('understudy', function (deferred) {
  var Understudy = require('understudy');
  var actor = new Understudy();
  var eventName = 'foo';
  actor.before(eventName, function (next) {
    next('hello');
  });
  actor.after(eventName, function (next) {
    next();
    deferred.resolve();
  });
  actor.perform(eventName, function (next) {
    next('hello');
  });
}, { defer: true }).add('EventEmitter', function (deferred) {
  var EventEmitter = require('events');
  ee(EventEmitter, deferred);
}, { defer: true }).add('EventEmitter3', function (deferred) {
  var EventEmitter = require('eventemitter3');
  ee(EventEmitter, deferred);
}, { defer: true });

suite.on('cycle', function (event) {
  console.log(String(event.target));
});

if (!module.parent) {
  suite.run();
}

module.exports = suite;
//# sourceMappingURL=index.js.map
