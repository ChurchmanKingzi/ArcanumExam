/**
 * Crying Seagulls — Active (tap): Choose a Spell from any player's discard pile
 * and add it to your hand. Taps for no effect if no discard piles contain Spells.
 *
 * Passive (global): While alive on the board, ALL student attack damage
 * is treated as spell damage instead of attack damage.
 */
export default function cryingSeagulls(familiar, context) {
  return {
    effectType: 'seagull-spell-recover',
  };
}
