/**
 * Literal Cannon — Passive equip.
 *
 * Whenever the equipped student hits any Familiar(s) with a basic student
 * attack (including Edgelord multi-attack and Anti-Magnet-redirected attacks),
 * those Familiars die instantly with no damage calculation.
 *
 * Rules:
 *   - Bypasses HP, damage reduction, armor, etc. — instant kill regardless of HP.
 *   - Protected by Class Pet immunity (the whole board is immune).
 *   - Protected by Futuristic Mech innate immunity (per-familiar).
 *   - Summoned Students in familiar slots are treated as students — normal damage.
 *   - Boolean: multiple Cannons = same as one.
 *   - No on-kill bonuses (Vanguard Demon, Leprechaun, Angry Cheese don't proc).
 *   - Heart Bow does not trigger on Cannon-killed familiars (they're already dead).
 *   - Applies after Jetpack evasion — evaded targets are already removed.
 *
 * All logic is handled in server.js (_magnetResolveFn, before resolveTargetDamage).
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
