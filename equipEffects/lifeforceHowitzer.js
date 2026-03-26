/**
 * Lifeforce Howitzer — Passive equip.
 *
 * Whenever the equipped student's HP is healed in any way, and the actual
 * healing applied (capped at missing HP — over-healing beyond max HP doesn't
 * count) is > 0, the player is immediately presented with an uncancellable
 * target-selection prompt:
 *
 *   "Choose a target to deal [N] damage."
 *
 * Rules:
 *   - Valid targets: anything on the board EXCEPT the healed student.
 *   - Damage category: 'effect' (neutral — bypasses Seagull reclassification,
 *     Anti-Magic Blade, Diver Helmet, and attack-specific bonuses).
 *   - Damage amount: the actual healing applied (not the raw heal amount).
 *   - If there are no valid targets (healed student is the only living entity
 *     on the board), the shot silently fizzles.
 *   - Multiple Howitzers = N separate sequential prompts, each for the same
 *     damage amount.
 *   - Reconnect-persistent: prompt is re-shown if the player reconnects.
 *
 * Only triggers on student HP heals — familiar heals do not fire the Howitzer.
 *
 * All logic is handled in server.js (_processHowitzerQueue).
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
