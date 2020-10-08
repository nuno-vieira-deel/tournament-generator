# Competition types

At the moment, there are three possible tournament types to generate: `double-round`, `single-round` and `simple-cup`.

## Double round competition

A championship competition where teams play against each other twice, one at home and one away. It is based on round robin rotation and shuffling. The example above shows the final results of the double round competition generator.

```ts
// With 4 teams
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

## Single round competition

A championship competition where teams play against each other one single time. It is based on round robin rotation and shuffling. The single round competition usage is very similar to the double round so the final results, based on the example above, would be a competition with just 3 rounds instead of 6.

```ts
// With 4 teams
games = [
  { awayTeam: 'Team1', homeTeam: 'Team3', round: 1 },
  { awayTeam: 'Team4', homeTeam: 'Team2', round: 1 },
  { awayTeam: 'Team2', homeTeam: 'Team1', round: 2 },
  { awayTeam: 'Team3', homeTeam: 'Team4', round: 2 },
  { awayTeam: 'Team1', homeTeam: 'Team4', round: 3 },
  { awayTeam: 'Team3', homeTeam: 'Team2', round: 3 }
]
```

## Simple cup competition

A cup competition. It basically generates the first round (or the first two rounds) and the rest of the competition is based on the order of the games. The simple cup competition has more possible results than the other two. The first one is when the number of teams participating belongs to the sequence [2, 4, 8, 16] (2^n). The second one is when the number of teams is not included on that sequence but it is an even number and the last one is when the number of teams is odd. Next, you have the three possible final results:

```ts
// With 4 teams
games = [
  {
    awayTeam: 'Team3',
    customData: {},
    id: 'ff1cf651-3fe8-4593-a53a-7aba3882df4b',
    homeTeam: 'Team1',
    round: 1
  },
  {
    awayTeam: 'Team4',
    customData: {},
    id: '79bbd874-d48e-47ff-9cd9-78a0074e7730',
    homeTeam: 'Team2',
    round: 1
  }
]
```

```ts
// With 6 teams
games = [
  {
    awayTeam: 'Team3',
    homeTeam: 'Team5',
    id: '0100e6c2-3949-4160-acae-9537dab57314',
    round: 1
  },
  {
    awayTeam: 'Team2',
    homeTeam: 'Team6',
    id: 'ba38af14-942c-45b4-a04b-dc25a5a26e9b',
    round: 1
  },
  {
    awayTeam: 'TO_BE_DEFINED',
    customData: {
      homeTeam: '0100e6c2-3949-4160-acae-9537dab57314',
      awayTeam: 'ba38af14-942c-45b4-a04b-dc25a5a26e9b'
    },
    id: '31349bb0-aa8a-4993-bc24-971f6c3aea2f',
    homeTeam: 'TO_BE_DEFINED',
    round: 2
  },
  {
    awayTeam: 'Team4',
    customData: {},
    id: '0a147881-1670-41ce-9eb7-fa20481033d0',
    homeTeam: 'Team1',
    round: 2
  }
]
```

```ts
// With 5 teams
games = [
  {
    awayTeam: 'Team1',
    homeTeam: 'Team2',
    id: '14409fb9-3b79-4934-8b45-c4a0562809ef',
    round: 1
  },
  {
    awayTeam: 'Team4',
    customData: { homeTeam: '14409fb9-3b79-4934-8b45-c4a0562809ef' },
    id: 'e655a98c-acb6-4a5a-b205-fd58358eb163',
    homeTeam: 'TO_BE_DEFINED',
    round: 2
  },
  {
    awayTeam: 'Team5',
    customData: {},
    id: '6ad689ab-60c0-4309-bbf9-80a7c82adca2',
    homeTeam: 'Team3',
    round: 2
  }
]
```