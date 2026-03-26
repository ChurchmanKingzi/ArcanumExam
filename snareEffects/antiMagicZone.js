/**
 * Anti Magic Zone — Snare
 *
 * Trigger: A Spell is about to affect 1 or more targets (Student or Familiar).
 * This includes all spells that Anti Magic Shield reacts to (without conditional
 * restrictions) plus multi-target AoE spells.
 *
 * Phase: spell-resolving (Phase 2) — fires AFTER the spell animation
 * has played and any Friendly Fireball redirect has been resolved.
 *
 * Effect: The snare owner picks a player whose targets are being affected.
 * All targets that player controls are completely unaffected by the spell.
 * Requires a custom player picker UI (can include self).
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'spell-resolving' || trigger.type === 'spell-multi-target';
  },

  effect: {
    type: 'pick-player-zone',
    requiresTargeting: true,
  },
};
