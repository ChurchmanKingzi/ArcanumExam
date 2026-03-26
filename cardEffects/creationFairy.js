/**
 * Creation Fairy — Active (tap): Select an opponent → swap discard piles.
 * Passive (on death): Controller picks a card from discard pile to add to hand.
 */
export default function creationFairy(familiar, context) {
  return {
    effectType: 'select-opponent',
    opponentAction: 'swap-discard',
    maxTargets: 1,
  };
}
