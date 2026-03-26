/**
 * Undurdle — Active: Deal 2 damage to any 1 target (excluding itself).
 * Passive: Whenever any Familiar dies, Undurdle's controller is prompted to
 * recover a Familiar from their own discard pile to hand (optional, cancellable).
 * Triggers once per alive Undurdle, once per individual death.
 * Passive handled server-side in processFamiliarDeath.
 */
export default function undurdle(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 2,
    targetsNeeded: 1,
  };
}
