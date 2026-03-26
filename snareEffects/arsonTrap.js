/**
 * Arson Trap — Snare
 *
 * Trigger: Whenever any target(s) are Energized through any effect.
 *
 * Effect: All Students among the Energized targets take 10 damage,
 * all Familiars among them are killed instantly (same immunity checks
 * as Burned Contract: Class Pet, Mech, Dream Dust, Golden Hind, summoned skip).
 * Animation: flames engulfing each Energized target.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'target-energized';
  },

  effect: {
    type: 'arson-burn',
  },
};
