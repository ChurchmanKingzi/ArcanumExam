/**
 * Eclipse — Snare
 *
 * Trigger: Any opponent plays a card or activates a snare with a cost
 * ≤ (Eclipse owner's hand size - Eclipse's base cost).
 *
 * Effect: The played card/snare is negated and sent to discard.
 * Eclipse's activation cost = baseCost + negated card's cost.
 *
 * Animation: Full moon covered by lunar eclipse.
 */
export default {
  checkTrigger(trigger, ownerId, room) {
    if (trigger.type !== 'card-played-by-opponent') return false;
    if (trigger.cardPlayerId === ownerId) return false;
    const player = room.players.get(ownerId);
    if (!player) return false;
    // Find this player's face-down Eclipse to get its base cost
    const eclipseSnare = (player.snares || []).find(s => s.name === 'Eclipse' && !s.faceUp);
    if (!eclipseSnare) return false;
    const baseCost = eclipseSnare.cost || 0;
    const cardCost = trigger.cardCost || 0;
    // Can afford: baseCost + cardCost <= hand size
    return (baseCost + cardCost) <= (player.hand || []).length;
  },

  // Dynamic cost — overridden in startSnareReaction
  effect: {
    type: 'eclipse-negate',
  },
};
