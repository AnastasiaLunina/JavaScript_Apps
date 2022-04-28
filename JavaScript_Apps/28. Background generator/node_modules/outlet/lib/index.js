'use strict';

var _require = require('./event');

var Event = _require.Event;

var _require2 = require('./outlet');

var Outlet = _require2.Outlet;


var globalContainer = {};
var main = function main() {
  return new Outlet(globalContainer);
};
main.Event = Event;
main.Outlet = Outlet;

module.exports = main;
//# sourceMappingURL=index.js.map
