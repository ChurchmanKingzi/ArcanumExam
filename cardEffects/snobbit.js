/**
 * Snobbit — Select up to N cards from own discard (N = min(3, max opponent discard size)),
 * then select an opponent with at least that many discard cards,
 * then select the same number from opponent's discard. All selected cards are deleted (removed from game).
 * Fizzles if player has 0 discard or no opponent has any discard.
 */
export default function snobbit(familiar, context) {
  const player = context.player;
  if (!player) return null;

  // Need cards in own discard
  if ((player.discardPile || []).length === 0) return null;

  // Need at least one opponent with cards in discard
  const room = context.room;
  let maxOppDiscard = 0;
  if (room && room.players) {
    for (const [pid, p] of room.players) {
      if (p.left || pid === player.id) continue;
      maxOppDiscard = Math.max(maxOppDiscard, (p.discardPile || []).length);
    }
  }
  if (maxOppDiscard === 0) return null;

  return {
    effectType: 'snobbit',
    maxSelect: Math.min(3, maxOppDiscard),
  };
}
