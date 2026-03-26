/**
 * Crimson Web — Snare
 *
 * Trigger: When an opponent discards a Familiar from their hand to the
 * discard pile (as cost or by effect).
 *
 * Effect: That Familiar is brought into play tapped under the Crimson Web
 * user's control. If 2+ Familiars are simultaneously discarded, the user
 * selects 1 of them.
 * Animation: Red spiderweb covering the discard pile, spreading out.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'familiar-discarded-from-hand') return false;
    // Only trigger for opponent discards
    return trigger.discardPlayerId !== ownerId;
  },

  effect: {
    type: 'crimson-web-steal',
  },
};
