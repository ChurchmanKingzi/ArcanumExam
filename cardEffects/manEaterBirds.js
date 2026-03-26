/**
 * Man-Eater Birds — Deal 5 damage to a student or 10 to a familiar.
 */
export default function manEaterBirds(familiar) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
    damageByType: { student: 5, familiar: 10 },
  };
}
