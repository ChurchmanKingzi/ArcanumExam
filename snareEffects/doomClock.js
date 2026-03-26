/**
 * Doom Clock — Snare
 *
 * Trigger: Start of a Round when examRound >= 6.
 *
 * Effect: The activating player immediately wins the game.
 * Animation: Giant grandfather clock with skulls, hands moving to 12.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'doom-clock-round-start') return false;
    return trigger.examRound >= 6;
  },

  effect: {
    type: 'doom-clock-win',
  },
};
