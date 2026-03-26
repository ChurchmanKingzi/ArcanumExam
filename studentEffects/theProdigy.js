/**
 * The Prodigy — Student Effect
 *
 * PASSIVE: "Effortless" — At the start of every round, gains 1 charge.
 * Whenever the player would pay a cost > 0 from hand (during exam), a 10s
 * prompt appears: "Ignore this Cost?". Accepting consumes the charge and
 * sets the cost to 0, skipping payment entirely. Charge recharges each round.
 *
 * Applies to: game:playCard, familiar:mageSpellPay, familiar:reviveItem,
 * familiar:reviveEquip, student:caretakerSummon, student:schoolIdolCharm.
 * Also applies to snare activation costs (when such snares are added).
 *
 * ESCAPE: INSTANT — "Effortless Victory" — Wins immediately when any other
 * player reaches exactly their 3rd proctor approval while The Prodigy player
 * has exactly 0 approvals.
 *
 * Charge tracking and cost override handled in server.js via
 * player.prodigyChargeReady and consumeProdigyCostIgnore().
 * Client prompt handled in game.js via attemptProdigyCostIgnore().
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
 * Instant escape condition — checked whenever proctor approvals change.
 * Win if The Prodigy has 0 approvals AND any other non-left player has exactly 3.
 */
export function instantEscapeCondition(player, room) {
  const myApprovals = countApprovals(room, player.id);
  if (myApprovals !== 0) return false;

  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left) continue;
    if (countApprovals(room, pid) === 3) return true;
  }
  return false;
}

/**
 * Preview for escape indicator (⚠️).
 * Shows when: Prodigy currently at 0 (and no pending approvals for self),
 * AND at least one other player is currently < 3 but would reach 3+ with
 * their pending end-of-round approvals.
 *
 * room.pendingApprovals is attached by broadcastRoomState before calling preview.
 */
export function previewInstantEscapeCondition(player, room) {
  const pending = room.pendingApprovals || {};

  // Count how many pending approvals a player would gain
  function countPending(playerId) {
    let n = 0;
    for (const approvedIds of Object.values(pending)) {
      if (approvedIds.includes(playerId)) n++;
    }
    return n;
  }

  // Prodigy must be at 0 now AND have no pending (would still be 0 after round end)
  const myApprovals = countApprovals(room, player.id);
  if (myApprovals !== 0) return false;
  if (countPending(player.id) > 0) return false;

  // Check if any other player currently < 3 would reach 3+ with pending
  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left) continue;
    const current = countApprovals(room, pid);
    if (current >= 3) continue; // already at 3+, not "reaching" 3
    const projected = current + countPending(pid);
    if (projected >= 3) return true;
  }
  return false;
}

/**
 * Round-end escape condition — The Prodigy uses instant escape only.
 */
export function escapeCondition(player, room) {
  return false;
}
