/**
 * Potion of Greed — Snare
 *
 * Trigger: When an opponent adds any cards (1+) from any discard pile
 * to their hand, and the Potion of Greed owner has 2+ cards in their
 * own discard pile.
 *
 * Effect: The Potion of Greed owner picks exactly 2 cards from their
 * own discard pile to add to their hand.
 *
 * Animation: The snare card's image appears center-screen, grows
 * rapidly while fading out.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'opponent-recovered-from-discard') return false;
    if (trigger.recoveryPlayerId === ownerId) return false;
    // Owner must have 2+ cards in their own discard pile
    const owner = room.players.get(ownerId);
    if (!owner) return false;
    return (owner.discardPile || []).length >= 2;
  },

  effect: {
    type: 'potion-of-greed-pick',
  },
};
