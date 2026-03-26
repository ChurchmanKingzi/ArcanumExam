/**
 * The Average Student
 *
 * Passive Effect: The first Familiar that acts each round gets to act a
 * second time immediately (mandatory, non-cancellable). Handled server-side
 * via the tapFamiliar → advanceExamTurn hook — no active effect here.
 *
 * Escape Condition: At end of round, if the player controls at least 2 more
 * living Familiars than they had at the start of the Exam Phase, they win.
 */

/**
 * No active effect — The Average Student's passive is handled server-side.
 */
export function activeEffect(student, context) {
  return null;
}

/**
 * Escape condition — checked at end of each round.
 * Win if current living familiars ≥ startingFamiliarCount + 2.
 */
export function escapeCondition(player, room) {
  const startCount = player.startingFamiliarCount ?? 0;
  const currentLiving = (player.familiars || []).filter(f => (f.currentHp || 0) > 0).length;
  return currentLiving >= startCount + 2;
}
