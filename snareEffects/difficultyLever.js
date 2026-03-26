/**
 * Difficulty Lever — Snare
 *
 * Trigger: An opponent would win the game by having accumulated 4+
 * Proctor Approvals at the end of the Round.
 *
 * Effect: The snare owner picks any non-disabled Proctor to permanently
 * disable. That Proctor's approval is stripped from all players.
 * The would-be winner re-checks if they still win.
 * Animation: A huge lever being turned on all screens.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'player-would-win-by-approvals') return false;
    // Only trigger for opponents winning
    return trigger.winnerPlayerId !== ownerId;
  },

  effect: {
    type: 'difficulty-lever-pick',
  },
};
