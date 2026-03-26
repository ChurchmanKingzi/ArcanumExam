/**
 * Rocket Fist — Passive equip effect (on-attack trigger).
 *
 * Whenever the equipped Student performs a basic attack (any target),
 * after attack resolution, check if any Snares exist on the board
 * (all players' boards, including the attacker's own).
 *
 * If Snares exist: open an uncancellable, reconnect-persistent dialogue
 * prompting the controller to select exactly 1 Snare to destroy.
 * The chosen Snare is sent to the owner's discard pile.
 * On resolve: play an explosion animation on the destroyed Snare.
 *
 * Priority: fires after Sword-Breaking Rock (SBR) but before Nerdy Cheese /
 * Hat of Madness / Berserk / Possessed Blade / Potion Launcher in
 * continueAfterSnares. Uses the same effectType: 'destroy-snare' pendingActivation
 * as Land Piranha, distinguished by sourceType: 'equip-rocket-fist'.
 *
 * Logic handled in server.js:
 *   - hasRocketFist(player) — presence check
 *   - continueAfterSnares() — trigger after attack, guarded by pa._rfChecked
 *   - familiar:destroySnare — rocketFistEvents branch + rocketFistAfterFn
 * Logic handled in game.js:
 *   - showRocketFistAnimation(state) — explosion anim on destroyed Snare position
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
