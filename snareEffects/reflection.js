/**
 * Reflection — Snare
 *
 * Trigger: A target the Snare owner controls gets force-tapped by an
 * effect, and at least 1 other untapped, non-immune target exists on
 * the board that could receive the tap instead.
 *
 * Effect: The owner picks an alternative target. The original target
 * is untapped, and the chosen target is tapped instead.
 *
 * Animation: A mirror appears above the original target.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'own-target-force-tapped') return false;
    return trigger.tappedOwnerId === ownerId;
  },

  effect: {
    type: 'reflection-redirect',
  },
};
