/**
 * Jetpack — Passive equip.
 *
 * Whenever the equipped student is targeted by an opponent's basic student
 * attack (including Edgelord multi-attack and Gerrymander-redirected attacks):
 *
 *   The student's owner is shown a prompt:
 *     "Discard 1 card to evade the attack? [Yes] [No]"
 *   Timer: 10 seconds. No card in hand = prompt not shown (auto-decline).
 *
 *   If YES: owner must choose 1 card to discard (no timer).
 *           Aborting the discard = treated as No.
 *           On successful discard: the attack is treated as a complete miss
 *           for that student — no damage, no on-hit effects (Giant Hammer,
 *           Heart Bow, Sickly Cheese, etc.), attacker gains nothing from
 *           hitting the evader (Vanguard Demon bonus, Leprechaun bonus,
 *           Angry Cheese, etc. do not proc for that target).
 *           Snare reactions are also suppressed for the evaded target.
 *
 *   If NO (or timeout): attack proceeds normally.
 *
 * Multiple Jetpacks on the same student = same as one (boolean).
 * Multiple students targeted (Edgelord): each owner is prompted simultaneously.
 *
 * All logic is handled in server.js.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
