/**
 * Thunder Trumpet — When removed from the board:
 * Deal 5 damage to any target.
 */
export default {
  onDestroyed: true,
  onReturnedToHand: true,
  effect: {
    type: 'equip-damage-target',
    damage: 5,
  },
};
