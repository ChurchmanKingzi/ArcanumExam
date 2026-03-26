/**
 * Skeleton Mage — Chosen opponent picks a Spell from their discard.
 * Pay its Cost, then resolve the Spell as if you cast it.
 * Fizzles if no opponent has affordable Spells in discard.
 */
export default function skeletonMage(familiar, context) {
  const player = context.player;
  const room = context.room;
  if (!player || !room) return null;

  const handSize = (player.hand || []).length;
  for (const [, p] of room.players) {
    if (p.left || p === player) continue;
    const hasAffordableSpell = (p.discardPile || []).some(
      c => c.type === 'Spell' && (c.cost || 0) <= handSize
    );
    if (hasAffordableSpell) {
      return { effectType: 'mage-spell' };
    }
  }

  return null;
}
