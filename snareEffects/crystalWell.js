/**
 * Crystal Well — Snare
 *
 * Trigger: When any opponent adds 1+ cards to their hand from elsewhere
 * (discard recovery, bounce from board). The opponent must have at least
 * 1 OTHER card in their hand besides the newly added ones.
 *
 * Effect: That opponent picks min(hand size, cards added) from their
 * OTHER hand cards → transferred to Crystal Well owner's hand, revealed.
 * Picker is uncancellable and reconnect-persistent.
 * Animation: Colorful gems springing up like a fountain.
 */
export default {
  checkTrigger(trigger, ownerId) {
    if (trigger.type !== 'cards-added-to-hand') return false;
    // Only trigger for opponents
    if (trigger.targetPlayerId === ownerId) return false;
    // Must have other cards in hand
    return trigger.otherHandCount > 0;
  },

  effect: {
    type: 'crystal-well-steal',
  },
};
