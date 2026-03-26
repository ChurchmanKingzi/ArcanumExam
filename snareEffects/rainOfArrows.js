/**
 * Rain of Arrows — Snare
 *
 * Trigger: A Familiar the Snare owner controls takes damage from any
 * source and survives (currentHp > 0 after damage).
 *
 * Effect (requiresTargeting): Owner selects an opponent. All targets
 * that opponent controls take damage equal to 2 × the number of
 * living Familiars the Snare owner currently has.
 *
 * Animation: Hundreds of arrows raining down on the target player's
 * entire board.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'own-familiar-survived-damage') return false;
    return trigger.familiarOwnerId === ownerId;
  },

  effect: {
    type: 'rain-of-arrows-damage',
    requiresTargeting: true,
  },
};
