/**
 * Little Spooder — Recover a Snare from own discard pile.
 * The recovered Snare is revealed to all players, then placed face-down.
 * Fizzles if no Snares in own discard.
 */
export default function littleSpooder(familiar, context) {
  const player = context.player;
  if (!player) return null;

  const discardSnares = [];
  (player.discardPile || []).forEach((card, i) => {
    if (card.type === 'Snare') {
      discardSnares.push({ discardIndex: i, card });
    }
  });

  if (discardSnares.length === 0) return null;

  return {
    effectType: 'recover-snare',
    discardSnares,
  };
}
