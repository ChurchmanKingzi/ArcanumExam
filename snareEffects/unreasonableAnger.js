/**
 * Unreasonable Anger — Snare
 *
 * Trigger: When ANY Student takes ANY amount of damage (from any source).
 * This includes the snare owner's own Student.
 *
 * Effect: The damaged Student's ATK stat is permanently increased by +5
 * (directly modifies currentAtk, similar to Scimitar's permanent bonus).
 *
 * Animation: The Student's card is tinted red for ~3 seconds while white
 * steam particles rise from it, indicating rage.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'student-damaged') return false;
    // Trigger for ANY student taking damage — including the owner's own
    return true;
  },

  effect: {
    type: 'unreasonable-anger-atk-buff',
  },
};
