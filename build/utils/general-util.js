"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateId = exports.getErrorResponse = exports.shuffle = void 0;

/*
 * Dependencies
 */

/*
 * Shuffle utility
 */
var shuffle = function shuffle(array) {
  var i = array.length;

  while (i--) {
    var ri = Math.floor(Math.random() * (i + 1));
    var _ref = [array[ri], array[i]];
    array[i] = _ref[0];
    array[ri] = _ref[1];
  }

  return array;
};
/*
 * Get error response utility
 */


exports.shuffle = shuffle;

var getErrorResponse = function getErrorResponse(message, status) {
  return {
    data: [],
    errors: [{
      message: message,
      status: status
    }]
  };
};
/*
 * Generate id
 */


exports.getErrorResponse = getErrorResponse;

var generateId = function generateId() {
  return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
};

exports.generateId = generateId;