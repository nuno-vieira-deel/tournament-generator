/*
 * Dependencies
*/

import { GeneratorGame } from '/interfaces';
import { shuffle } from '/utils/general-util';
import { v4 } from 'uuid';

/*
 * Round robin rotation method
*/

export default (teams: string[], isDouble: boolean): GeneratorGame[] => {
  const oddExtraUuid = v4();
  const lengthOdd = teams.length % 2 === 1;
  if(lengthOdd) teams.push(oddExtraUuid);

  const firstRound: GeneratorGame[] = [];
  const secondRound: GeneratorGame[] = [];

  const teamList = shuffle(teams);
  const numberOfTeams = teamList.length;
  const homeTeams: string[] = teamList.slice(0, numberOfTeams/2);
  const awayTeams: string[] = teamList.slice(numberOfTeams/2, numberOfTeams);
  
  for (let i = 0; i < numberOfTeams - 1; i++) {
    for(let j = 0; j < homeTeams.length; j++) {
      const teams = shuffle([homeTeams[j], awayTeams[j]]);
      const round = i + 1;

      // 1st round game
      firstRound.push({
        awayTeam: teams[1],
        homeTeam: teams[0],
        round
      });
      
      if(isDouble) {
        // 2nd round game
        secondRound.push({
          awayTeam: teams[0],
          homeTeam: teams[1],
          round: round + numberOfTeams - 1
        });
      }
    }

    // Rotation
    const fixedTeam = homeTeams.shift();
    homeTeams.unshift(awayTeams.shift()!);
    homeTeams.unshift(fixedTeam!);
    awayTeams.push(homeTeams.pop()!);
  }

  const fixtures = firstRound.concat(secondRound);

  return lengthOdd ? fixtures.filter(g => g.homeTeam !== oddExtraUuid && g.awayTeam !== oddExtraUuid) : fixtures;
};