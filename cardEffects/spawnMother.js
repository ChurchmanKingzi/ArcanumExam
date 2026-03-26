/**
 * The Spawn Mother — Select any living student with HP > 1 (not Shy Girl protected).
 * Halve its HP (rounded up, NOT damage). The student then gains damage immunity
 * for the rest of the round.
 * Fizzles if no valid student targets exist.
 */
export default function spawnMother(familiar, context) {
  return {
    effectType: 'spawn-mother',
  };
}
