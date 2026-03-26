/**
 * Heart of Ice — Passive equip.
 *
 * Whenever the equipped student takes any damage (from any source, including
 * friendly fire), the owning player must Exhaust (tap) one untapped target on
 * the board per equipped Heart of Ice (up to the number of available targets).
 *
 * Targets: any untapped familiar or student (own or opponent's).
 * Blocked by: Chilly Dog / Ifrit (opponent's targets only), Class Pet immunity,
 *   Futuristic Mech immunity, Angelwing Backpack (students).
 * Cannot be cancelled. Reconnect-persistent (reuses Snowman exhaust queue).
 *
 * Multiple copies: each Heart of Ice queues one additional exhaust prompt.
 *
 * All logic is handled in server.js.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
