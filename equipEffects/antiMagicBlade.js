/**
 * Anti-Magic Blade — Passive equip effect.
 *
 * While equipped:
 * - Student gains +4 ATK
 * - Student cannot cast Spells (other students can; Chilly Wizzy/Skeleton Mage unaffected)
 * - Student takes 0 damage from Spell sources (including Seagulls-enhanced attacks)
 *
 * All logic handled in server.js via hasAntiMagicBlade() / getEffectiveStudentAtk() /
 * resolveTargetDamage opts.damageCategory check.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
