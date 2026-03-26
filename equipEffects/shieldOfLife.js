/**
 * Shield of Life — Passive equip effect (on-damage trigger).
 *
 * Triggers after EVERY time the equipped Student takes any direct damage
 * from resolveTargetDamage and survives (same conditions as Shield of Death).
 *
 * When triggered: if any Familiar on the board has HP < max HP, the controller
 * gets an immediate, uncancellable, reconnect-persistent prompt to select 1
 * damaged Familiar to heal for 4 HP.
 *
 * Multiple Shields of Life queue consecutively (same rules as Shield of Death).
 * Fires AFTER Shield of Death in the drain chain.
 *
 * Animation: holy light burst + sparkles at the Familiar's position.
 *
 * Logic in server.js:
 *   - hasShieldOfLife(player) / countShieldOfLives(player)
 *   - resolveTargetDamage() → room._solCandidates
 *   - drainShieldOfLifeCandidates(room, afterFn)
 *   - processNextShieldOfLife(room)
 *   - _doBerserkAndAdvance() — shieldOfLifeTrigger branch
 * Logic in game.js:
 *   - showShieldOfLifeAnimation(coords)
 *   - Pre-render snapshot of shieldOfLifeEvents
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
