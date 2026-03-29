/**
 * The Class Rep
 *
 * Passive Effect: Once per round (recharges at round start), the Class Rep
 * player can tap and act with an opponent's untapped Familiar as if they
 * owned it. This consumes the charge for that round.
 * Blocked by Class Pet immunity.
 * Handled server-side — no active effect here.
 *
 * Escape Condition: At end of round, the Class Rep player is the only one
 * controlling any living Familiars (≥ 3), excluding won/left players but
 * including those with dead students.
 */

/**
 * No active effect — The Class Rep's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * Win if player has ≥ 3 living familiars AND no other non-won, non-left
 * player controls any living familiars.
 */
export function escapeCondition(player, room) {
  const myLiving = (player.familiars || []).filter(f => f && (f.currentHp || 0) > 0).length;
  if (myLiving < 3) return false;

  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left || p.won) continue;
    // Dead-student players still count — they must have 0 living familiars
    const otherLiving = (p.familiars || []).filter(f => f && (f.currentHp || 0) > 0).length;
    if (otherLiving > 0) return false;
  }
  return true;
}
