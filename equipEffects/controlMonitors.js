/**
 * Control Monitors — Passive equip effect.
 *
 * Identical to the Eyeballs familiar passive: all opponent Snares on the board
 * are permanently revealed to the equipped student's owner (they can hover to
 * see them). Snares stamped as revealed remain so even after the Monitors are
 * removed from play.
 *
 * Logic is handled directly in broadcastRoomState alongside the Eyeballs check.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
