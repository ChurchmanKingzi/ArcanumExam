/**
 * Skeleton Archer — Deal 4 damage, or 8 if the target is at full HP.
 */
export default function skeletonArcher(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 4,
    damageIfTargetFull: 8,
    minLivingTargets: 1,
  };
}
