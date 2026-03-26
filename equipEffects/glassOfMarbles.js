/**
 * Glass of Marbles — Item (cost 0).
 *
 * No manual trigger. Always grayed out in hand.
 * Always ineligible for Copy Device / Potion Launcher.
 *
 * Passive trigger: when this card is discarded FROM HAND to a discard pile
 * (via payment, hand-discard effects, or any other hand→discard path tracked
 * by `discardFromHand`), the owning player is prompted with a non-cancellable
 * picker to retrieve one card from their own discard pile — excluding any
 * other "Glass of Marbles" cards.
 *
 * Multiple Glass of Marbles discarded at once each trigger independently,
 * processed in queue order.
 *
 * Server:
 *   - Trigger: `discardFromHand` → push to `room._glassOfMarblesQueue`
 *   - Queue drain: `processGlassOfMarblesQueue(room, afterFn)` — sets
 *     `room.pendingGlassOfMarbles = { playerId, playerName, eligibleDiscard, afterFn }`
 *   - Pause check: `advanceExamTurn` returns early while `pendingGlassOfMarbles` is set
 *   - Handler: `glassOfMarbles:pick` — removes chosen card from discard, adds to hand
 *   - Broadcast: `pendingGlassOfMarbles` serialized with fresh `eligibleDiscard` array
 *   - Disconnect: auto-skip, drain next queue entry
 *   - Reconnect: `playerId` patched in `updatePlayerIds`
 *   - Ineligible: listed in `POTION_LAUNCHER_INELIGIBLE_ITEMS`
 *
 * Client:
 *   - `glassOfMarblesReactive` flag → always grayed out (same pattern as Elixir of Immortality)
 *   - `pendingGlassOfMarbles` in state → opens `showGlassOfMarblesPicker` via `$revivePicker`
 *   - `targetingMode.effectType === 'glass-of-marbles-pick'`, `canCancel: false`
 *   - Reconnect-persistent: picker re-shown on every state update while pending
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
