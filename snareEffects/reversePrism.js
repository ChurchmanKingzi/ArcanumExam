/**
 * Reverse Prism — Snare
 *
 * Trigger: 2+ targets the Snare owner controls would be hit by the
 * same multi-target effect (damage).
 *
 * Effect: The owner picks one of their affected targets to keep.
 * All their OTHER targets are removed from the effect's target list,
 * while opponents' targets remain unaffected.
 *
 * Animation: Card image appears center-screen, growing and fading.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'reverse-prism-multi-target') return false;
    return trigger.prismOwnerId === ownerId;
  },

  effect: {
    type: 'reverse-prism-pick',
  },
};
