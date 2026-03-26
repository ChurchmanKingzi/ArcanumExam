/**
 * Anti-Magnetic Armor — Passive equip effect.
 *
 * At the start of each round, grants 1 "Magnet Armor" stack (cleared at round end).
 * When an opponent's attack/effect targets the equipped student, the player may
 * redirect it to one of their own Familiars. Takes precedence over regular Magnet stacks.
 *
 * Logic handled in server.js via tryMagnetIntercept().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
