/**
 * Harp-y — Heals 1 target (including self) by X, where X = cards in owner's hand.
 * Fizzles if owner has no cards in hand.
 */
export default function harpy(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const handSize = (player.hand || []).length;
  if (handSize <= 0) return null;

  return {
    effectType: 'heal-target',
    targetsNeeded: 1,
    healAmount: handSize,
    canTargetSelf: true,
  };
}
