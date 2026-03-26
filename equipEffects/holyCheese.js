/**
 * Holy Cheese — Passive equip effect.
 *
 * When the equipped Student casts a Spell (or lands a Seagulls-enhanced attack):
 * Player must heal any target for 5 HP. Mandatory, non-cancellable.
 * Can target full-HP targets (heal is wasted).
 *
 * Logic handled in server.js via hasHolyCheese() / queueHolyCheese() /
 * advanceExamTurn queue processing / existing familiar:healTarget handler.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
