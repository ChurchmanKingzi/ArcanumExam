/**
 * Coatl — Active: Choose a Proctor → earn its approval at end of NEXT round.
 * Passive: Owner's student HP cannot drop below 1 from damage.
 */
export default function coatl(familiar, context) {
  return { effectType: 'coatl-mark' };
}
