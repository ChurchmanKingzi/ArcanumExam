/**
 * The Loner — Student Effect
 *
 * PASSIVE: "Solitude" — At the end of every round, if The Loner's controller
 * has no living familiars, heal The Loner by 25 HP.
 * Handled in server.js startNewExamRound().
 *
 * ESCAPE: "True Solitude" — At the end of round 3 (or later), if The Loner
 * is alive, not summoned, and its controller NEVER controlled any familiars
 * throughout the entire game (tracked via player.loner_everHadFamiliar).
 */

/**
 * Escape Condition: End of round 3+, alive, not summoned, never had familiars.
 * examRound is already incremented before escape check:
 *   Round 1 ends → examRound=2, Round 2 → 3, Round 3 → 4
 */
export function escapeCondition(player, room) {
  if (room.examRound < 4) return false; // not yet end of round 3
  if (!player.chosenStudent || player.chosenStudent.summoned) return false;
  if (player.loner_everHadFamiliar) return false;
  return true;
}
