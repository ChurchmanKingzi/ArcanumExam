/**
 * Letter of Lies — Snare
 *
 * Trigger: An opponent selects exactly 1 target for any effect (spell, attack,
 * familiar effect). Must have at least 1 alternative legal target.
 * Similar to Friendly Fireball but for ALL targeting effects, not just spells.
 *
 * Effect: The LoL owner picks a new target from the legal alternatives.
 *
 * Trigger types matched:
 *   - spell-targeting: single-target spell (Phase 1, same as FF)
 *   - effect-targeting: non-spell single-target effect (attack, familiar effect)
 */
export default {
  checkTrigger(trigger, ownerId) {
    // Spell targeting (Phase 1) — same timing as Friendly Fireball
    if (trigger.type === 'spell-targeting') {
      if (trigger.sourcePlayerId === ownerId) return false;
      // Must have at least 1 alternative target (computed in trigger)
      return (trigger._letterOfLiesAlternatives || []).length > 0;
    }
    // Non-spell effect targeting (attacks, familiar effects)
    if (trigger.type === 'effect-targeting') {
      if (trigger.sourcePlayerId === ownerId) return false;
      return (trigger._letterOfLiesAlternatives || []).length > 0;
    }
    return false;
  },

  effect: {
    type: 'letter-of-lies-redirect',
  },
};
