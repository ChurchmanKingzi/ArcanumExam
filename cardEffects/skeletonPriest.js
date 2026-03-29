/**
 * Skeleton Priest — Deals 7 damage to 1 tapped target (student or familiar).
 * Fizzles if no tapped targets exist (excluding itself).
 */
export default function skeletonPriest(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const selfOwnerId = context.familiarOwnerId || player.id;

  // Count tapped living targets (excluding self)
  let tappedCount = 0;
  for (const [pid, p] of room.players) {
    if (p.left) continue;
    // Tapped student (alive, not won)
    if (p.chosenStudent && !p.studentDead && !p.won && p.tappedStudent) {
      tappedCount++;
    }
    // Tapped familiars
    for (let i = 0; i < (p.familiars || []).length; i++) {
      const f = p.familiars[i];
      if (!f) continue;
      if (f.currentHp <= 0) continue;
      if (pid === selfOwnerId && i === context.familiarIndex) continue;
      if ((p.tappedFamiliars || []).includes(i)) {
        tappedCount++;
      }
    }
  }

  if (tappedCount === 0) return null;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 7,
    tappedOnly: true,
  };
}
