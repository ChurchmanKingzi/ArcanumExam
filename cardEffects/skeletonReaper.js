/**
 * Skeleton Reaper — Deals 4 damage to 1 target Familiar (not students).
 * If the target dies, the effect immediately triggers again (non-cancellable).
 * Chains indefinitely until a target survives or no Familiars remain.
 * Fizzles if no other living Familiars exist on the board.
 */
export default function skeletonReaper(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const selfOwnerId = context.familiarOwnerId || player.id;

  // Count other living familiars (excluding self)
  let otherFamCount = 0;
  for (const [pid, p] of room.players) {
    if (p.left) continue;
    for (let i = 0; i < (p.familiars || []).length; i++) {
      const f = p.familiars[i];
      if (f.currentHp <= 0) continue;
      if (pid === selfOwnerId && i === context.familiarIndex) continue;
      otherFamCount++;
    }
  }

  if (otherFamCount === 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 4,
    familiarsOnly: true,
    chainOnKill: true,
  };
}
