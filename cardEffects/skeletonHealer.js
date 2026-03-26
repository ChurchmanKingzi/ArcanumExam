/**
 * Skeleton Healer — Heal any one target for 10 HP (can target itself).
 */
export default function skeletonHealer(familiar, context) {
  return {
    effectType: 'heal-target',
    targetsNeeded: 1,
    healAmount: 10,
    canTargetSelf: true,
  };
}
