import { getPercent } from './utils';
import { Dice } from './dice';

interface SimulationOptions {
  attempts?: number;
  isSuccess: (playerValue: number[], enemyValue: number[]) => boolean;
  isCrit: (playerValue: number[], enemyValue: number[]) => boolean;
}

class Simulation {
  private attempts: number = 1000000;
  private isSuccess: (playerValue: number[], enemyValue: number[]) => boolean;
  private isCrit: (playerValue: number[], enemyValue: number[]) => boolean;

  constructor(options: SimulationOptions) {
    if (options.attempts) {
      this.attempts = options.attempts;
    }

    this.isSuccess = options.isSuccess;
    this.isCrit = options.isCrit;
  }

  public run(playerDice: Dice[], enemyDice: Dice[]) {
    let successCount = 0;
    let critCount = 0;

    for (let i = 0; i < this.attempts; i++) {
      const playerValues = playerDice.map(dice => dice.roll());
      const enemyValues = enemyDice.map(dice => dice.roll());

      const isCrit = this.isCrit(playerValues, enemyValues);

      if (isCrit) {
        critCount += 1;
      }

      if (isCrit || this.isSuccess(playerValues, enemyValues)) {
        successCount += 1;
      }
    }

    const successPercent = getPercent(successCount, this.attempts);
    const critPercent = getPercent(critCount, this.attempts);

    return {
      successCount,
      critCount,
      successPercent,
      critPercent
    };
  }
}

export default Simulation;
