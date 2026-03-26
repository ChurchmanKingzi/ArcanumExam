/**
 * Anti Magic Shield — Snare
 *
 * Trigger: A Spell is about to affect exactly 1 target (Familiar or Student),
 * whether as damage or a non-damage effect (e.g. tapping).
 * Can protect any player's target, including the snare owner's own.
 *
 * Phase: spell-resolving (Phase 2) — fires AFTER the spell animation
 * has played and any Friendly Fireball redirect has been resolved.
 *
 * Effect: The single-target Spell is negated — no damage, no effects.
 * The Spell card is still consumed and the caster's turn is still used.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'spell-resolving';
  },

  effect: {
    type: 'negate-spell',
  },
};
