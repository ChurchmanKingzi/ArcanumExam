/**
 * Corrupted Shark — Attacks 1 target for 8 damage.
 * If the target is killed, the owner's student immediately
 * performs a bonus (non-cancellable) attack.
 */
export default function corruptedShark(familiar, context) {
  return {
    targetsNeeded: 1,
    damage: 8,
    minLivingTargets: 1,
    bonusOnKill: 'student-attack',
  };
}
