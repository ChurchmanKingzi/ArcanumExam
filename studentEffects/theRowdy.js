/**
 * The Rowdy — Student Effect
 *
 * PASSIVE: "Tough Crowd" — While The Rowdy is active (alive, not won, not left),
 * all players need 5 proctor approvals to win instead of 4.
 * Implemented in server.js via getApprovalsToWin(room).
 *
 * ESCAPE: "Survivor" — At the end of Round 5 specifically, if The Rowdy is
 * alive and not summoned, they win.
 *
 * examRound is already incremented before escape check:
 *   Round 1 ends → examRound=2, Round 2 → 3, ... Round 5 → 6
 */

/**
 * Round-end escape condition — alive at end of Round 5.
 */
export function escapeCondition(player, room) {
  if (room.examRound !== 6) return false; // exactly end of round 5
  return true; // alive + not won + not summoned already checked by caller
}
