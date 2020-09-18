/*
 * Dependencies
*/

import generator from '/index';

/*
 * Test
*/

describe('Double round generator test', () => {
  it('Fail to generate due to unsupported generator type', async () => {
    const response = generator([], { type: 'foo' });

    expect(response).toEqual({ data: [], errors: [{ message: 'Unsupported generator type', status: 422 }] });
  });

  it('Generate a new competition with no teams', async () => {
    const response = generator([], { type: 'double-round' });

    expect(response.data).toEqual([]);
  });

  it('Generate a new competition with 4 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting'
    ];

    const response = generator(teams, { type: 'double-round' });
    const sortedData = response.data.sort((a, b) => {
      if(a.homeTeam > b.homeTeam) return 2;
      if(a.homeTeam === b.homeTeam && a.awayTeam > b.awayTeam) return 1;
      return -1;
    });

    expect(sortedData).toEqual([
      { awayTeam: 'Braga', homeTeam: 'Benfica', round: expect.any(Number) },
      { awayTeam: 'Porto', homeTeam: 'Benfica', round: expect.any(Number) },
      { awayTeam: 'Sporting', homeTeam: 'Benfica', round: expect.any(Number) },
      { awayTeam: 'Benfica', homeTeam: 'Braga', round: expect.any(Number) },
      { awayTeam: 'Porto', homeTeam: 'Braga', round: expect.any(Number) },
      { awayTeam: 'Sporting', homeTeam: 'Braga', round: expect.any(Number) },
      { awayTeam: 'Benfica', homeTeam: 'Porto', round: expect.any(Number) },
      { awayTeam: 'Braga', homeTeam: 'Porto', round: expect.any(Number) },
      { awayTeam: 'Sporting', homeTeam: 'Porto', round: expect.any(Number) },
      { awayTeam: 'Benfica', homeTeam: 'Sporting', round: expect.any(Number) },
      { awayTeam: 'Braga', homeTeam: 'Sporting', round: expect.any(Number) },
      { awayTeam: 'Porto', homeTeam: 'Sporting', round: expect.any(Number) },
    ]);
  });

  it('Generate a new competition with 18 teams', async () => {
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
      'Setubal',
      'Portimonense',
      'Aves'
    ];

    const response = generator(teams, { type: 'double-round' });

    expect(response.data.length).toEqual(306);
  });

  it('Generate a new competition with 19 teams', async () => {
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
      'Setubal',
      'Portimonense',
      'Aves',
      'Tottenham'
    ];

    const response = generator(teams, { type: 'double-round' });

    expect(response.data.length).toEqual(342);
  });
});