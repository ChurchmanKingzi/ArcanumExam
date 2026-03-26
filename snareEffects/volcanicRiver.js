/**
 * Volcanic River — Snare
 *
 * Trigger: When an effect would tap ("Exhaust") ANY target on the board
 * (not restricted to the snare owner's targets — unlike Reflection).
 *
 * Effect: The tap is fully negated (original target is untapped).
 * Then, the snare owner gets a single-target Energize picker
 * (same as Flame Fairy, but not cancellable). The picker only
 * appears if 1+ tapped targets exist on the board; otherwise it
 * auto-aborts.
 *
 * Animation: A wide river of lava flowing across the screen
 * (same layout as Jungle Moat but with molten lava colours).
 */
export default {
  checkTrigger(trigger, ownerId) {
    // Same trigger type as Reflection, but for ANY player's target
    return trigger.type === 'own-target-force-tapped';
  },

  effect: {
    type: 'volcanic-river-negate-and-energize',
  },
};
