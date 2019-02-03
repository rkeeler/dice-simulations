import { table } from 'table';

export function getPercent(numSuccess: number, total: number) {
  return numSuccess / total;
}

export function formatPercent(decimalPercent) {
  const percent = decimalPercent * 100;
  return `${percent.toFixed(0)}%`;
}

export function logTable(data, config = {}) {
  console.log(table(data, config));
}
