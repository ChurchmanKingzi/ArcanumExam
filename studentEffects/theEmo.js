/**
 * The Emo
 *
 * Active Effect: Deal 5 × current round number damage to a single target.
 *
 * Escape Condition: Instant — if The Emo's active effect kills an opponent's
 * student, the player wins immediately.
 * NOTE: This is NOT a round-end condition; it is checked in the attack handler.
 */

/**
 * Active effect — returns a damage-targets descriptor with emoBlast flag.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  // Need at least one living target (excluding self)
  let hasTarget = false;
  for (const [pid, p] of room.players) {
    if (pid === player.id) continue;
    if (p.left) continue;
    if (p.chosenStudent && !p.studentDead) { hasTarget = true; break; }
    if ((p.familiars || []).some(f => f.currentHp > 0)) { hasTarget = true; break; }
  }
  // Also check own familiars
  if (!hasTarget && (player.familiars || []).some(f => f.currentHp > 0)) {
    hasTarget = true;
  }
  if (!hasTarget) return null;

  const damage = 5 * (room.examRound || 1);

  return {
    effectType: 'damage-targets',
    effectLabel: '🖤 Dark Blast',
    targetsNeeded: 1,
    damage,
    emoBlast: true, // flag for instant escape check
  };
}

/**
 * Escape condition — The Emo does NOT use round-end checks.
 * Her escape is handled via the emoBlast flag in the attack handler.
 */
export function escapeCondition(player, room) {
  return false; // never triggers at round end
}
