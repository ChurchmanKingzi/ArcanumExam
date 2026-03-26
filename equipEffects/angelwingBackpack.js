/**
 * Angelwing Backpack — Passive equip effect.
 *
 * While equipped: the student is unaffected by all Familiar effects except
 * direct damage. This blocks heals, poison, energize, petrify, curse, and
 * any other non-damage familiar-sourced effect on the student.
 *
 * Logic handled in server.js via hasAngelwingBackpack().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
