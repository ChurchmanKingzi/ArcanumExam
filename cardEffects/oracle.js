/**
 * Oracle — Declare a card type, pick a card from an opponent's hand.
 * If the type matches, add it to your hand.
 * Fizzles if no opponent has cards.
 */
export default function oracle(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  let anyOpponentHasCards = false;
  for (const [pid, p] of room.players) {
    if (p.left || pid === player.id) continue;
    if ((p.hand || []).length > 0) { anyOpponentHasCards = true; break; }
  }

  if (!anyOpponentHasCards) return null;

  return {
    effectType: 'oracle-guess',
  };
}
