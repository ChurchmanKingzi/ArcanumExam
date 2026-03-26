/**
 * Forbidden Grimoire — Passive equip effect.
 *
 * Reduces the cost of all Spells in the player's hand to 0,
 * but ONLY when cast by a Student (not Chilly Wizzy, not Skeleton Mage).
 *
 * Logic handled in server.js via hasForbiddenGrimoire() check in getEffectiveSpellCost
 * (studentCast parameter) and client-side via forbiddenGrimoire broadcast flag.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
