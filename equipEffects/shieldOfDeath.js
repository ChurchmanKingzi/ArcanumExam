/**
 * Shield of Death — Passive equip effect (on-damage trigger).
 *
 * Triggers after EVERY time the equipped Student takes any direct damage
 * from resolveTargetDamage and survives (HP > 0 after damage, OR saved by
 * Elixir of Immortality). Golden Ankh revives do NOT trigger it (student
 * was truly dead at the Ankh prompt stage).
 *
 * When triggered: if any Familiars exist on the board, the controller gets
 * an immediate, uncancellable, reconnect-persistent prompt to select 1
 * Familiar and deal 4 damage to it.
 *
 * Multiple Shields queue consecutively in turn order (active player first).
 * Each copy of Shield of Death adds one trigger per damage event.
 *
 * Animation: dark magic + skulls at the Familiar's position, snapshotted
 * before render so it fires at the right spot even if the Familiar dies.
 *
 * Logic handled in server.js:
 *   - hasShieldOfDeath(player) / countShieldOfDeaths(player)
 *   - resolveTargetDamage() — collects candidates into room._sodCandidates
 *   - drainShieldOfDeathCandidates(room, afterFn) — builds queue, called
 *     between drainElixirCandidates and drainAnkhCandidates
 *   - processNextShieldOfDeath(room) — sets PA for next trigger
 *   - _doBerserkAndAdvance() — detects pa.shieldOfDeathTrigger, shifts
 *     queue and calls processNextShieldOfDeath
 * Logic handled in game.js:
 *   - showShieldOfDeathAnimation(coords) — dark skull burst at target
 *   - Pre-render snapshot of shieldOfDeathEvents positions
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
