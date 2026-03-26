/**
 * Pengu — Swap this Familiar with a Familiar from your discard pile
 * (except "Pengu"), without paying its Cost. That Familiar comes into play Ready.
 */
export default function pengu(familiar, context) {
  const discardFamiliars = (context.player?.discardPile || [])
    .filter(c => c.type === 'Familiar' && c.name !== 'Pengu');
  if (discardFamiliars.length === 0) return null;

  return {
    effectType: 'swap-familiar',
  };
}
