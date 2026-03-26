/**
 * Graveworm — Deals damage to 1 target equal to 2× the total number
 * of Familiars in ALL players' discard piles.
 */
export default function graveworm(familiar, context) {
  const room = context.room;
  if (!room) return null;

  let count = 0;
  for (const [, p] of room.players) {
    if (p.left) continue;
    for (const card of (p.discardPile || [])) {
      if (card.type === 'Familiar') {
        // Pawn passive: counts as 2 Familiars
        count += (card.name === 'Pawn' || (card.isClone && card.originalName === 'Pawn')) ? 2 : 1;
      }
    }
  }

  const damage = count * 2;
  if (damage === 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage,
  };
}
