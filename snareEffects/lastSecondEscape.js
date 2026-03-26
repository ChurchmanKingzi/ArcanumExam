/**
 * Last Second Escape — Snare
 *
 * Trigger: The owner's Student would die from damage (HP drops to 0).
 * Uses the same trigger as Inverted Levitation (damaged-target-took-damage)
 * so both snares appear in the same prompt if both are on the board.
 *
 * Effect: The lethal damage is fully negated — Student returns to pre-damage HP.
 * Any additional effects from that source on the Student are also negated.
 * Other targets from the same source are still affected normally.
 * All costs (tap, spell card, item usage) are still consumed.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'damaged-target-took-damage') return false;
    // Only trigger if the owner's student would die
    return (trigger.pendingTargets || []).some(t =>
      t.type === 'student' && t.wouldDie && t.playerId === ownerId
    );
  },

  effect: {
    type: 'last-second-escape',
  },
};
