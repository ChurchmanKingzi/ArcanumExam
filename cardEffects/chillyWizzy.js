/**
 * Chilly Wizzy — Active (tap): Reveal a Spell in your hand (cost > 0, not already revealed).
 * The revealed Spell becomes visible to all opponents and costs 3 less (minimum 0).
 * Fizzles (untap) if no eligible Spells exist.
 *
 * Passive: (implemented separately)
 */
export default function chillyWizzy(familiar, context) {
  return {
    effectType: 'chilly-wizzy-reveal',
  };
}
