/**
 * Inverted Levitation — Snare
 *
 * Trigger: A damaged target (currentHP < maxHP) takes damage and survives.
 * The snare prompt fires retroactively after damage is applied.
 *
 * Effect: Undoes the damage on surviving damaged targets and converts it
 * to healing instead (capped at max HP).
 *
 * Animation: The target rising up, flipping 180° mid-air, staying, then
 * flipping back and descending.
 */
export default {
  checkTrigger(trigger) {
    return trigger.type === 'damaged-target-took-damage';
  },

  effect: {
    type: 'inverted-levitation-convert',
  },
};
