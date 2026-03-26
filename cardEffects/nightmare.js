/**
 * Nightmare — Blocks all players from casting Spells until the next round.
 */
export default function nightmare(familiar) {
  return {
    effectType: 'no-spells',
  };
}
