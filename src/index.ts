/*
 * Dependencies
*/

import { GeneratorOptions, GeneratorResponse } from '/interfaces';
import { getErrorResponse } from '/utils/general-util';
import generators from '/generators/index';

/*
 * Export main function
*/

export default (teams: string[], options: GeneratorOptions): GeneratorResponse => {
  const generator = generators[options.type];

  if(generator) {
    return generator(teams, options);
  }

  return getErrorResponse('Unsupported generator type', 422);
};