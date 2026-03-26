/**
 * Nerdy Cheese — Passive equip effect.
 *
 * Whenever the equipped student attacks and hits a target (including
 * Seagulls-enhanced attacks), the controlling player gets an interrupt
 * prompt offering to cast a Spell from hand.
 *
 * The spell is automatically cast by the attacking student (bypasses
 * tap requirement), triggering other Cheese equips. 10-second timer
 * on the prompt; once spell selection begins the timer ends. Cancelling
 * during selection fizzles with no second chance.
 *
 * Chain order: Snare → Nerdy Cheese spell → other on-hit effects
 *
 * Logic handled in server.js via setupNerdyCheesePrompt() integrated
 * into continueAfterSnares in the damage-targets resolution handler.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
