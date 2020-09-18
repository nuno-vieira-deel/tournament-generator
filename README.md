# Tournament generator

Javascript package to generate tournaments automatically.

## Installation

### With npm

```sh
npm i tournament-generator --save
```

### With yarn

```sh
yarn add tournament-generator
```

## How to use

The next code snippet shows how to create a `double-round` competition.

```ts
// Import tournament generator
import generator from 'tournament-generator';

// List of all teams
const teams = ['Team1', 'Team2', 'Team3', 'Team4'];

// Generate and get games
const { data: games } = generator(teams, { type: 'double-round' });
```

The next snippet shows the possible content of the `games` entity.

```ts
games = [
  { awayTeam: 'Team1', homeTeam: 'Team3', round: 1 },
  { awayTeam: 'Team4', homeTeam: 'Team2', round: 1 },
  { awayTeam: 'Team2', homeTeam: 'Team1', round: 2 },
  { awayTeam: 'Team3', homeTeam: 'Team4', round: 2 },
  { awayTeam: 'Team1', homeTeam: 'Team4', round: 3 },
  { awayTeam: 'Team3', homeTeam: 'Team2', round: 3 },
  { awayTeam: 'Team3', homeTeam: 'Team1', round: 4 },
  { awayTeam: 'Team2', homeTeam: 'Team4', round: 4 },
  { awayTeam: 'Team1', homeTeam: 'Team2', round: 5 },
  { awayTeam: 'Team4', homeTeam: 'Team3', round: 5 },
  { awayTeam: 'Team4', homeTeam: 'Team1', round: 6 },
  { awayTeam: 'Team2', homeTeam: 'Team3', round: 6 }
]
```

### Properties

At the moment the only supported property is the type and there are three possible tournament types to generate.

- `double-round`: A championship competition where teams play against each other twice, one at home and one away. It is based on round robin rotation and shuffling.
- `single-round`: A championship competition where teams play against each other one single time. It is based on round robin rotation and shuffling.
- `simple-cup`: A cup competition. It basically generates the first round and the rest of the competition is based on the order of the games.

## Test

To run the package tests, you just need to execute:

```sh
npm test
```
or
```sh
yarn test
```

## Future work

In the future, the objective is to:
- Add possibility to support cup competitions when receiving a number of teams that are not on the 2^n sequence by adding an extra round.
- Add draw pots to cup competitions which brings the objective of creating cups based on groups.
- Add plugin support for entire competitions like Champions League or Europa League. **
- Add full competition management like classifications, leaderboards, etc. **

** Not sure if it makes sense to be integrated in this package or on a different one.