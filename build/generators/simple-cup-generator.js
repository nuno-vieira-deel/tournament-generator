"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generalUtil = require("../utils/general-util");

var _uuid = require("uuid");

/*
 * Dependencies
*/

/*
 * Constants
*/
var TO_BE_DEFINED_CONSTANT = 'TO_BE_DEFINED';
/*
 * Export generator
*/

var _default = function _default(teams, options) {
  var toBeDefined = options.toBeDefinedValue || TO_BE_DEFINED_CONSTANT;

  if (teams.includes(toBeDefined)) {
    return (0, _generalUtil.getErrorResponse)('Invalid team names', 422);
  }

  var teamList = (0, _generalUtil.shuffle)(teams);
  var data = [];
  var length = teamList.length;
  var logLength = Math.log2(length);
  var multiRounds = logLength % 1 !== 0;
  var topRoundTeamsNumber = Math.pow(2, Math.floor(logLength));
  var lowRoundIndex = topRoundTeamsNumber;

  for (var i = 0; i < topRoundTeamsNumber; i += 2) {
    var customData = {};
    var homeTeam = teamList[i];
    var awayTeam = teamList[i + 1];

    if (multiRounds) {
      // 1st round game for home spot on the 2nd round game
      if (lowRoundIndex < length) {
        var id = (0, _uuid.v4)();
        data.push({
          awayTeam: teamList[lowRoundIndex],
          homeTeam: homeTeam,
          id: id,
          round: 1
        });
        customData['homeTeam'] = id;
        homeTeam = toBeDefined;
        lowRoundIndex++;
      } // 1nd round game for away spot on the 2nd round game


      if (lowRoundIndex < length) {
        var _id = (0, _uuid.v4)();

        data.push({
          awayTeam: awayTeam,
          homeTeam: teamList[lowRoundIndex],
          id: _id,
          round: 1
        });
        customData['awayTeam'] = _id;
        awayTeam = toBeDefined;
        lowRoundIndex++;
      }
    } // 2nd round game


    data.push({
      awayTeam: awayTeam,
      customData: customData,
      id: (0, _uuid.v4)(),
      homeTeam: homeTeam,
      round: multiRounds ? 2 : 1
    });
  }

  return {
    data: data
  };
};

exports["default"] = _default;