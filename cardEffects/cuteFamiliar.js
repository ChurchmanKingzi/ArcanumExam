/**
 * Cute Familiar
 *
 * Active (tap): Kills itself and goes to the discard pile.
 *
 * Passive (handled in server.js / processFamiliarDeath):
 * When Cute Familiar dies (from ANY cause), the player picks a Familiar
 * with cost ≤ 2 from their hand or discard pile (excluding Cute Familiar
 * and Clone). The chosen Familiar is summoned tapped at the same board
 * position, for free.
 */
export default function cuteFamiliar(familiar, context) {
  return {
    effectType: 'cute-familiar-sacrifice',
    effectLabel: '💔 Sacrifice',
  };
}
