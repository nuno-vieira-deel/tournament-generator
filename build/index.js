"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generalUtil = require("./utils/general-util");

var _generators = _interopRequireDefault(require("./generators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Dependencies
*/

/*
 * Export main function
*/
var _default = function _default(teams, options) {
  var generator = _generators["default"][options.type];

  if (generator) {
    return generator(teams, options);
  }

  return (0, _generalUtil.getErrorResponse)('Unsupported generator type', 422);
};

exports["default"] = _default;