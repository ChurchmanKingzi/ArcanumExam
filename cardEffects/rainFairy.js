/**
 * Rain Fairy — Active: Grant "Rain's Blessing" to any target (half damage, rounded up).
 * Passive: All targets the Rain Fairy's owner controls take 0 poison damage.
 */
export default function rainFairy(familiar, context) {
  return {
    effectType: 'rains-blessing-target',
    targetsNeeded: 1,
  };
}
