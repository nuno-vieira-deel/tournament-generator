/*
 * Dependencies
 */

import { GeneratorResponse } from 'lib';
import generateFixtures from '/utils/round-robin-rotation-util';

/*
 * Export generator
 */

export default (teams: string[]): GeneratorResponse => {
  return { data: generateFixtures(teams, true) };
};