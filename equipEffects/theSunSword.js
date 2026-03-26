/**
 * The Sun Sword — Passive equip effect (tap protection + after-attack Energize picker).
 *
 * 1. TAP PROTECTION: The equipped student cannot be force-tapped by effects
 *    (same immunity Chilly Dog gives to familiars, and Ifrit gives to both).
 *    Implemented by guarding forcedTapStudent: if the player has The Sun Sword,
 *    the call is a no-op (logs and returns early).
 *
 * 2. AFTER-ATTACK ENERGIZE PICKER: After the student's attack (same trigger as
 *    The Storm Blade), if any tapped familiars exist on the board, the owner gets
 *    an uncancellable, reconnect-persistent picker to select up to N tapped familiars
 *    (N = Sun Sword count, capped at available tapped familiars) and Energize each:
 *    untap + deal 5 damage.
 *
 * Logic in server.js:
 *   - hasSunSword(player) / countSunSwords(player)
 *   - forcedTapStudent: guard at top — if hasSunSword, log + return early
 *   - getPublicPlayerData / broadcastRoomState: sunSwordTapProtection flag
 *   - After-attack trigger in continueAfterSnares (after Storm Blade trigger):
 *       effectType: 'sun-sword-energize', targetsNeeded, canCancel: false
 *   - familiar:sunSwordEnergize({ targets }) handler
 * Logic in game.js:
 *   - 'sun-sword-energize' targetingMode with selectedTargets
 *   - Highlight tapped familiars on opp + own boards
 *   - sunSwordTapProtection flag shown in broadcastRoomState
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
