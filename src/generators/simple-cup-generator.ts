/*
 * Dependencies
*/

import { GeneratorResponse, GeneratorGame, GeneratorOptions } from '/interfaces';
import { getErrorResponse, shuffle } from '/utils/general-util';
import { v4 } from 'uuid';

/*
 * Constants
*/

const TO_BE_DEFINED_CONSTANT = 'TO_BE_DEFINED';

/*
 * Export generator
*/

export default (teams: string[], options: GeneratorOptions): GeneratorResponse => {
  const toBeDefined = options.toBeDefinedValue || TO_BE_DEFINED_CONSTANT;

  if(teams.includes(toBeDefined)) {
    return getErrorResponse('Invalid team names', 422);
  }

  const teamList = shuffle(teams);
  const data: GeneratorGame[] = [];

  const length = teamList.length;
  const logLength = Math.log2(length);
  const multiRounds = logLength % 1 !== 0;
  const topRoundTeamsNumber = Math.pow(2, Math.floor(logLength));
  let lowRoundIndex = topRoundTeamsNumber;

  for(let i = 0; i < topRoundTeamsNumber; i += 2) {
    const customData = {};
    let homeTeam = teamList[i];
    let awayTeam = teamList[i+1];

    if(multiRounds) {
      // 1st round game for home spot on the 2nd round game
      if(lowRoundIndex < length) {
        const id = v4();
        data.push({
          awayTeam: teamList[lowRoundIndex],
          homeTeam,
          id,
          round: 1
        });

        customData['homeTeam'] = id;
        homeTeam = toBeDefined;
        lowRoundIndex++;
      }

      // 1nd round game for away spot on the 2nd round game
      if(lowRoundIndex < length) {
        const id = v4();
        data.push({
          awayTeam,
          homeTeam: teamList[lowRoundIndex],
          id,
          round: 1
        });

        customData['awayTeam'] = id;
        awayTeam = toBeDefined;
        lowRoundIndex++;
      }
    }

    // 2nd round game
    data.push({
      awayTeam,
      customData,
      id: v4(),
      homeTeam,
      round: multiRounds ? 2 : 1
    });
  }
  
  return { data };
};