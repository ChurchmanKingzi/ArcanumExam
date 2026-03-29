/**
 * The Edgelord — Student Effect
 *
 * PASSIVE: "Cleave" — When tapping to attack, The Edgelord targets one entity
 * per player (including self). All targets take full ATK damage simultaneously
 * as a single event (one snare/Cool Kid trigger).
 *
 * ESCAPE: "Total Annihilation" — At end of round, no non-left player controls
 * any living Familiars. The board must be completely clear of Familiars.
 *
 * The passive attack modification is handled directly in server.js via
 * hasActiveStudentEffect('The Edgelord') checks and buildStudentAttackActivation().
 */

// No active effect — the Edgelord's passive modifies the normal student attack flow
// export function activeEffect(student, context) { return null; }

/**
 * Escape Condition: No living familiars exist on the board for any non-left player.
 */
export function escapeCondition(player, room) {
  for (const [, p] of room.players) {
    if (p.left) continue;
    for (const f of (p.familiars || [])) {
      if (!f) continue;
      if ((f.currentHp || 0) > 0) return false;
    }
  }
  return true;
}
