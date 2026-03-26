/**
 * The Cool Kid
 *
 * Passive Effect: Whenever one or more of this player's Familiars would
 * take damage and the player has cards in hand, a 10-second prompt appears.
 * Accepting costs 1 card from hand (forced discard, no cancel). In exchange,
 * ALL of this player's Familiars take 0 damage from that damage event.
 * Students still take damage normally. Each poison tick is a separate prompt.
 * Handled server-side via coolKidHeldDamage in resolveTargetDamage.
 *
 * Escape Condition: At end of round, ALL non-won/non-left players control
 * at least 1 living Familiar AND no students or familiars died the entire
 * round (roundDeathCount === 0). Equip/snare destruction doesn't count.
 */

/**
 * No active effect — The Cool Kid's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * Win if: zero deaths this round AND all non-won/non-left players
 * control at least 1 living familiar.
 */
export function escapeCondition(player, room) {
  // Any deaths this round? (students or familiars)
  if ((room.roundDeathCount || 0) > 0) return false;

  // All non-won, non-left players must have ≥1 living familiar
  for (const [pid, p] of room.players) {
    if (p.left || p.won) continue;
    const living = (p.familiars || []).filter(f => (f.currentHp || 0) > 0).length;
    if (living === 0) return false;
  }
  return true;
}
