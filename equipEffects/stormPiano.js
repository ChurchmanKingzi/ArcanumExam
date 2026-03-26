/**
 * Storm Piano — When removed from the board:
 * Choose any Familiar in play and return it to its owner's hand.
 */
export default {
  onDestroyed: true,
  onReturnedToHand: true,
  effect: {
    type: 'bounce-familiar',
  },
};
