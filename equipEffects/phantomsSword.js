/**
 * Phantoms Sword — Passive equip.
 *
 * Increases the equipped Student's ATK by the number of cards currently
 * in the player's discard pile. The bonus updates automatically whenever
 * the discard pile size changes (cards discarded as payment, familiars die,
 * cards drawn from discard, etc.).
 *
 * All logic lives in getEffectiveStudentAtk (server.js) and the two
 * atkBonus entries in the player data builders.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
