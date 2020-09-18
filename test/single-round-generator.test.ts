/*
 * Dependencies
*/

import generator from '/index';

/*
 * Test
*/

describe('Single round generator test', () => {
  it('Fail to generate due to unsupported generator type', async () => {
    const response = generator([], { type: 'foo' });

    expect(response).toEqual({ data: [], errors: [{ message: 'Unsupported generator type', status: 422 }] });
  });

  it('Generate a new competition with no teams', async () => {
    const response = generator([], { type: 'single-round' });

    expect(response.data).toEqual([]);
  });

  it('Generate a new competition with 4 teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting'
    ];

    const response = generator(teams, { type: 'single-round' });

    expect(response.data.length).toEqual(6);

    const counter = {};
    response.data.map(t => {
      counter[t.homeTeam] = counter[t.homeTeam] + 1 || 1;
      counter[t.awayTeam] = counter[t.awayTeam] + 1 || 1;
    });

    expect(counter['Braga']).toEqual(3);
    expect(counter['Benfica']).toEqual(3);
    expect(counter['Porto']).toEqual(3);
    expect(counter['Sporting']).toEqual(3);
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

    const response = generator(teams, { type: 'single-round' });

    expect(response.data.length).toEqual(153);
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

    const response = generator(teams, { type: 'single-round' });

    expect(response.data.length).toEqual(171);
  });
});