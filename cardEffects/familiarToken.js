/**
 * Familiar Token (The Gamer) — Deal 5 damage to 1 target.
 * Created when The Gamer plays an Item; the Item becomes this token.
 */
export default function familiarToken(familiar, context) {
  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage: 5,
    minLivingTargets: 1,
  };
}
