/**
 * Land Piranha — Destroy any Snare on the board
 * (face-down or face-up). If no Snares exist, taps for no effect.
 */
export default function landPiranha(familiar, context) {
  return {
    effectType: 'destroy-snare',
  };
}
