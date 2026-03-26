/**
 * Giga Steroids — Item.
 *
 * Eligible only when the owning player has ≥1 living, untapped Familiar
 * that can deal direct damage (same set as Leprechaun blessing targets,
 * but restricted to the player's OWN board).
 *
 * Effect: Select one such Familiar. It gains +1 Steroids stack.
 * Each Steroids stack adds +5 damage to all of that Familiar's direct-damage
 * effects — identical math to Lucky stacks, but tracked separately.
 *
 * Buff duration: until end of the current Round (cleared by clearAllSteroidsStacks,
 * called alongside clearAllLuckyStacks in both round-end paths).
 *
 * Potion Launcher / Copy Device:
 *   - Board-state guard: player must have ≥1 eligible familiar (alive, untapped,
 *     direct-damage effect). Guard added to getPotionLauncherEligibleItems() and
 *     getCopyDeviceEligibleItems().
 *   - Dispatch case in dispatchPotionLauncherItemEffect() sets up
 *     'giga-steroids-bless' pendingActivation with potionLauncherAfterFn.
 *   - Resolution handler calls potionLauncherAfterFn instead of broadcastRoomState.
 *
 * Server:
 *   - countGigaSteroidEligibleFamiliars(room, playerId) — eligibility count
 *   - clearAllSteroidsStacks(room) — round-end clear
 *   - 'giga-steroids-bless' effectType in pendingActivation
 *   - gigaSteroids:apply socket handler
 *   - gigaSteroidEligibleCount broadcast in player state
 *
 * Client:
 *   - hasGigaSteroidTarget(state) helper → grayout check
 *   - gigaSteroidBlocked flag in item highlight condition
 *   - 'giga-steroids-bless' targeting mode: own-familiars-only bless picker
 *   - 💪 badge (steroids-badge) on familiars with steroidsStacks > 0
 *   - Same tooltip format as Lucky badge
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
