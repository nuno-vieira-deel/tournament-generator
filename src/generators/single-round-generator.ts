/*
 * Dependencies
*/

import { GeneratorResponse } from '/interfaces';
import generateFixtures from '/utils/round-robin-rotation-util';

/*
 * Export generator
*/

export default (teams: string[]): GeneratorResponse => {
  return { data: generateFixtures(teams, false) };
};