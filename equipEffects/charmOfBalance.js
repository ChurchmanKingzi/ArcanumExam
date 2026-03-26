/**
 * Charm of Balance — Passive equip effect.
 *
 * At the very start of each End-of-Round procedure (before Poison, before
 * Proctor approvals, before anything else), the equipped student's owner
 * is prompted to select any living Student controlled by another player.
 * Both that Student's and the equipped Student's current HP are then set
 * to their average, rounded up, capped at each Student's maximum HP.
 *
 * Multiple Charms owned by different players trigger in play order.
 * Multiple Charms on the same Student trigger one by one; each CAN
 * target the same opponent Student.
 *
 * If no other player has a living Student, the Charm fizzles silently.
 *
 * Logic handled in server.js via countCharmsOfBalance(),
 * buildCharmOfBalanceQueue(), processCharmOfBalanceQueue(), and
 * setupCharmOfBalancePrompt().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
