/**
 * Mine Cart — Passive equip.
 *
 * Reduces ALL costs the owning player pays by 1 (minimum 0), during ALL phases
 * (Preparation and Exam). Applies to Spells, Familiars, Items, and Equips.
 *
 * Variable costs (-1) are not affected.
 * Multiple Mine Carts = same as one (boolean check, not additive).
 *
 * Compare: Angler Angel reduces costs by 1 during Preparation phase only.
 * Mine Cart is the all-phase equivalent via an equip slot.
 *
 * All logic lives in:
 *   - getEffectiveSpellCost()    (server.js) — Spells
 *   - getEffectiveFamiliarCost() (server.js) — Familiars
 *   - game:playCard handler      (server.js) — Items & Equips (raw cost path)
 *   - getEffectiveCost()         (game.js)   — Client-side display
 *   - canAfford()                (game.js)   — Client-side affordability check
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
