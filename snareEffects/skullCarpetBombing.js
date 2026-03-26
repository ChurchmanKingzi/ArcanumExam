/**
 * Skull Carpet Bombing — Snare
 *
 * Trigger: An opponent summons a Familiar (same as Kidnapping:
 * 'familiar-summoned', opponent only).
 *
 * Effect (DELAYED): At the end of that Round, all targets the
 * summoning player controls take 5 damage.
 *
 * The delayed effect is registered on room._skullCarpetBombingQueue
 * and resolved in continueEndOfRoundAfterLooming before poison.
 *
 * Animation: A rain of skulls descending on the opponent's entire
 * board, exploding on impact.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-summoned') return false;
    // Only trigger for opponent summons
    return trigger.summonerPlayerId !== ownerId;
  },

  effect: {
    type: 'skull-carpet-bombing-register',
  },
};
