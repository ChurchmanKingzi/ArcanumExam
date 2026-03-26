/**
 * Anti Intruder System — Snare
 *
 * Trigger: Any player (including the snare owner!) summons a Familiar
 * in any way (from hand, from discard, via Reproducing Slime, etc.).
 *
 * Effect: The newly summoned Familiar is instantly killed.
 * Uses the same kill logic as Burned Contract (processFamiliarDeath).
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'familiar-summoned';
  },

  effect: {
    type: 'kill-summoned-familiar',
  },
};
