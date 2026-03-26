/**
 * Bomb Arrow — Passive equip effect.
 *
 * Whenever the equipped Student hits 1+ targets with an Attack (including
 * Edgelord cleave), the owner gets an immediate uncancellable prompt to
 * deal 5 damage to any 1 target of their choice. The Bomb Arrow shot is
 * NOT itself a basic attack and will not trigger on-hit effects.
 *
 * Excluded from targeting: the target(s) that were just hit by the attack.
 * Standard damage immunities apply (Golden Hind, Stuffed Teddy, Basic
 * Armor, Spawn Mother, Coatl, etc.).
 *
 * Logic handled in server.js via hasBombArrow() + setupBombArrowPrompt().
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
