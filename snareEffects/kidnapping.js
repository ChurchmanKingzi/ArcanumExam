/**
 * Kidnapping — Snare
 *
 * Trigger: An OPPONENT summons a Familiar (from hand, discard, Reproducing
 * Slime, etc.). Does NOT trigger on the snare owner's own summons.
 *
 * Effect: The summoned Familiar is removed from the board and added to the
 * Kidnapping player's hand (revealed to all other players).
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-summoned') return false;
    // Only trigger for opponent summons
    return trigger.summonerPlayerId !== ownerId;
  },

  effect: {
    type: 'kidnapping-steal',
  },
};
