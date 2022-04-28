'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var colorNames = ['red', 'green',
//'yellow',
'blue', 'magenta', 'cyan'];

var ColorCode = function () {
  function ColorCode() {
    (0, _classCallCheck3.default)(this, ColorCode);
    this.colorIndex = 0;
    this.colorMap = {};
  }

  (0, _createClass3.default)(ColorCode, [{
    key: 'get',
    value: function get(name) {
      // Assign color.
      var color = this.colorMap[name];
      if (!color) {
        color = this.colorMap[name] = colorNames[this.colorIndex++ % colorNames.length];
      }
      return _chalk2.default[color](name);
    }
  }, {
    key: 'getColor',
    value: function getColor(name) {
      var color = this.colorMap[name];
      if (!color) {
        this.get(name);
      }
      return this.colorMap[name];
    }
  }]);
  return ColorCode;
}();

var singleton = new ColorCode();

var main = function main() {
  var instance = new ColorCode();
  return function (name) {
    return instance.get(name);
  };
};

main.ColorCode = ColorCode;

module.exports = main;
//# sourceMappingURL=index.js.map
