/**
 * Dwarf Smith — Recovers an Equip from the owner's discard pile.
 * The player must pay the cost from hand cards.
 * Only Equips affordable with current hand size are offered.
 * Fizzles if student has been removed from the game (won).
 */
export default function dwarfSmith(familiar, context) {
  const player = context.player;
  if (!player) return null;

  // Fizzles if student removed from game (won)
  if (player.won) return null;

  const handSize = (player.hand || []).length;
  const discardEquips = (player.discardPile || [])
    .map((card, i) => ({ discardIndex: i, card }))
    .filter(({ card }) => card.type === 'Equip' && (card.cost || 0) <= handSize);

  if (discardEquips.length === 0) return null;

  return {
    effectType: 'revive-equip',
    discardEquips,
  };
}
