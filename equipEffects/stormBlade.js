/**
 * Storm Blade — Passive equip, on-attack trigger.
 *
 * After the student's attack resolves, if any non-immune familiars remain
 * on the board, the player must select N familiars to bounce to their
 * owners' hands, where N = number of Storm Blades equipped (capped at
 * available bounceable familiars).
 *
 * Trigger: any student attack (basic + Edgelord), not Nerdy Cheese / Berserk.
 * Targets: any familiar alive, not summoned, not Class Pet immune, not Mech immune.
 * Multiple blades: single prompt, select N at once (or all if fewer available).
 * Uncancellable, reconnect-persistent.
 *
 * Logic in server.js:
 *   - hasStormBlade(player) / countStormBlades(player)
 *   - countStormBladeTargets(room) — eligible familiar count
 *   - Trigger in continueAfterSnares (after SKS), sets PA:
 *       effectType: 'storm-blade-bounce', targetsNeeded, canCancel: false
 *   - familiar:stormBladeBounce({ targets }) handler
 * Logic in game.js:
 *   - 'storm-blade-bounce' targetingMode with selectedTargets Set
 *   - Multi-select highlighting on opp + own familiars
 *   - Confirm when selectedTargets.size === targetsNeeded
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
