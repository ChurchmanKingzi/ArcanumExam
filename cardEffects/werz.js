/**
 * Werz — Swap a card from own hand with a blind-picked card from an opponent's hand.
 * Fizzles if player has no hand cards or no opponent has hand cards.
 */
export default function werz(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  if ((player.hand || []).length === 0) return null;

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
    effectType: 'werz-swap',
  };
}
