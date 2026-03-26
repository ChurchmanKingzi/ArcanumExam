/**
 * Cute Cheese — Passive equip effect.
 *
 * When the equipped Student casts a Spell (or lands a Seagulls-enhanced attack):
 * Player may summon a Familiar from their discard pile by paying its cost.
 *
 * Logic handled in server.js via hasCuteCheese() / queueCuteCheese() /
 * advanceExamTurn queue processing / cuteCheese:summon handler.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
