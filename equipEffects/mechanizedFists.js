/**
 * Mechanized Fists — Passive equip.
 *
 * Increases the equipped Student's ATK by 10, BUT only while no other
 * ATK-increasing effect is active on the Student.
 *
 * Condition: if (effective ATK without Fists) <= base ATK → +10 applies.
 *            if (effective ATK without Fists) >  base ATK → +10 does NOT apply.
 *
 * In other words: the moment any other equip or effect raises ATK above base
 * (Anti-Magic Blade, Warhorse, Barbarian Sword, Bazooka, Edgy Cloak, Halberd…),
 * the Fists bonus is suppressed entirely.
 *
 * Multiple Mechanized Fists equipped = same bonus as one (boolean check).
 * Mummy Guards Curse locks ATK to 1 regardless — early return in
 * getEffectiveStudentAtk handles that before Fists are evaluated.
 *
 * All logic is in getEffectiveStudentAtk (server.js).
 */
export default {
  onDestroyed: false,
  onReturnedToHand: false,
  passive: true,
  effect: null,
};
