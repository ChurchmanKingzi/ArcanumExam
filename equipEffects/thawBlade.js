/**
 * Thaw Blade — Passive equip effect.
 *
 * When the equipped student's attack hits a tapped target (familiar or student),
 * that target is Energized: untapped and dealt 5 damage.
 *
 * Triggers on: student basic attack, Edgelord multi-target attack.
 * Does NOT trigger on: Nerdy Cheese bonus casts, Berserk bonus attacks.
 * Applies to ALL tapped targets hit, including targets that die from the attack.
 * Multiple Thaw Blades do NOT stack (boolean).
 *
 * Logic in server.js:
 *   - hasThawBlade(player) helper
 *   - After deaths + Giant Hammer block in the attack handler:
 *     iterate targets, for each tapped target: untap + resolveTargetDamage 5 dmg
 *     push energizeEvents for animation
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
