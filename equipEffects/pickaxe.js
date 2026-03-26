/**
 * Pickaxe — Passive equip.
 *
 * Whenever an EFFECT (not a cost) would prompt the owning player to discard
 * one or more cards, they get a timed "Skip discarding?" pop-up (default Yes).
 *
 * Covered effects:
 *   - Country Harpy / any familiar with opponentAction 'force-discard'  → awaiting-discard
 *   - Angler Angel self-discard, copied effects                          → self-discard
 *   - Golden Hind upkeep discard                                         → golden-hind-upkeep
 *   - Hat of Madness post-attack discard                                 → awaiting-discard
 *
 * Boolean — 1 Pickaxe is sufficient; multiple Pickaxes = same as one.
 * Unlimited — every triggered forced discard gets the skip prompt.
 * Covers discards triggered by opponents targeting the Pickaxe owner.
 *
 * Server: hasPickaxe() sets pa.pickaxeSkippable on each relevant PA.
 *         pickaxe:skip handler advances or clears the PA without discarding.
 * Client: showPickaxeSkipPrompt() intercepts the three discard targetingMode
 *         assignments; timer defaults to Yes after 10 s.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
