'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', function (e) {
  throw e;
});

describe('Event', function () {

  it('sets name', function () {
    var name = 'foo';
    var event = new _.Event(name);
    expect(event.name).to.equal(name);
  });
});

describe('Outlet', function () {
  var _this = this;

  it('callbacks fire in the correct order', function (done) {

    var eventName = 'foo';
    var outlet = new _.Outlet();
    var event = outlet.event(eventName);

    //outlet.vent.on('add-callback', (a) => {
    //  console.log('add-callback', a)
    //})

    var beforeCb1 = sinon.spy();
    var beforeCb2 = sinon.spy();
    var runCb = sinon.spy();
    var afterCb1 = sinon.spy();
    var afterCb2 = sinon.spy();

    outlet.before('foo', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              beforeCb1();

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    })));

    outlet.before('foo', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              beforeCb2();

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    })));

    outlet.after('foo', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              afterCb1();

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    })));

    outlet.after('foo', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              afterCb2();

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    })));

    event.run({}, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              runCb();

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }))).then(function () {
      beforeCb1.should.be.calledBefore(beforeCb2);
      beforeCb2.should.be.calledBefore(runCb);
      runCb.should.have.been.calledOnce;
      afterCb1.should.be.calledAfter(runCb);
      afterCb2.should.be.calledAfter(afterCb1);
      done();
    });
  });

  it('callbacks fire in correct order when manually ordered', function (done) {

    var eventName = 'foo';
    var outlet = new _.Outlet();
    var event = outlet.event(eventName);

    var afterCb1 = sinon.spy();
    var afterCb2 = sinon.spy();

    var bar1 = outlet.event('bar1', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6() {
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', afterCb1());

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    })));
    var bar2 = outlet.event('bar2', (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7() {
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', afterCb2());

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, _this);
    })));

    // In real-world these handlers could be registered in separate files/modules.
    outlet.after('foo', bar1);
    outlet.after('foo', bar2);

    //outlet.after('foo', async () => afterCb1())
    //outlet.after('foo', async () => afterCb2())

    event.order('after', ['bar2', 'bar1']);

    event.run({}, (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8() {
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              true;
            case 1:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }))).then(function () {
      //afterCb1.should.be.calledBefore(afterCb2)
      afterCb2.should.be.calledBefore(afterCb1);
      done();
    });
  });
});
//# sourceMappingURL=index-test.js.map
