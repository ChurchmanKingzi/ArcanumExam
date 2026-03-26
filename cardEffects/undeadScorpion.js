/**
 * Undead Scorpion — Active: Deal 10 damage to any 1 target.
 * Passive: Whenever any other target (familiar or student) is killed,
 * Undead Scorpion heals itself for 10 HP. Handled server-side in
 * processFamiliarDeath and student death paths.
 */
export default function undeadScorpion(familiar, context) {
  return {
    effectType: 'damage-targets',
    damage: 10,
    targetsNeeded: 1,
  };
}
