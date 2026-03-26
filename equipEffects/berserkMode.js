/**
 * Berserk Mode — Passive equip effect.
 *
 * While equipped:
 * - Student cannot cast Spells (other students/Chilly Wizzy/Skeleton Mage unaffected)
 * - When the student hits an attack, player may optionally attack again (once, no chain)
 *
 * Logic handled in server.js via hasBerserkMode() / isStudentSpellBlocked() /
 * continueAfterSnares Berserk bonus attack check.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
