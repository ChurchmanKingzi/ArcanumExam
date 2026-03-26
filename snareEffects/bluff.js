/**
 * Bluff — Snare
 *
 * Trigger: Automatically activates when an effect would remove it
 * from the board (destroy or bounce). Does NOT use the normal snare
 * reaction system — instead uses checkBluffIntercept() at removal points.
 *
 * Effect: Owner gets an untimed, game-stopping dialogue to select
 * up to 3 untapped Students/Familiars. Selected targets show panicked
 * emotes, then get tapped. Cancellable (cancel = no effect, snare still discarded).
 */
export default {
  checkTrigger() { return false; }, // never triggers via normal snare reaction
  effect: { type: 'bluff' },
  isBluff: true, // marker for checkBluffIntercept
};
