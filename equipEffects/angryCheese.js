/**
 * Angry Cheese — Passive equip effect (no on-destroyed trigger).
 *
 * While equipped: whenever the student casts a Spell (or lands a
 * Seagulls-enhanced attack that counts as a Spell), the controller
 * must deal 5 damage to any one target (mandatory, non-cancellable).
 *
 * The trigger logic is handled directly in server.js via queueAngryCheese(),
 * processed in advanceExamTurn. This file exists for registry consistency.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
