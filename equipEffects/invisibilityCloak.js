/**
 * Invisibility Cloak — Passive equip.
 *
 * At the start of every Round (including Round 1), the equipped student gains
 * 1 stack of "Invisible".
 *
 * While the student has 1+ Invisible stacks:
 *   - Any damage to the student (from ANY source, including friendly fire) is
 *     completely negated. 1 stack is consumed.
 *   - Any opponent's card/effect that would affect the student is completely
 *     negated. 1 stack is consumed.
 *   One stack = one blocked hit. Multiple Cloaks = multiple stacks = multiple
 *   blocked hits per round.
 *
 * At the end of every Round, all remaining Invisible stacks are lost.
 *
 * When a Cloak is removed (destroyed or returned to hand), the student's
 * current Invisible stacks are capped to the new number of Cloaks equipped.
 *
 * Visual: Students with 1+ Invisible stacks appear semi-transparent on all screens.
 *
 * All logic is handled in server.js.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
