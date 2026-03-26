/**
 * Burned Contract — Item.
 *
 * Eligible only when at least 1 living Familiar exists on the board.
 * Prompts the caster to select any living Familiar (any controller).
 * That Familiar is killed (no damage) and sent to its owner's discard pile.
 * A position-snapshotted flame engulf animation plays at the target's former location.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
