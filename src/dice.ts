export interface Dice {
  min: number;
  max: number;
  roll: () => number;
}

function createDice(numSides: number): Dice {
  return {
    min: 1,
    max: numSides,
    roll: () => Math.floor(Math.random() * numSides) + 1
  };
}

const dice = {
  d4: createDice(4),
  d6: createDice(6),
  d8: createDice(8),
  d10: createDice(10),
  d12: createDice(12),
  d20: createDice(20)
};

export default dice;
