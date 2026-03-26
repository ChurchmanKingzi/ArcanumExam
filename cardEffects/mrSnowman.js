/**
 * Mr. Snowman — Active: Exhaust (tap) any untapped familiar on the board (except itself).
 * Passive: Whenever Mr. Snowman takes damage, owner selects and taps any untapped familiar
 *          (including itself). Cannot be cancelled.
 */
export default function mrSnowman(familiar, context) {
  return {
    effectType: 'exhaust-familiar',
  };
}
