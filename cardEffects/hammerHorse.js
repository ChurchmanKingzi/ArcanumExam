/**
 * Hammer Horse — Activate an Item from your discard pile by paying its cost.
 * Shows picker of affordable Items. Fizzles if none exist.
 */
export default function hammerHorse(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const discardItems = [];
  (player.discardPile || []).forEach((card, i) => {
    if (card.type === 'Item' && (card.cost || 0) <= (player.hand || []).length) {
      discardItems.push({ discardIndex: i, card });
    }
  });

  if (discardItems.length === 0) return null;

  return {
    effectType: 'revive-item',
    discardItems,
  };
}
