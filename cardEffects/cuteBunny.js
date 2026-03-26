/**
 * Cute Bunny — Active: Summon 1 Familiar from hand (paying its cost).
 *
 * The player must pick exactly 1 Familiar from their hand whose cost
 * (after Transfer Student reduction) ≤ remaining hand size − 1.
 * This does NOT tap the student — only Cute Bunny's tap is consumed.
 * A Familiar MUST be summoned (no cancellation).
 *
 * Passive (handled in server.js / discardFromHand):
 * Once per round, when the owner discards a Familiar from hand,
 * they may retrieve one of the discarded Familiars back to hand.
 */
export default function cuteBunny(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const handSize = player.hand.length;
  if (handSize === 0) return null;

  // Budget = hand cards remaining after removing the familiar to summon
  const budget = handSize - 1;

  // Transfer Student reduction (check primary + summoned)
  const hasTransfer =
    (player.chosenStudent?.name === 'The Transfer Student' && !player.studentDead && !player.won) ||
    (player.familiars || []).some(f => f.summoned && f.name === 'The Transfer Student' && (f.currentHp || 0) > 0);
  const costReduction = hasTransfer ? 1 : 0;

  // Prodigy can ignore cost entirely
  const prodigyCanIgnore = player.prodigyChargeReady;

  // Check if at least one affordable Familiar exists in hand
  for (const card of player.hand) {
    if (card.type !== 'Familiar') continue;
    const effectiveCost = Math.max(0, (card.cost || 0) - costReduction);
    if (effectiveCost <= budget || prodigyCanIgnore) {
      return {
        effectType: 'cute-bunny-summon',
        effectLabel: '🐰 Summon',
      };
    }
  }

  return null;
}
