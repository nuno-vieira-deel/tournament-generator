"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _generalUtil = require("../utils/general-util");

var _uuid = require("uuid");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * Constants
 */
var TO_BE_DEFINED_CONSTANT = 'TO_BE_DEFINED';
/*
 * Generate missing games until final
 */

var generateMissingGamesUntilFinal = function generateMissingGamesUntilFinal(games, round, toBeDefined) {
  var result = [];
  var roundTwoFixtures = games.filter(function (game) {
    return game.round === 2;
  });
  var perfectRoundFixtures = !roundTwoFixtures.length ? _toConsumableArray(games) : roundTwoFixtures;
  var currentRound = round;

  for (var i = perfectRoundFixtures.length; i > 1; i = i / 2) {
    currentRound++;
    var currentRoundFixtures = [];

    for (var j = 0; j < i; j = j + 2) {
      var firstGame = perfectRoundFixtures[j];
      var secondGame = perfectRoundFixtures[j + 1];
      var game = {
        awayTeam: toBeDefined,
        customData: {
          homeTeam: firstGame === null || firstGame === void 0 ? void 0 : firstGame.id,
          awayTeam: secondGame === null || secondGame === void 0 ? void 0 : secondGame.id
        },
        id: (0, _uuid.v4)(),
        homeTeam: toBeDefined,
        round: currentRound
      };
      currentRoundFixtures.push(game);
    }

    result.push.apply(result, currentRoundFixtures);
    perfectRoundFixtures = currentRoundFixtures;
  }

  return result;
};
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
  var perfectRound = multiRounds ? 2 : 1;
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
        customData.homeTeam = id;
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
        customData.awayTeam = _id;
        awayTeam = toBeDefined;
        lowRoundIndex++;
      }
    } // 2nd round game


    data.push({
      awayTeam: awayTeam,
      customData: customData,
      id: (0, _uuid.v4)(),
      homeTeam: homeTeam,
      round: perfectRound
    });
  }

  if (options.completeCup) {
    var missingGames = generateMissingGamesUntilFinal(data, perfectRound, toBeDefined);
    data.push.apply(data, _toConsumableArray(missingGames));
  }

  return {
    data: data
  };
};

exports["default"] = _default;