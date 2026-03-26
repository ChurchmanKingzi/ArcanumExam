/**
 * Anti-Magnet — Passive equip effect.
 *
 * At the start of each round, grants 1 "Magnet" stack (cleared at round end).
 * When an opponent's attack/effect targets exactly 1 of this player's targets
 * (and no other of theirs), the player may redirect it to a different own target.
 * Consumes 1 Magnet stack per redirect.
 *
 * Logic handled in server.js via tryMagnetIntercept().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
