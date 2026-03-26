/**
 * Possessed Blade — Passive equip.
 *
 * ATK: +8 per copy (stacking).
 *
 * Recoil: After the equipped Student lands a basic attack (including Edgelord
 * multi-attack and Berserk bonus attacks, but NOT Nerdy Cheese bonus casts or
 * Howitzer shots), each Possessed Blade deals 4 recoil damage to the
 * attacker's own student sequentially, with ~350ms pauses between blades so
 * damage numbers are visible individually.
 *
 * Recoil damage category: "effect" (not attack/spell).
 * - IS modified by Rain's Blessing and Basic Armor (all-damage modifiers).
 * - IS blocked by Coatl HP floor.
 * - DOES call trackStudentDamage → increments Doomsday Bomb counters,
 *   tracks roundStudentDamage, sets shyGirlDamagedThisRound.
 * - DOES trigger Heart of Ice exhaust queue.
 * - DOES trigger Guardian Angel on lethal hit.
 * - Does NOT trigger snares.
 * - Does NOT trigger Field Standard.
 *
 * Death: if recoil kills the student, attack still fully resolved first
 * (all targets took damage, all on-hit effects fired). Berserk second
 * attack is skipped if the student dies from recoil.
 *
 * Server:
 *   - +8 per copy in getEffectiveStudentAtk / atkBonus builders
 *   - applyOneBladeRecoil() chain in _doBerserkAndAdvance
 *
 * Client: standard damageEvents rendering handles the damage numbers.
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
