/**
 * Mummy Guards — Active: Deal 6 damage to any one target, then apply "Cursed" debuff.
 * Passive: While alive, locks all discard piles — Familiar cards cannot leave them.
 */
export default function mummyGuards(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 6,
    applyCurse: true,
  };
}
