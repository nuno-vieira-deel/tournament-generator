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

  it('Fail to generate due to team list containing invalid number of teams', async () => {
    const teams = [
      'Porto',
      'Benfica',
      'Braga',
      'Sporting',
      'Vitória'
    ];

    const response = generator(teams, { type: 'simple-cup' });

    expect(response).toEqual({ data: [], errors: [{ message: 'Inadequate number of teams', status: 422 }] });
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
});