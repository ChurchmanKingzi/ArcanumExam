/**
 * Scimitar — Passive equip effect (ATK bonus + on-kill permanent boost).
 *
 * While equipped: student's effective ATK is increased by +4.
 * On kill (basic student attack or Edgelord multi-target attack):
 *   for each target killed, the student gains a permanent +4 ATK bonus
 *   stored on player.scimitarPermAtk (survives equip removal).
 *
 * Logic handled in server.js:
 *   - hasScimitar(player) — presence check
 *   - getEffectiveStudentAtk() — +4 bonus while equipped
 *   - getPublicPlayerData() atkBonus line — updated to include scimitarBonus
 *   - broadcastRoomState atkBonus IIFE — updated likewise
 *   - continueAfterNerdyCheese() — on-kill handler: deaths.length > 0
 *     while isStudentAttack || pa.edgelordAttack adds 4 per kill to player.scimitarPermAtk
 *     and player.chosenStudent.currentAtk
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
