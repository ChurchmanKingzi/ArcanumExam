/**
 * Boiling Oil — Snare
 *
 * Trigger: When the last untapped target a player controls gets tapped.
 *
 * Effect: ALL targets that player controls are simultaneously Energized
 * (untapped + 5 damage each). Can trigger Arson Trap on all of them.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'last-target-tapped';
  },

  effect: {
    type: 'boiling-oil-energize',
  },
};
