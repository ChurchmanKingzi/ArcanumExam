/**
 * Hungry Orc — Deal damage equal to 2 + damage taken by the Orc
 * (maxHP - currentHP) to a single target.
 */
export default function hungryOrc(familiar, context) {
  const damageTaken = (familiar.hp || 0) - (familiar.currentHp || 0);
  const damage = 2 + damageTaken;

  return {
    effectType: 'damage-targets',
    targetsNeeded: 1,
    damage,
  };
}
