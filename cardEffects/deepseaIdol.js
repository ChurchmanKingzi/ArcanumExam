/**
 * Deepsea Idol — Active Effect
 *
 * When this Familiar is tapped:
 * - If ≥2 other untapped Familiars exist on the board: select any 2 to Exhaust.
 * - Otherwise: taps for no effect.
 *
 * The Item version of this card becomes this Familiar when played.
 */
export default function deepseaIdol(familiar, context) {
  return {
    effectType: 'deepsea-idol-exhaust',
    targetsNeeded: 2,
  };
}
