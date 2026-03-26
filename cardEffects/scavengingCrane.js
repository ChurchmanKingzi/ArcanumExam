/**
 * Scavenging Crane — Swap a card from your hand with a card from your discard pile.
 * Fizzles if discard pile is empty.
 */
export default function scavengingCrane(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const hasDiscard = (player.discardPile || []).length > 0;
  if (!hasDiscard) return null;

  return {
    effectType: 'scavenge',
  };
}
