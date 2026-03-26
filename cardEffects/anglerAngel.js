/**
 * Angler Angel — Active: discard 1 card from own hand. Fizzles if hand is empty.
 * Passive: while on board during Preparation Phase, all costs the controller
 * pays during prep are reduced by 1 (minimum 0).
 */
export default function anglerAngel(familiar, context) {
  return {
    effectType: 'self-discard',
  };
}
