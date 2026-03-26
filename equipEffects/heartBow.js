/**
 * Heart Bow — Passive equip.
 *
 * On-student-attack: Any Familiar hit but not killed by the equipped student's
 *   basic attack (or Edgelord's multi-target cleave) is permanently stolen —
 *   transferred to the attacker's board, marked with stolenFrom.
 *
 * Does not trigger on: Nerdy Cheese bonus cast, Berserk Mode bonus attack.
 * Respects: Class Pet immunity, Futuristic Mech immunity, Golden Hind immunity,
 *   summoned students, own familiars.
 *
 * All logic is handled in server.js.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
