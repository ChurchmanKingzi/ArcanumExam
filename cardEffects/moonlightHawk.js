/**
 * Moonlight Hawk — Active (tap): Select an opponent, then deal 10 damage
 * to their living target with the lowest current HP. If tied, controller picks.
 *
 * Passive (server-side): Negate any Snare that would affect 1 or more
 * targets the Hawk's owner controls (entire snare is negated).
 */
export default function moonlightHawk(familiar, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  // Check if any opponent has at least one living target
  let hasTarget = false;
  for (const [pid, p] of room.players) {
    if (p.left || pid === player.id) continue;
    if (p.chosenStudent && !p.studentDead) { hasTarget = true; break; }
    if ((p.familiars || []).some(f => f && f.currentHp > 0)) { hasTarget = true; break; }
  }

  if (!hasTarget) return null;

  return {
    effectType: 'hawk-strike',
  };
}
