/**
 * Toxic Trap — Snare
 *
 * Trigger: Owner's student takes any damage (from any source).
 * Effect: Owner selects one opponent. All targets that opponent
 * controls (student + familiars) gain 1 stack of Poison.
 * The snare is NOT flipped until the opponent is selected;
 * cancelling during selection cancels the activation entirely.
 */
export default {
  checkTrigger(trigger, ownerId) {
    return trigger.type === 'student-damaged'
      && trigger.targetPlayerId === ownerId;
  },

  effect: {
    type: 'pick-opponent-poison',
    requiresTargeting: true,
    poisonStacks: 1,
  },
};
