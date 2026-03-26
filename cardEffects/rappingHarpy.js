/**
 * Rapping Harpy — Deal damage equal to 2× the number of living targets
 * the TARGET's owner controls (their student if alive + their living familiars).
 * Damage is calculated at resolution time based on the chosen target.
 */
export default function rappingHarpy(familiar, context) {
  const room = context.room;
  if (!room) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 0, // placeholder — real damage computed per-target at resolution
    damagePerTargetOwnerLiving: 2, // multiplier × target owner's living count
    minLivingTargets: 1,
  };
}
