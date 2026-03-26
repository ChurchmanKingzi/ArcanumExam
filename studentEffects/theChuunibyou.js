/**
 * The Chuunibyou
 *
 * Passive Effect: All Spells cost 2 less (minimum 0) for this player.
 * Handled server-side via getEffectiveSpellCost() — no active effect here.
 *
 * Escape Condition: At end of round, if the player has cast at least one
 * Spell in each of the last 3 consecutive rounds, they win.
 */

/**
 * No active effect — The Chuunibyou's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * At check time, spellStreak reflects previous rounds and
 * spellCastThisRound reflects the current (just-ending) round.
 * Win if the would-be streak (after this round) >= 3.
 */
export function escapeCondition(player, room) {
  const currentRoundCast = player.spellCastThisRound || false;
  if (!currentRoundCast) return false; // streak would reset, can't win
  const wouldBeStreak = (player.spellStreak || 0) + 1;
  return wouldBeStreak >= 3;
}
