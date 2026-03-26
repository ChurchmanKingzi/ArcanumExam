/**
 * Potion Launcher — Passive equip.
 *
 * After the equipped Student lands a basic student attack (same trigger as
 * Bomb Arrow / Possessed Blade: basic attacks, Edgelord, Berserk bonus),
 * IF the attacking player still has an Item activation left this round AND
 * there is at least 1 eligible Item in their discard pile:
 *
 * → Show a timed "Use an Item from your discard pile?" prompt (10s, default No).
 * → Yes → show item picker (eligible Items from discard).
 * → Selecting an item → normal cost payment dialogue (Mine Cart, Royal Corgi,
 *   Prodigy all apply). Payment must be made from hand as normal.
 * → Confirming payment → item resolves **as if played from hand**.
 * → After item resolves: player.itemUsedThisRound = true.
 * → Check for more charges (each Potion Launcher copy = 1 charge per attack).
 *   Successive charges only fire if itemUsedThisRound is still false.
 *
 * Aborting (No prompt / cancel item select): entire chain ends.
 * Cancelling during targeting: back to item picker.
 * Cancelling payment: back to item picker.
 *
 * Item eligibility:
 * - Must be type 'Item'
 * - Must NOT be in POTION_LAUNCHER_INELIGIBLE_ITEMS set (opt-out for timing-sensitive items)
 * - Board-state checks per item:
 *   • Sneeze Rocket: at least 1 eligible familiar on board
 *   • Cool Drink: at least 1 poisoned target
 *   • Smug Coin: discard pile has ≥ 2 cards (at least one besides itself)
 *   • Book of Doom: at least 1 living target
 *   • Deadly Poison / Poisonous Potion: at least 1 enemy
 *
 * Server:
 *   - countPotionLaunchers(player)
 *   - getPotionLauncherEligibleItems(room, playerId)
 *   - getPotionLauncherItemCost(player, card)
 *   - setupPotionLauncherPrompt() → room.pendingPotionLauncher
 *   - dispatchPotionLauncherItemEffect() — mirrors Item dispatch from game:playCard
 *   - potionLauncher:skip/accept/cancelSelect/selectItem/cancelPay/pay socket handlers
 *   - pa.potionLauncherAfterFn: replaces itemEffect at resolution sites
 *   - pa.potionLauncherContext: { chargesRemaining, afterFn, selectedItemCard }
 *   - room._potionLauncherItemAfterFn: used in advanceExamTurn like _itemEffectActive
 *   - familiar:cancel intercept for pa.potionLauncherAfterFn → back to select
 *
 * Client: see game.js showPotionLauncherPrompt / select modal / payment via targetingMode
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
