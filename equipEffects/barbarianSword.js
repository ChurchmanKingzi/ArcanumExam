/**
 * Barbarian Sword — Passive equip.
 *
 * +4 ATK to the equipped student.
 *
 * On-equip: Prompts controller (10s, reconnect-persistent) to optionally discard
 *   1 card from hand — if accepted, they then pick any Familiar with a non-negated
 *   passive effect, permanently Negating it (debuff clears when Familiar leaves board).
 *   Fizzles if player has no hand cards OR no eligible Familiar exists.
 *
 * On-student-attack: Any Familiar hit but not killed by the student's attack gains the
 *   Negated debuff (if it doesn't already have it and is in the eligible set).
 *
 * All logic is handled in server.js.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
