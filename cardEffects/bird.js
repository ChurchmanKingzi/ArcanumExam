/**
 * Bird — Attacks 1 target for damage equal to Bird's current HP.
 */
export default function bird(familiar) {
  return {
    targetsNeeded: 1,
    damage: familiar.currentHp || 0,
    minLivingTargets: 1,
  };
}
