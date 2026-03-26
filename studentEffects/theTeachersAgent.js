/**
 * The Teachers Agent
 *
 * PASSIVE – "Teacher's Favourite":
 *   While this Student is alive, not won, not left, and her controlling
 *   player has at least 3 proctor approvals, NO other player can win
 *   via proctor approvals. Only The Teachers Agent's player may win
 *   by reaching the approval threshold.
 *   → Enforced in checkWinConditions() in server.js.
 *
 *   If she wins (via escape OR approvals), other players cannot win by
 *   approvals for the rest of that Round (same bailout logic as The Rowdy).
 *
 * ESCAPE: INSTANT – "Riding Coattails":
 *   Wins immediately when any other non-won, non-left player reaches
 *   4 or more proctor approvals while she herself has at least 3.
 *   The threshold is always 4, regardless of The Rowdy's effect.
 */

/**
 * Count non-distracted, non-disabled proctor approvals for a player.
 */
function countApprovals(room, playerId) {
  const distractedNames = new Set((room.distractedProctors || []).map(d => d.proctorName));
  const disabledProctors = room.disabledProctors || [];
  let count = 0;
  for (const [proctorName, approvedIds] of Object.entries(room.proctorApprovals || {})) {
    if (disabledProctors.includes(proctorName)) continue;
    if (distractedNames.has(proctorName)) continue;
    if (approvedIds.includes(playerId)) count++;
  }
  return count;
}

/**
 * Instant escape — checked whenever proctor approvals change.
 * Win if The Teachers Agent has 3+ approvals AND any other non-won,
 * non-left player has 4+ approvals.
 */
export function instantEscapeCondition(player, room) {
  if (countApprovals(room, player.id) < 3) return false;

  for (const [pid, p] of room.players) {
    if (pid === player.id || p.left || p.won) continue;
    if (countApprovals(room, pid) >= 4) return true;
  }
  return false;
}

/**
 * Preview for escape indicator (⚠️).
 * Shows when: Teachers Agent currently has 3+ (or would reach 3+ with pending),
 * AND at least one other player currently < 4 would reach 4+ with pending
 * end-of-round approvals.
 *
 * room.pendingApprovals is attached by broadcastRoomState before calling preview.
 */
export function previewInstantEscapeCondition(player, room) {
  const pending = room.pendingApprovals || {};

  function countPending(playerId) {
    let n = 0;
    for (const approvedIds of Object.values(pending)) {
      if (approvedIds.includes(playerId)) n++;
    }
    return n;
  }

  // Teachers Agent must reach 3+ after pending
  const myApprovals = countApprovals(room, player.id);
  const myProjected = myApprovals + countPending(player.id);
  if (myProjected < 3) return false;

  // Check if any other player currently < 4 would reach 4+ with pending
  for (const [pid, p] of room.players) {
    if (pid === player.id || p.left || p.won) continue;
    const current = countApprovals(room, pid);
    if (current >= 4) continue; // already at 4+, escape would have already fired
    if (current + countPending(pid) >= 4) return true;
  }
  return false;
}

/**
 * Round-end escape — Teachers Agent uses instant escape only.
 */
export function escapeCondition(player, room) {
  return false;
}
