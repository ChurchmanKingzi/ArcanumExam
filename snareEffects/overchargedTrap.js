/**
 * Overcharged Trap — Snare
 *
 * Trigger: This Snare is removed from the board by any effect
 * (same trigger condition as Bluff).
 *
 * Effect: The owner picks any target on the board and deals 15 damage
 * to it. If the target is untapped, it also gets tapped.
 *
 * Note: Unlike normal snares, this does NOT use the standard
 * startSnareReaction flow. It uses the snare-removal intercept
 * mechanism (checkSnareRemovalIntercepts), same as Bluff.
 */
export default {
  checkTrigger() {
    // Never triggers via startSnareReaction — handled by checkOverchargedTrapIntercept
    return false;
  },

  effect: {
    type: 'overcharged-trap',
  },
};
