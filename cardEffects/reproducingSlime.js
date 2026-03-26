/**
 * Reproducing Slime — Active: Deal 4 damage to any one target.
 * Passive: At end of each round, each alive Reproducing Slime spawns
 * a copy of itself (full HP, untapped). Growth is exponential.
 */
export default function reproducingSlime(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 4,
  };
}
