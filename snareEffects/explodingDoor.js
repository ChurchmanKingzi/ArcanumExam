/**
 * Exploding Door — Snare
 *
 * Trigger: Any discard pile has 1 or more cards added to it in any way
 * (as a cost, discarded by an effect, through a Spell resolving,
 * a Familiar dying, etc.).
 *
 * Effect: All cards that would have gone to the discard pile are deleted
 * (removed from the game entirely) instead.
 *
 * Animation: An explosion focused on the respective discard pile.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'cards-entered-discard') return false;
    // Trigger for ANY discard pile (including own)
    return true;
  },

  effect: {
    type: 'exploding-door-delete',
  },
};
