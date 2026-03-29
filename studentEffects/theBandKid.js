/**
 * The Band Kid
 *
 * Active Effect: Steal any Equip not currently on The Band Kid
 * and move it to this student.
 *
 * Escape Condition: At end of round, if no other living student
 * (any player's main student, excluding Band Kid's owner) has any Equips,
 * the Band Kid's owner wins.
 */

/**
 * Active effect — returns effect descriptor or null if no valid targets.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  // Count equips NOT on this player's main student
  let stealableCount = 0;
  for (const [pid, p] of room.players) {
    if (p.left) continue;
    // Other players' main student equips
    if (pid !== player.id) {
      stealableCount += (p.equips || []).length;
    }
    // Any player's summoned student equips (including own)
    for (const f of (p.familiars || [])) {
      if (!f) continue;
      if (f.summoned) {
        stealableCount += (f.equips || []).length;
      }
    }
  }

  if (stealableCount === 0) return null;

  return {
    effectType: 'steal-equip',
    effectLabel: '🎵 Steal Equip',
  };
}

/**
 * Escape condition — checked at end of each round.
 * Win if Band Kid has at least 1 equip AND no OTHER living main student has any Equips.
 */
export function escapeCondition(player, room) {
  // Band Kid must have stolen at least one equip
  if ((player.equips || []).length === 0) return false;

  for (const [pid, p] of room.players) {
    if (p.left || p.studentDead || p.won) continue;
    if (pid === player.id) continue; // skip self
    if (!p.chosenStudent) continue;
    if ((p.equips || []).length > 0) return false;
  }
  return true;
}
