/**
 * Golden Ladybug — Steal a Snare from any opponent's discard pile.
 * The stolen Snare is revealed to all players, then placed face-down
 * among the player's own Snares.
 * Fizzles if no opponent has any Snares in their discard pile.
 */
export default function goldenLadybug(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const discardSnares = [];
  for (const [pid, p] of room.players) {
    if (p.left || pid === player.id) continue; // skip own discard
    (p.discardPile || []).forEach((card, i) => {
      if (card.type === 'Snare') {
        discardSnares.push({ ownerPlayerId: pid, ownerName: p.name, discardIndex: i, card });
      }
    });
  }

  if (discardSnares.length === 0) return null;

  return {
    effectType: 'steal-snare',
    discardSnares,
  };
}
