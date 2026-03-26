/**
 * Diver Helmet — Passive equip effect.
 *
 * Reduces spell-source damage to the equipped student by 5 (minimum 1).
 * This includes Seagulls-enhanced attacks.
 *
 * Logic handled in server.js via hasDiverHelmet() check in resolveTargetDamage.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
