/**
 * Balloons — Passive equip effect.
 *
 * While equipped: the student is unaffected by all Snare effects.
 * Snares can still be triggered, animations still play, but effects
 * (damage, poison, heal conversion, etc.) are blanked for the student.
 *
 * Logic handled in server.js via hasBalloons() checks in resolveActivatedSnare
 * and Toxic Trap resolution.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
