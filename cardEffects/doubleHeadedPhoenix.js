/**
 * Double-Headed Phoenix — Revives a Familiar from the owner's discard pile.
 * The revived familiar is added to the board at full HP, ignoring cost.
 */
export default function doubleHeadedPhoenix(familiar, context) {
  // Check if player has any Familiars in their discard pile
  const discardFamiliars = (context.player?.discardPile || [])
    .filter(c => c.type === 'Familiar');
  if (discardFamiliars.length === 0) return null;

  return {
    effectType: 'revive-familiar',
  };
}
