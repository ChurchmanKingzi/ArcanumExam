/**
 * Infected Pests — Select one opponent. ALL targets that opponent
 * controls are afflicted with 1 stack of Poison.
 */
export default function infectedPests(familiar, context) {
  return {
    effectType: 'select-opponent',
    maxTargets: 1,
    opponentAction: 'poison-all',
    poisonStacks: 1,
  };
}
