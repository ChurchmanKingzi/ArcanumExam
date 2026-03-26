/**
 * Gorgon Sister — Active: Tap + Petrify any untapped familiar or student on the board (except herself).
 * Petrified targets cannot be Energized until end of round.
 * Passive: When this Gorgon Sister dies, all targets she petrified lose Petrified AND become untapped.
 */
export default function gorgonSister(familiar, context) {
  return {
    effectType: 'petrify-target',
  };
}
