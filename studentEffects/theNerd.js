/**
 * The Nerd
 *
 * Active Effect: Select up to 3 cards from discard pile to add to hand.
 * Only available if discard has 1+ cards.
 *
 * Escape Condition: INSTANT — at any point, if The Nerd's player has at least
 * 2 more proctor approvals than every other individual player, they win.
 */

/**
 * Active effect — returns effect descriptor or null if no valid targets.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  if ((player.discardPile || []).length === 0) return null;

  return {
    effectType: 'nerd-retrieve',
    effectLabel: '📚 Retrieve',
  };
}

/**
 * Count non-distracted proctor approvals for a player.
 */
function countApprovals(room, playerId) {
  const distractedNames = new Set((room.distractedProctors || []).map(d => d.proctorName));
  let count = 0;
  for (const [proctorName, approvedIds] of Object.entries(room.proctorApprovals || {})) {
    if (distractedNames.has(proctorName)) continue;
    if (approvedIds.includes(playerId)) count++;
  }
  return count;
}

/**
 * Instant escape condition — checked whenever proctor approvals change.
 * Win if player has ≥2 more approvals than every other player (including won/dead/left).
 */
export function instantEscapeCondition(player, room) {
  const myApprovals = countApprovals(room, player.id);
  if (myApprovals < 2) return false; // need at least 2

  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left) continue;
    const otherApprovals = countApprovals(room, pid);
    if (myApprovals - otherApprovals < 2) return false;
  }
  return true;
}

/**
 * Round-end escape condition — The Nerd does NOT use round-end checks.
 */
export function escapeCondition(player, room) {
  return false;
}
