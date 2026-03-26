/**
 * Bazooka — Passive equip effect.
 *
 * While equipped: the equipped Student's ATK is increased by 10.
 * Logic handled in server.js via hasBazooka() inside getEffectiveStudentAtk().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
