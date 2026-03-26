/**
 * Copy Device — Item.
 *
 * Eligible only when at least 1 discard pile (any player) holds at least 1 Item.
 * Presents the activator with a list of all eligible Items from all discard piles.
 * The chosen Item is resolved immediately for FREE (no cost paid).
 * The original card stays in its owner's discard pile — it is copied, not taken.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
