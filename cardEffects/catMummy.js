/**
 * Cat Mummy — Active: Deal 2 damage to any 1 target.
 * Passive: At end of each round, all Cat Mummy cards in all discard piles
 * return to their owners' hands (server-side, before proctor/escape checks).
 */
export default function catMummy(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 2,
    targetsNeeded: 1,
  };
}
