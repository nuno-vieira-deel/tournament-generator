/*
 * Dependencies
*/

import { GeneratorResponse } from '/interfaces';

/*
 * Shuffle utility
*/

export const shuffle = <T>(array: T[]): T[] => {
  let i = array.length;
  while (i--) {
    const ri = Math.floor(Math.random() * (i + 1));
    [array[i], array[ri]] = [array[ri], array[i]];
  }
  return array;
};

/*
 * Get error response utility
*/

export const getErrorResponse = (message: string, status: number): GeneratorResponse => {
  return { data: [], errors: [{ message, status }] };
};