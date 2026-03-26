/**
 * Mana Absorbing Crystal — Passive equip effect.
 *
 * While equipped: increases the cost of ALL Spells for ALL opponents by 1
 * per Crystal on the board. Multiple Crystals across different players stack.
 *
 * Cost increase is applied BEFORE reductions (Chuunibyou, Chilly Wizzy),
 * and AFTER flat overrides (Magic Show, Forbidden Grimoire).
 * Magic Modifier trumps everything (Crystal has no effect when MM is active).
 *
 * For variable-cost spells (e.g. Frost Breaker), the Crystal reduces the
 * effective number of targets for the same discard payment.
 *
 * Logic handled in server.js via countOpponentCrystals() integrated into
 * getEffectiveSpellCost() and resolveSpellEffect() for variable-cost spells.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
