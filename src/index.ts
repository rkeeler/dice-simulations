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

  logTable([
    ['↓ Player | Enemy →', '1d4', '1d6', '1d8', '1d10,1d4', '1d12,1d6', '1d20,1d8'],
    createTableRow('1d4', [
      simulation.run([dice.d4], [dice.d4]),
      simulation.run([dice.d4], [dice.d6]),
      simulation.run([dice.d4], [dice.d8]),
      simulation.run([dice.d4], [dice.d10, dice.d4]),
      simulation.run([dice.d4], [dice.d12, dice.d6]),
      simulation.run([dice.d4], [dice.d20, dice.d8])
    ]),
    createTableRow('1d4,1d4', [
      simulation.run([dice.d4, dice.d4], [dice.d4]),
      simulation.run([dice.d4, dice.d4], [dice.d6]),
      simulation.run([dice.d4, dice.d4], [dice.d8]),
      simulation.run([dice.d4, dice.d4], [dice.d10, dice.d4]),
      simulation.run([dice.d4, dice.d4], [dice.d12, dice.d6]),
      simulation.run([dice.d4, dice.d4], [dice.d20, dice.d8])
    ]),
    createTableRow('1d6,1d4', [
      simulation.run([dice.d6, dice.d4], [dice.d4]),
      simulation.run([dice.d6, dice.d4], [dice.d6]),
      simulation.run([dice.d6, dice.d4], [dice.d8]),
      simulation.run([dice.d6, dice.d4], [dice.d10, dice.d4]),
      simulation.run([dice.d6, dice.d4], [dice.d12, dice.d6]),
      simulation.run([dice.d6, dice.d4], [dice.d20, dice.d8])
    ]),
    createTableRow('1d6,1d6', [
      simulation.run([dice.d6, dice.d6], [dice.d4]),
      simulation.run([dice.d6, dice.d6], [dice.d6]),
      simulation.run([dice.d6, dice.d6], [dice.d8]),
      simulation.run([dice.d6, dice.d6], [dice.d10, dice.d4]),
      simulation.run([dice.d6, dice.d6], [dice.d12, dice.d6]),
      simulation.run([dice.d6, dice.d6], [dice.d20, dice.d8])
    ]),
    createTableRow('1d8,1d6', [
      simulation.run([dice.d8, dice.d6], [dice.d4]),
      simulation.run([dice.d8, dice.d6], [dice.d6]),
      simulation.run([dice.d8, dice.d6], [dice.d8]),
      simulation.run([dice.d8, dice.d6], [dice.d10, dice.d4]),
      simulation.run([dice.d8, dice.d6], [dice.d12, dice.d6]),
      simulation.run([dice.d8, dice.d6], [dice.d20, dice.d8])
    ]),
    createTableRow('1d8,1d8', [
      simulation.run([dice.d8, dice.d8], [dice.d4]),
      simulation.run([dice.d8, dice.d8], [dice.d6]),
      simulation.run([dice.d8, dice.d8], [dice.d8]),
      simulation.run([dice.d8, dice.d8], [dice.d10, dice.d4]),
      simulation.run([dice.d8, dice.d8], [dice.d12, dice.d6]),
      simulation.run([dice.d8, dice.d8], [dice.d20, dice.d8])
    ]),
    createTableRow('1d10,1d8', [
      simulation.run([dice.d10, dice.d8], [dice.d4]),
      simulation.run([dice.d10, dice.d8], [dice.d6]),
      simulation.run([dice.d10, dice.d8], [dice.d8]),
      simulation.run([dice.d10, dice.d8], [dice.d10, dice.d4]),
      simulation.run([dice.d10, dice.d8], [dice.d12, dice.d6]),
      simulation.run([dice.d10, dice.d8], [dice.d20, dice.d8])
    ]),
    createTableRow('1d10,1d10,1d6', [
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d4]),
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d6]),
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d8]),
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d10, dice.d4]),
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d12, dice.d6]),
      simulation.run([dice.d10, dice.d10, dice.d6], [dice.d20, dice.d8])
    ])
  ]);
}

function createTableRow(playerDiceString, results) {
  return [playerDiceString, ...results.map(formatResults)];
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
