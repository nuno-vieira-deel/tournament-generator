/*
 * Dependencies
*/

import generator from '/index';

/*
 * Test
*/

describe('Simple cup generator test', () => {
  it('Fail to generate due to unsupported generator type', async () => {
    const response = generator([], { type: 'foo' });

    expect(response).toEqual({ data: [], errors: [{ message: 'Unsupported generator type', status: 422 }] });
  });

  it('Fail to generate due to invalid team names', async () => {
    const response = generator(['Porto', 'Benfica', 'Sporting', 'TO_BE_DEFINED'], { type: 'simple-cup' });

    expect(response).toEqual({ data: [], errors: [{ message: 'Invalid team names', status: 422 }] });
  });

  it('Generate a new competition with no teams', async () => {
    const response = generator([], { type: 'simple-cup' });

    expect(response.data).toEqual([]);
  });

  it('Generate a new competition with 4 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting'
    ];

    const response = generator(teams, { type: 'simple-cup' });
    
    expect(response.data.length).toEqual(2);
  });

  it('Generate a new competition with 16 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting',
      'Rio Ave',
      'Famalicão',
      'Guimarães',
      'Moreirense',
      'Santa Clara',
      'Gil Vicente',
      'Marítimo',
      'Boavista',
      'Paços de Ferreira',
      'Tondela',
      'Belenenses',
      'Portimonense'
    ];

    const response = generator(teams, { type: 'simple-cup' });

    expect(response.data.length).toEqual(8);
  });

  it('Generate a new competition with 12 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting',
      'Rio Ave',
      'Famalicão',
      'Guimarães',
      'Moreirense',
      'Santa Clara',
      'Gil Vicente',
      'Marítimo',
      'Boavista'
    ];

    const response = generator(teams, { type: 'simple-cup' });
    const lowerRoundGames = response.data.filter(game => game.round === 1);

    lowerRoundGames.forEach(game => {
      const top = response.data.filter(g => g.customData?.awayTeam === game.id || g.customData?.homeTeam === game.id);

      expect(top.length).toEqual(1);
      expect(top[0].round).toEqual(2);
    });

    expect(response.data.filter(game => game.awayTeam !== 'TO_BE_DEFINED' && game.homeTeam === 'TO_BE_DEFINED').length).toEqual(0);
  });

  it('Generate a new competition with 13 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting',
      'Rio Ave',
      'Famalicão',
      'Guimarães',
      'Moreirense',
      'Santa Clara',
      'Gil Vicente',
      'Marítimo',
      'Boavista',
      'Paços de Ferreira'
    ];

    const response = generator(teams, { type: 'simple-cup' });

    expect(response.data.filter(game => game.awayTeam === 'TO_BE_DEFINED' && game.homeTeam === 'TO_BE_DEFINED').length).toEqual(2);
    expect(response.data.filter(game => game.awayTeam !== 'TO_BE_DEFINED' && game.homeTeam === 'TO_BE_DEFINED').length).toEqual(1);
  });

  it('Generate a new competition with 13 teams with specific toBeDefined value', async () => {
    const toBeDefinedValue = 'Waiting for 1st round';
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting',
      'Rio Ave',
      'Famalicão',
      'Guimarães',
      'Moreirense',
      'Santa Clara',
      'Gil Vicente',
      'Marítimo',
      'Boavista',
      'Paços de Ferreira'
    ];

    const response = generator(teams, { toBeDefinedValue, type: 'simple-cup' });

    expect(response.data.filter(game => game.awayTeam === toBeDefinedValue && game.homeTeam === toBeDefinedValue).length).toEqual(2);
    expect(response.data.filter(game => game.awayTeam !== toBeDefinedValue && game.homeTeam === toBeDefinedValue).length).toEqual(1);
  });
});