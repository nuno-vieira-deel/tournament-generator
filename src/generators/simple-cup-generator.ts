/*
 * Dependencies
*/

import { GeneratorResponse, GeneratorGame } from '/interfaces';
import { getErrorResponse, shuffle } from '/utils/general-util';

/*
 * Export generator
*/

export default (teams: string[]): GeneratorResponse => {
  if(Math.log2(teams.length) % 1 !== 0) {
    return getErrorResponse('Inadequate number of teams', 422);
  }

  const teamList = shuffle(teams);
  const data: GeneratorGame[] = [];

  for(let i = 0; i < teamList.length; i += 2) {
    data.push({
      awayTeam: teamList[i+1],
      homeTeam: teamList[i],
      round: 1
    });
  }
  
  return { data };
};