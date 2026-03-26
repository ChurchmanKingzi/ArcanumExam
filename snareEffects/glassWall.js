/**
 * Glass Wall — Snare
 *
 * Trigger: An opponent's Student confirms an attack (taps to deal damage).
 * This includes normal single-target attacks and The Edgelord's multi-target attack.
 * Does NOT trigger from familiar attacks, spells, items, or other effects.
 *
 * Effect: The attack is negated and fizzles entirely (no damage, no on-hit
 * equip effects). The Student still taps as normal.
 *
 * Animation: A semi-translucent glass barrier appears between the attacker
 * and target(s), then shatters.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'student-attack-confirmed') return false;
    // Only trigger for opponents' student attacks
    return trigger.attackerPlayerId !== ownerId;
  },

  effect: {
    type: 'glass-wall-negate',
  },
};
