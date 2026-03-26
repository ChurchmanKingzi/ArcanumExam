/**
 * Warhorse — Active: Deal 5 damage to any 1 target.
 * Passive: While alive, increases the controller's main student ATK by 5.
 * Multiple Warhorses stack. Passive handled server-side via
 * getWarhorseAtkBonus() in getEffectiveStudentAtk().
 */
export default function warhorse(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 5,
    targetsNeeded: 1,
  };
}
