/**
 * Bucket Prank — Snare
 *
 * Trigger: An opponent uses any Item from their hand which costs
 * an Item usage (NOT reactive/on-discard items like Treasure Chest).
 *
 * Effect: The Item gets negated (cost still paid) and sent to discard.
 * Animation: A big bucket falling onto the user's Student.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'item-used-by-opponent') return false;
    return trigger.sourcePlayerId !== ownerId;
  },

  effect: {
    type: 'negate-item',
  },
};
