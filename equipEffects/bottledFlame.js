/**
 * Bottled Flame — Item.
 *
 * Eligible only when ≥1 tapped target exists on the board.
 * Effect: Energize any one tapped target (untap it + deal 5 damage).
 * Uses the standard 'energize' effectType — same as Flame Fairy's active.
 *
 * Direct play  → broadcastRoomState only (items don't advance turn).
 * Potion Launcher → calls potionLauncherAfterFn.
 *
 * Animation: flame animation via energizeEvents (showEnergizeAnimations).
 * Works on dead targets (coord-snapshotted before render).
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: false,
  effect: null,
};
