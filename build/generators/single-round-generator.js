"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _roundRobinRotationUtil = _interopRequireDefault(require("../utils/round-robin-rotation-util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * Dependencies
*/

/*
 * Export generator
*/
var _default = function _default(teams) {
  return {
    data: (0, _roundRobinRotationUtil["default"])(teams, false)
  };
};

exports["default"] = _default;