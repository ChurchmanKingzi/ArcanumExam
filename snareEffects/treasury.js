/**
 * Treasury — Snare
 *
 * Trigger: When any opponent adds 1+ cards from any discard pile to
 * their hand (same trigger as Skull Bomb Trap:
 * 'opponent-recovered-from-discard').
 *
 * Effect: The recovered cards are removed from the opponent's hand
 * and added to the Treasury owner's hand instead. The cards remain
 * revealed to all players.
 *
 * Animation: Gold coins raining down from the top of the screen.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'opponent-recovered-from-discard') return false;
    // Only trigger for opponents' recovery
    if (trigger.recoveryPlayerId === ownerId) return false;
    return true;
  },

  effect: {
    type: 'treasury-steal',
  },
};
