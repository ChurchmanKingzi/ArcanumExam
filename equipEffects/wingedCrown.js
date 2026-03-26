/**
 * Winged Crown — Student active effect (equip-granted).
 *
 * Gives the equipped student an additional choosable action:
 * "Tap this Student to Ready (untap) all your Exhausted Familiars."
 *
 * Rules:
 *   - Appears as an extra option in the student-action-choice picker.
 *   - If the student has no other active effect, it becomes a 2-choice picker
 *     (Attack vs Winged Crown). If the student has its own active effect, it
 *     becomes a 3-choice picker (Attack, Effect, Winged Crown).
 *   - Only offered when the player has at least 1 tapped familiar
 *     (no point showing it otherwise).
 *   - Multiple Winged Crowns: no additional effect (boolean).
 *
 * Logic in server.js:
 *   - hasWingedCrown(player) helper
 *   - Student click handler: compute wingedCrownOption (hasWingedCrown &&
 *     player has tapped familiars); if present, force student-action-choice
 *     PA with wingedCrownEffect: true, regardless of other combinations.
 *   - student:chooseAction handler: action === 'winged-crown' branch:
 *       tap student, untap all tappedFamiliars, advance turn.
 * Logic in game.js:
 *   - showStudentActionChoice receives wingedCrownEffect flag and renders
 *     an additional 👑 Ready button.
 *   - targetingMode stores wingedCrownEffect for reconnect persistence.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
