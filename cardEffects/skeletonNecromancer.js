/**
 * Skeleton Necromancer — Summon a student from your discard pile.
 * Replaces the Necromancer in its familiar slot.
 * Fizzles if no Student cards in discard.
 */
export default function skeletonNecromancer(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const hasStudent = (player.discardPile || []).some(c => c.type === 'Student');
  if (!hasStudent) return null;

  return { effectType: 'necromancer-summon' };
}
