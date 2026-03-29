/**
 * The School Idol
 *
 * Active Effect: Charme a Familiar — steal an opponent's living familiar by
 * discarding cards equal to half its cost (rounded down). The familiar
 * transfers permanently and is untapped (without Energize / no 5 damage).
 *
 * Escape Condition: At end of round, control 2+ living familiars that were
 * originally owned by opponent(s) and got stolen by any effect.
 */

/**
 * Active effect — available only if at least one opponent controls a living
 * familiar whose halved cost (floor) is affordable with current hand size.
 */
export function activeEffect(student, context) {
  const room = context.room;
  const player = context.player;
  if (!room || !player) return null;

  const handSize = player.hand.length;

  let hasTarget = false;
  for (const [pid, p] of room.players) {
    if (pid === player.id || p.left) continue;
    if (p.chosenStudent?.name === 'The Class Pet' && !p.studentDead) continue; // all familiars immune
    for (const f of (p.familiars || [])) {
      if (!f) continue;
      if ((f.currentHp || 0) <= 0) continue;
      if (f.summoned) continue;
      // Futuristic Mech (or Clone copying it) is immune to non-damage effects
      if (f.name === 'Futuristic Mech' || (f.isClone && f.cloneSourceName === 'Futuristic Mech')) continue;
      const halfCost = Math.floor((f.cost || 0) / 2);
      if (halfCost <= handSize) {
        hasTarget = true;
        break;
      }
    }
    if (hasTarget) break;
  }

  if (!hasTarget) return null;

  return {
    effectType: 'school-idol-charm',
    effectLabel: '💖 Charme',
  };
}

/**
 * Escape condition — checked at end of each round.
 * Win if player controls 2+ living familiars that were stolen from opponents.
 */
export function escapeCondition(player, room) {
  const stolenLiving = (player.familiars || []).filter(f =>
    f && f.stolenFrom && f.stolenFrom !== player.id && (f.currentHp || 0) > 0
  );
  return stolenLiving.length >= 2;
}
