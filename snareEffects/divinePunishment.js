/**
 * Divine Punishment — Snare
 *
 * Trigger: An opponent would win the game by their Student reaching
 * its Escape condition.
 *
 * Effect: That escape condition is permanently negated. The Student
 * gains a "Divine Intervention" buff — at the end of the next Round,
 * if still alive, the Student's owner wins the game.
 *
 * Animation: Red lightning flashes raining down on the Student.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'player-would-win-by-escape') return false;
    // Only trigger for opponents winning
    return trigger.winnerPlayerId !== ownerId;
  },

  effect: {
    type: 'divine-punishment-negate',
  },
};
