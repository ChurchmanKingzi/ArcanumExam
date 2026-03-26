/**
 * Chilly Dog — Active: Exhaust (tap) any untapped familiar on the board (except itself).
 * Passive: Prevents all own familiars from being tapped by effects (server-side).
 */
export default function chillyDog(familiar, context) {
  return {
    effectType: 'exhaust-familiar',
  };
}
