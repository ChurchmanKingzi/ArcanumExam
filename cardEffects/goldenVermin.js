/**
 * Golden Vermin — Discard a card from own hand, then steal a card from an opponent's hand.
 * Fizzles if player has no cards in hand or no opponent has cards.
 */
export default function goldenVermin(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  if ((player.hand || []).length === 0) return null;

  // Check at least one opponent has cards
  let opponentWithCards = false;
  for (const [pid, p] of room.players) {
    if (p.left || pid === player.id) continue;
    if ((p.hand || []).length > 0) {
      opponentWithCards = true;
      break;
    }
  }

  if (!opponentWithCards) return null;

  return {
    effectType: 'vermin-steal',
  };
}
