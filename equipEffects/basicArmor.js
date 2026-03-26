/**
 * Basic Armor — Passive equip effect.
 *
 * While equipped: all damage the equipped Student takes from any source
 * is reduced by 2, to a minimum of 1.
 *
 * Applied last in the damage pipeline (after Diver Helmet, Rain's Blessing,
 * etc.). Logic handled in server.js via hasBasicArmor() at the student
 * damage site in applyDamageTargets / resolveTargets.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
