/*
 * Dependencies
 */

import { GeneratorResponse, GeneratorGame, GeneratorGameCustomData, GeneratorOptions } from 'lib';
import { getErrorResponse, shuffle } from '/utils/general-util';
import { v4 } from 'uuid';

/*
 * Constants
 */

const TO_BE_DEFINED_CONSTANT = 'TO_BE_DEFINED';

/*
 * Generate missing games until final
 */

const generateMissingGamesUntilFinal = (games: Readonly<GeneratorGame[]>, round: number, toBeDefined: string): GeneratorGame[] => {
  const result: GeneratorGame[] = [];
  const roundTwoFixtures = games.filter(game => game.round === 2);
  let perfectRoundFixtures = !roundTwoFixtures.length ? [...games] : roundTwoFixtures;
  let currentRound = round;

  for (let i = perfectRoundFixtures.length; i > 1; i = i / 2) {
    currentRound++;
    const currentRoundFixtures: GeneratorGame[] = [];

    for (let j = 0; j < i; j = j + 2) {
      const firstGame = perfectRoundFixtures[j];
      const secondGame = perfectRoundFixtures[j + 1];

      const game: GeneratorGame = {
        awayTeam: toBeDefined,
        customData: {
          homeTeam: firstGame?.id,
          awayTeam: secondGame?.id
        },
        id: v4(),
        homeTeam: toBeDefined,
        round: currentRound
      };

      currentRoundFixtures.push(game);
    }

    result.push(...currentRoundFixtures);
    perfectRoundFixtures = currentRoundFixtures;
  }

  return result;
};

/*
 * Export generator
 */

export default (teams: string[], options: GeneratorOptions): GeneratorResponse => {
  const toBeDefined = options.toBeDefinedValue || TO_BE_DEFINED_CONSTANT;

  if (teams.includes(toBeDefined)) {
    return getErrorResponse('Invalid team names', 422);
  }

  const teamList = shuffle(teams);
  const data: GeneratorGame[] = [];

  const length = teamList.length;
  const logLength = Math.log2(length);
  const multiRounds = logLength % 1 !== 0;
  const topRoundTeamsNumber = Math.pow(2, Math.floor(logLength));
  const perfectRound = multiRounds ? 2 : 1;
  let lowRoundIndex = topRoundTeamsNumber;

  for(let i = 0; i < topRoundTeamsNumber; i += 2) {
    const customData: GeneratorGameCustomData = {};
    let homeTeam = teamList[i];
    let awayTeam = teamList[i + 1];

    if (multiRounds) {
      // 1st round game for home spot on the 2nd round game
      if (lowRoundIndex < length) {
        const id = v4();

        data.push({
          awayTeam: teamList[lowRoundIndex],
          homeTeam,
          id,
          round: 1
        });

        customData.homeTeam = id;
        homeTeam = toBeDefined;
        lowRoundIndex++;
      }

      // 1nd round game for away spot on the 2nd round game
      if (lowRoundIndex < length) {
        const id = v4();
        data.push({
          awayTeam,
          homeTeam: teamList[lowRoundIndex],
          id,
          round: 1
        });

        customData.awayTeam = id;
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
      round: perfectRound
    });
  }

  if (options.completeCup) {
    const missingGames = generateMissingGamesUntilFinal(data, perfectRound, toBeDefined);

    data.push(...missingGames);
  }

  return { data };
};