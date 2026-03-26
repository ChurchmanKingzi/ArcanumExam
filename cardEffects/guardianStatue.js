/**
 * Guardian Statue — Transfer HP from itself to a damaged target.
 * Selects any damaged target (currentHp < hp) except itself.
 * Fizzles if no damaged targets exist or Statue has only 1 HP.
 */
export default function guardianStatue(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  // Statue must have more than 1 HP to transfer
  if (familiar.currentHp <= 1) return null;

  // The familiar's owner (for self-exclusion) — may differ from player when Siren-charmed
  const selfOwnerId = context.familiarOwnerId || player.id;

  // Find damaged targets (any player's student or familiar, excluding this familiar)
  let hasDamagedTarget = false;
  for (const [pid, p] of room.players) {
    if (p.left) continue;
    // Check student
    if (p.chosenStudent && !p.studentDead && !p.won && p.chosenStudent.currentHp < p.chosenStudent.hp) {
      hasDamagedTarget = true;
      break;
    }
    // Check familiars
    for (let i = 0; i < (p.familiars || []).length; i++) {
      const f = p.familiars[i];
      if (f.currentHp <= 0) continue;
      // Exclude self
      if (pid === selfOwnerId && i === context.familiarIndex) continue;
      if (f.currentHp < f.hp) {
        hasDamagedTarget = true;
        break;
      }
    }
    if (hasDamagedTarget) break;
  }

  if (!hasDamagedTarget) return null;

  return {
    effectType: 'guardian-transfer',
    statueHp: familiar.currentHp,
    statueMaxHp: familiar.hp,
  };
}
