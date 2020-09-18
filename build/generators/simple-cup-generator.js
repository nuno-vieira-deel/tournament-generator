"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generalUtil = require("../utils/general-util");

/*
 * Dependencies
*/

/*
 * Export generator
*/
var _default = function _default(teams) {
  if (Math.log2(teams.length) % 1 !== 0) {
    return (0, _generalUtil.getErrorResponse)('Inadequate number of teams', 422);
  }

  var teamList = (0, _generalUtil.shuffle)(teams);
  var data = [];

  for (var i = 0; i < teamList.length; i += 2) {
    data.push({
      awayTeam: teamList[i + 1],
      homeTeam: teamList[i],
      round: 1
    });
  }

  return {
    data: data
  };
};

exports["default"] = _default;