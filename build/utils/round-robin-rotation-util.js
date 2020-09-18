"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generalUtil = require("./general-util");

var _uuid = require("uuid");

/*
 * Dependencies
*/

/*
 * Round robin rotation method
*/
var _default = function _default(teams, isDouble) {
  var oddExtraUuid = (0, _uuid.v4)();
  var lengthOdd = teams.length % 2 === 1;
  if (lengthOdd) teams.push(oddExtraUuid);
  var firstRound = [];
  var secondRound = [];
  var teamList = (0, _generalUtil.shuffle)(teams);
  var numberOfTeams = teamList.length;
  var homeTeams = teamList.slice(0, numberOfTeams / 2);
  var awayTeams = teamList.slice(numberOfTeams / 2, numberOfTeams);

  for (var i = 0; i < numberOfTeams - 1; i++) {
    for (var j = 0; j < homeTeams.length; j++) {
      var _teams = (0, _generalUtil.shuffle)([homeTeams[j], awayTeams[j]]);

      var round = i + 1; // 1st round game

      firstRound.push({
        awayTeam: _teams[1],
        homeTeam: _teams[0],
        round: round
      });

      if (isDouble) {
        // 2nd round game
        secondRound.push({
          awayTeam: _teams[0],
          homeTeam: _teams[1],
          round: round + numberOfTeams - 1
        });
      }
    } // Rotation


    var fixedTeam = homeTeams.shift();
    homeTeams.unshift(awayTeams.shift());
    homeTeams.unshift(fixedTeam);
    awayTeams.push(homeTeams.pop());
  }

  var fixtures = firstRound.concat(secondRound);
  return lengthOdd ? fixtures.filter(function (g) {
    return g.homeTeam !== oddExtraUuid && g.awayTeam !== oddExtraUuid;
  }) : fixtures;
};

exports["default"] = _default;