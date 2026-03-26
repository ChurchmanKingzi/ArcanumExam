/**
 * The Buffoon
 *
 * Passive Effect: At exam start, the Buffoon player must select 1 Proctor
 * to permanently disable for the entire game. Nobody can earn its approval,
 * and existing approvals are revoked. Handled server-side via buffoon-pick
 * sub-phase — no active effect here.
 *
 * Escape Condition: At the end of exactly Round 3, if the Buffoon player
 * has exactly 0 proctor approvals, they win.
 */

/**
 * No active effect — The Buffoon's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * ONLY triggers at exactly round 3, and only if 0 approvals.
 */
export function escapeCondition(player, room) {
  // examRound has already been incremented when this fires:
  // Round 1 ends → examRound becomes 2
  // Round 2 ends → examRound becomes 3
  // Round 3 ends → examRound becomes 4
  if (room.examRound !== 4) return false;

  // Count approvals excluding disabled proctors (countApprovals already does this)
  const { countApprovals: countFn } = room._helpers || {};
  // We can't import countApprovals here, so we count manually
  const disabled = new Set(room.disabledProctors || []);
  let approvalCount = 0;
  for (const [proctorName, approvedIds] of Object.entries(room.proctorApprovals || {})) {
    if (disabled.has(proctorName)) continue;
    if (approvedIds.includes(player.id)) approvalCount++;
  }

  return approvalCount === 0;
}
