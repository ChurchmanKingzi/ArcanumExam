/**
 * Rain Viola — When this card is moved from the board to anywhere else:
 * Add 1 card from your discard pile to your hand.
 */
export default {
  onDestroyed: true,
  onReturnedToHand: true,
  effect: {
    type: 'pick-from-discard',
  },
};
