"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _doubleRoundGenerator = _interopRequireDefault(require("./double-round-generator"));

var _simpleCupGenerator = _interopRequireDefault(require("./simple-cup-generator"));

var _singleRoundGenerator = _interopRequireDefault(require("./single-round-generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Dependencies
*/

/*
 * Generators
*/
var _default = {
  'double-round': _doubleRoundGenerator["default"],
  'simple-cup': _simpleCupGenerator["default"],
  'single-round': _singleRoundGenerator["default"]
};
exports["default"] = _default;