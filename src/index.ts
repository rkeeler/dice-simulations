import dice from './dice';
import { logTable, formatPercent } from './utils';
import Simulation from './Simulation';

main();

function main() {
  const simulation = new Simulation({
    isSuccess: (playerValues, enemyValues) =>
      findHighest(playerValues) > findHighest(enemyValues),
    isCrit: (playerValues, enemyValues) =>
      nGreaterThan(playerValues, 2, findHighest(enemyValues))
  });

  const playerRanks = [
    [dice.d4],
    [dice.d4, dice.d4],
    [dice.d6, dice.d4],
    [dice.d6, dice.d6],
    [dice.d8, dice.d6],
    [dice.d8, dice.d8],
    [dice.d10, dice.d8],
    [dice.d10, dice.d10, dice.d6]
  ];

  const difficultyRanks = [
    [dice.d4],
    [dice.d6],
    [dice.d8],
    [dice.d10, dice.d4],
    [dice.d12, dice.d6],
    [dice.d20, dice.d8]
  ];

  logTable([
    ['↓ Player | Enemy →', ...difficultyRanks.map(d => diceToString(d))],
    ...playerRanks.map(playerRank =>
      createTableRow(simulation, playerRank, difficultyRanks)
    )
  ]);
}

function createTableRow(simulation, playerRank, difficultyRanks) {
  const results = difficultyRanks.map(difficultyRank =>
    simulation.run(playerRank, difficultyRank)
  );
  return [diceToString(playerRank), ...results.map(formatResults)];
}

function formatResults(results) {
  return `${formatPercent(results.successPercent)} (${formatPercent(
    results.critPercent
  )})`;
}

function findHighest(values: number[]) {
  return values.reduce(
    (highest, value) => (value > highest ? value : highest),
    values[0]
  );
}

function nGreaterThan(values: number[], n: number, target: number) {
  let x = 0;

  for (let v of values) {
    if (v > target) {
      x += 1;

      if (x >= n) return true;
    }
  }

  return false;
}

function diceToString(dice) {
  return dice.map(d => d.name).join(',');
}
