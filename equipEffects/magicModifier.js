/**
 * Magic Modifier — Passive equip effect.
 *
 * At the start of each exam round (after snare placement), the owner is prompted
 * to discard any number of cards (including 0). All Spells then cost exactly X
 * for the rest of that round, where X is the number of cards discarded.
 * This overrides ALL other spell cost modifiers and persists even if the equip
 * is destroyed mid-round.
 *
 * If multiple players control Magic Modifiers, the game waits for ALL of them
 * and takes the average (rounded mathematically).
 *
 * Logic handled in server.js via enterMagicModifierPhase() / checkMagicModifierComplete()
 * and the 'magicModifier:confirm' socket handler.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
