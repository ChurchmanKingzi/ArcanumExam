/**
 * The Stink Pile — Snare
 *
 * Trigger: An opponent would win the game by completing their Student's
 * Escape plan (same condition as Divine Punishment).
 *
 * Effect: The would-be winner's Student is permanently afflicted with the
 * "Stinky" debuff. While Stinky, the Student cannot win by Escaping.
 * Tooltip: "This Student smells awful — there is no escape!"
 *
 * However, when the Stink Pile user wins the game in any way, all Stinky
 * debuffs they applied are cleared. If winner slots remain, the freed
 * players also win immediately.
 *
 * Animation: A sea of poop emojis engulfs the affected Student.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'player-would-win-by-escape') return false;
    // Only trigger for opponents winning
    return trigger.winnerPlayerId !== ownerId;
  },

  effect: {
    type: 'stink-pile-debuff',
  },
};
